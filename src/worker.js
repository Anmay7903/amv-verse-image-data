export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to serve static file
    let path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = await env.ASSETS.fetch(path);

    // If file exists, return it
    if (file.status !== 404) return file;

    // Otherwise return custom 404
    return env.ASSETS.fetch("/404.html");
  }
};
