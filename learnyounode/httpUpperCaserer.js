'use strict';

// const http = require('http');
// const map = require('through2-map');

// let port = Number(process.argv[2]);

// let server = http.createServer(function (req, res) {
//     if (req.method == 'POST') {
//         let body = [];
//         req.on('error', function (err) {
//             console.error(err);
//         }).on('data', function (chunk) {
//             // console.log(chunk.toString());
//             // body.push(chunk.toString());
//             res.write(chunk.toString().toUpperCase());
//         }).on('end', function () {
//             // body = Buffer.concat(body).toString();
//             // res.write(body.toString());
//         });
//     } else {
//         console.log('don`t exec POST')
//     }
// });
// server.listen(port);

var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
    if (req.method != 'POST')
        return res.end('send me a POST\n')

    req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
    })).pipe(res)
})

server.listen(Number(process.argv[2]))