const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server to listen to incoming requests
const server = http.createServer((req, res) => {
  // Log the request URL
  console.log('Request URL:', req.url);

  // Proxy the request to the target server
  proxy.web(req, res, { target: req.url }, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('Bad gateway');
    }
  });
});

// Listen on the port specified by the environment or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});