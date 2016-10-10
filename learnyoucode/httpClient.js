'use strict'

let http = require('http');
let url = process.argv[2];

http.get(url).on('error', e => {
    console.log(`Got error: ${e.message}`);
}).on('data', e => {
    console.log(`Get data: ${data}`)
});