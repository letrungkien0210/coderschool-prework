'use strict'

let http = require('http');
let request = require('request');
let yargs = require('yargs');
let path = require('path');
let fs = require('fs');

let argv = yargs.default('host','127.0.0.1:8000').argv;

let logPath = argv.log && path.join(__dirname, argv.log);
let logStream  = logPath ? fs.createWriteStream(logPath) : process.stdout;
let schema = 'http://';

let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80);
let destinationUrl = schema + argv.host + ':' + port;

//Echo Server
http.createServer((req, res) => {
    // res.end('hello world\n');
    req.pipe(res);
    for (let header in req.headers) {
        res.setHeader(header, req.headers[header]);
    }
    // process.stdout.write('\n\n\n' + JSON.stringify(req.headers));
    logStream.write('\nRequest headers at echo Server:\n' + JSON.stringify(req.headers));
    // req.pipe(process.stdout);
    // req.pipe(logStream, {end: false})
}).listen(8000);

//Proxy Server
http.createServer((req, res) => {
    let options = {
        headers: req.headers,
        url: `${destinationUrl}${req.url}`
    }
    options.method = req.method;
    
    // Log the proxy request headers and content in the **server callback**
    let downstreamResponse = req.pipe(request(options));
    // process.stdout.write(JSON.stringify(downstreamResponse.headers));
    logStream.write("Request headers at Proxy Server:\n"+JSON.stringify(downstreamResponse.headers));
    // downstreamResponse.pipe(process.stdout);
    // downstreamResponse.pipe(logStream, {end:false});
    downstreamResponse.pipe(res);
}).listen(8001);