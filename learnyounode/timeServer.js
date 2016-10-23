"use strict";
let net = require('net');
let port = process.argv[2];

var server = net.createServer(function (socket) {
    let date = new Date();
    // console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`);
    socket.end(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}\n`);
    // socket.end(date.toDateString());
});
server.listen(port);

// var net = require('net')

// function zeroFill(i) {
//     return (i < 10 ? '0' : '') + i
// }

// function now() {
//     var d = new Date()
//     return d.getFullYear() + '-'
//         + zeroFill(d.getMonth() + 1) + '-'
//         + zeroFill(d.getDate()) + ' '
//         + zeroFill(d.getHours()) + ':'
//         + zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket) {
//     socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))