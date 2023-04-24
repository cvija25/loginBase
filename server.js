const http = require('http');

const app = require('./app');
const port = 3000;

const server = http.createServer(app);

server.listen(port);

server.once('listening', () => {
    console.log(`Server running at http://localhost:${port}`);
})