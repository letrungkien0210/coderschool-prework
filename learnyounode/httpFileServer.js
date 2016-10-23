'use strict';

const http = require('http');
const fs = require('fs');

let port = Number(process.argv[2]);
let file = process.argv[3];

let server = http.createServer(function (req, res) {
    // console.log(file);
    let objReadStream = fs.createReadStream(file);
    objReadStream.on('data', function (data) {
        // console.log(data.toString());
        res.write(data);
    });
});
server.listen(port);


// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-type': 'text/plain' })

//     fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))