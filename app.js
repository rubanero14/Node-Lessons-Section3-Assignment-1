const http = require('http');

// import custom routes file
const routes = require('./routes');

// Initialize server
const server = http.createServer(routes.handler);

// Server listen on port 3000
server.listen(3000);