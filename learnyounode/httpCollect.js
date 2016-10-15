'use strict'
const http = require('http');
let url = process.argv[2];

http.get(url, function (resp) {
    resp.setEncoding(); //Now the data is a string!
    let store = "";
    resp.on('data', function (d) {
        store += d;
    });
    resp.on('end', function () {
        console.log(store.length);
        console.log(store);

    });
}).on('error', function (e) {
    console.error(e);
});

// var http = require('http')
// var bl = require('bl')

// http.get(process.argv[2], function (response) {
//     response.pipe(bl(function (err, data) {
//         if (err)
//             return console.error(err)
//         data = data.toString()
//         console.log(data.length)
//         console.log(data)
//     }))
// })