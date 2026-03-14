import os
import hashlib
import mimetypes
from functools import wraps
from datetime import datetime, timedelta
from pathlib import Path

from flask import Flask, send_file, abort, jsonify, request, make_response
from flask_caching import Cache
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import magic

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
app.config['CACHE_TYPE'] = os.getenv('CACHE_TYPE', 'SimpleCache')
app.config['CACHE_DEFAULT_TIMEOUT'] = int(os.getenv('CACHE_DEFAULT_TIMEOUT', 31536000))
app.config['CACHE_THRESHOLD'] = int(os.getenv('CACHE_THRESHOLD', 1000))
app.config['CACHE_DIR'] = os.getenv('CACHE_DIR', './cache')
app.config['MAX_IMAGE_SIZE'] = int(os.getenv('MAX_IMAGE_SIZE', 10485760))
app.config['IMAGES_FOLDER'] = os.getenv('IMAGES_FOLDER', './images')
app.config['ALLOWED_EXTENSIONS'] = os.getenv('ALLOWED_EXTENSIONS', 'jpg,jpeg,png,gif,webp,svg').split(',')

# Initialize cache
cache = Cache(app)

# Create necessary directories
os.makedirs(app.config['IMAGES_FOLDER'], exist_ok=True)
os.makedirs(app.config['CACHE_DIR'], exist_ok=True)

# Allowed image extensions
ALLOWED_EXTENSIONS = set(app.config['ALLOWED_EXTENSIONS'])

def allowed_file(filename):
    """Check if file has allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_mime_type(filepath):
    """Get MIME type of file"""
    mime = magic.Magic(mime=True)
    return mime.from_file(filepath)

def generate_cache_key(path):
    """Generate cache key for path"""
    return f"image_cache_{hashlib.md5(path.encode()).hexdigest()}"

def add_cache_headers(response):
    """Add cache headers to response"""
    cache_timeout = app.config['CACHE_DEFAULT_TIMEOUT']
    response.headers['Cache-Control'] = f'public, max-age={cache_timeout}, immutable'
    response.headers['Expires'] = (datetime.utcnow() + timedelta(seconds=cache_timeout)).strftime('%a, %d %b %Y %H:%M:%S GMT')
    response.headers['CDN-Cache-Control'] = f'public, max-age={cache_timeout}'
    response.headers['Cloudflare-CDN-Cache-Control'] = f'public, max-age={cache_timeout}'
    return response

def rate_limit(f):
    """Simple rate limiting decorator (optional)"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if os.getenv('RATELIMIT_ENABLED', 'False').lower() == 'true':
            # Implement your rate limiting logic here
            # This is a placeholder - consider using Flask-Limiter for production
            pass
        return f(*args, **kwargs)
    return decorated_function

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'cache_status': 'active'
    })

@app.route('/images/<path:image_path>')
@rate_limit
@cache.cached(timeout=app.config['CACHE_DEFAULT_TIMEOUT'], query_string=True)
def serve_image(image_path):
    """
    Serve images with caching
    
    Example: /images/throne-of-seal-movie-the-crownless-god-card.jpg
    """
    try:
        # Security: Prevent directory traversal
        if '..' in image_path or image_path.startswith('/'):
            abort(400, description="Invalid image path")
        
        # Secure the filename
        safe_path = secure_filename(image_path)
        
        # Construct full path to image
        image_full_path = os.path.join(app.config['IMAGES_FOLDER'], safe_path)
        
        # Check if file exists
        if not os.path.exists(image_full_path):
            abort(404, description="Image not found")
        
        # Validate file type
        if not allowed_file(safe_path):
            abort(400, description="File type not allowed")
        
        # Check file size
        file_size = os.path.getsize(image_full_path)
        if file_size > app.config['MAX_IMAGE_SIZE']:
            abort(413, description="Image too large")
        
        # Get MIME type
        mime_type = get_mime_type(image_full_path)
        
        # Send file with caching headers
        response = make_response(send_file(
            image_full_path,
            mimetype=mime_type,
            as_attachment=False,
            download_name=None,
            etag=True,
            max_age=app.config['CACHE_DEFAULT_TIMEOUT']
        ))
        
        # Add cache headers
        response = add_cache_headers(response)
        
        # Add CDN-specific headers
        response.headers['X-Cache-Status'] = 'HIT' if cache.get(generate_cache_key(image_path)) else 'MISS'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        
        return response
        
    except FileNotFoundError:
        abort(404, description="Image not found")
    except Exception as e:
        app.logger.error(f"Error serving image {image_path}: {str(e)}")
        abort(500, description="Internal server error")

@app.route('/images-info/<path:image_path>')
def image_info(image_path):
    """Get information about an image"""
    try:
        safe_path = secure_filename(image_path)
        image_full_path = os.path.join(app.config['IMAGES_FOLDER'], safe_path)
        
        if not os.path.exists(image_full_path):
            abort(404, description="Image not found")
        
        file_stat = os.stat(image_full_path)
        mime_type = get_mime_type(image_full_path)
        
        return jsonify({
            'filename': safe_path,
            'size': file_stat.st_size,
            'mime_type': mime_type,
            'created': datetime.fromtimestamp(file_stat.st_ctime).isoformat(),
            'modified': datetime.fromtimestamp(file_stat.st_mtime).isoformat(),
            'cache_key': generate_cache_key(image_path)
        })
        
    except Exception as e:
        app.logger.error(f"Error getting image info {image_path}: {str(e)}")
        abort(500, description="Internal server error")

@app.route('/purge-cache/<path:image_path>', methods=['POST'])
def purge_cache(image_path):
    """Purge cache for specific image"""
    try:
        cache_key = generate_cache_key(image_path)
        cache.delete(cache_key)
        
        return jsonify({
            'status': 'success',
            'message': f'Cache purged for {image_path}',
            'cache_key': cache_key
        })
        
    except Exception as e:
        app.logger.error(f"Error purging cache for {image_path}: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/purge-all-cache', methods=['POST'])
def purge_all_cache():
    """Purge entire cache"""
    try:
        cache.clear()
        
        return jsonify({
            'status': 'success',
            'message': 'All cache purged'
        })
        
    except Exception as e:
        app.logger.error(f"Error purging all cache: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not Found',
        'message': error.description or 'The requested image was not found',
        'status_code': 404
    }), 404

@app.errorhandler(400)
def bad_request(error):
    """Handle 400 errors"""
    return jsonify({
        'error': 'Bad Request',
        'message': error.description or 'Invalid request',
        'status_code': 400
    }), 400

@app.errorhandler(413)
def too_large(error):
    """Handle 413 errors"""
    return jsonify({
        'error': 'Payload Too Large',
        'message': 'Image size exceeds maximum allowed size',
        'status_code': 413
    }), 413

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An internal error occurred',
        'status_code': 500
    }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    debug = os.getenv('FLASK_ENV', 'production') == 'development'
    
    print(f"\n🚀 Image CDN Server starting...")
    print(f"📁 Images folder: {os.path.abspath(app.config['IMAGES_FOLDER'])}")
    print(f"💾 Cache folder: {os.path.abspath(app.config['CACHE_DIR'])}")
    print(f"🌐 Server running on http://{host}:{port}")
    print(f"📸 Example: http://{host}:{port}/images/throne-of-seal-movie-the-crownless-god-card.jpg")
    print(f"💡 Press Ctrl+C to stop\n")
    
    app.run(host=host, port=port, debug=debug)
