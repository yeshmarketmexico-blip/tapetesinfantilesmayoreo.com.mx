export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Intentar servir el archivo solicitado
    const response = await env.ASSETS.fetch(request);
    
    // Si el archivo no existe (404), servir la página 404 personalizada
    if (response.status === 404) {
      const notFoundResponse = await env.ASSETS.fetch(
        new Request(new URL('/404.html', request.url))
      );
      return new Response(notFoundResponse.body, {
        status: 404,
        headers: notFoundResponse.headers,
      });
    }
    
    return response;
  }
};
