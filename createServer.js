//create a server and output in browser

//load module
const http = require("http");

//create server
http.createServer((request, response) => {

    response.writeHead(200, {
        'Content-Type' : 'text/html'
    });

    response.write('<h1>Hello World</h1>');

    response.end();

}).listen(2000);