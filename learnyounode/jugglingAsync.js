'use strict'
const http = require('http');
let url = process.argv[2];
let url2 = process.argv[3];
let url3 = process.argv[4];

let result = [];

http.get(url, function (resp) {
    resp.setEncoding(); //Now the data is a string!
    let store = {};
    store.index = 1;
    store.data = "";
    resp.on('data', function (d) {
        store.data += d;
    });
    resp.on('end', function () {
        result.push(store);
        done();
    });
}).on('error', function (e) {
    console.error(e);
});
http.get(url2, function (resp) {
    resp.setEncoding(); //Now the data is a string!
    let store = {};
    store.index = 2;
    store.data = "";
    resp.on('data', function (d) {
        store.data += d;
    });
    resp.on('end', function () {
        result.push(store);
        done();
    });
}).on('error', function (e) {
    console.error(e);
});
http.get(url3, function (resp) {
    resp.setEncoding(); //Now the data is a string!
    let store = {};
    store.index = 3;
    store.data = "";
    resp.on('data', function (d) {
        store.data += d;
    });
    resp.on('end', function () {
        result.push(store);
        done()
    });
}).on('error', function (e) {
    console.error(e);
});

function done() {
    if (Object.keys(result).length < 3) {
        return;
    }

    result.sort(function (a, b) {
        if (a.index > b.index)
            return 1;
        if (a.index < b.index)
            return -1;
        return 0;
    });

    for (var item of result) {
        // console.log(item.index);
        console.log(item.data);
    }
}

// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0

// function printResults() {
//     for (var i = 0; i < 3; i++)
//         console.log(results[i])
// }

// function httpGet(index) {
//     http.get(process.argv[2 + index], function (response) {
//         response.pipe(bl(function (err, data) {
//             if (err)
//                 return console.error(err)

//             results[index] = data.toString()
//             count++

//             if (count == 3)
//                 printResults()
//         }))
//     })
// }

// for (var i = 0; i < 3; i++)
//     httpGet(i)