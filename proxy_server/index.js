'use strict'

let http = require('http');
let https = require('https');
let request = require('request');
let yargs = require('yargs');
let path = require('path');
let fs = require('fs');
const spawn = require('child_process').spawn;

let argv = yargs
    .usage('Usage: node index.js [options]')
    .example('node index.js -p 8000 -x localhost')
    .alias('p', 'port')
    .describe('p', 'Specify a forward port')
    .alias('x', 'host')
    .describe('x', 'Specify a forward host')
    .alias('e', 'exec')
    .describe('e', 'Specify a process to proxy instead')
    .alias('l', 'log')
    .describe('l', 'Specify a output log file')
    .help('h')
    .alias('h', 'help')
    .describe('h', 'Show help')
    .epilog('copyright 2016')
    .argv;


let logPath = argv.log && path.join(__dirname, argv.log);
let logStream  = logPath ? fs.createWriteStream(logPath) : process.stdout;
let schema = 'http://';

let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80);
let destinationUrl = schema + argv.host + ':' + port;

if(argv.exec){
    let args = ['/c'];
    args.push(argv.exec);
    args.push(argv._);
    const bat = spawn('cmd.exe', args);

    bat.stdout.on('data', (data) => {
        console.log(`Stdout: ${data}`);
    });

    bat.stderr.on('data', (data) => {
        console.log(`Stderr: ${data}`);
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}else{
    //Echo Server
    http.createServer((req, res) => {
        req.pipe(res);
        for (let header in req.headers) {
            res.setHeader(header, req.headers[header]);
        }
        logStream.write('\nRequest headers at echo Server:\n' + JSON.stringify(req.headers));
        logStream.write('\n');
        req.pipe(logStream, {end: false})
    }).listen(port);

    //Proxy Server
    http.createServer((req, res) => {
        let options = {
            headers: req.headers,
            url: `${destinationUrl}${req.url}`
        }
        options.method = req.method;
        
        // Log the proxy request headers and content in the **server callback**
        let downstreamResponse = req.pipe(request(options));
        logStream.write("\n\nRequest headers at Proxy Server:\n"+JSON.stringify(downstreamResponse));
        logStream.write('\n');
        downstreamResponse.pipe(logStream, {end:false});
        downstreamResponse.pipe(res);
    }).listen(8001);
}
