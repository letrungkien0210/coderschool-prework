'use strict'

let http = require('http');
let url = process.argv[2];

let response = http.get(url, res => {
    res.setEncoding('utf8');
    res.on('data', data => {
        console.log(data);
    });
    res.on('end', function(){
        console.log('End');
    });
});

// var http = require('http')

// http.get(process.argv[2], function (response) {
//     response.setEncoding('utf8')
//     response.on('data', console.log)
//     response.on('error', console.error)
// }).on('error', console.error)
