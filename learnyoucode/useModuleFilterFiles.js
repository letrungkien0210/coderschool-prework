'use strict'
const moduleF = require("./moduleFilterFiles.js");

let dir = process.argv[2];
let extension = process.argv[3];

moduleF(dir, extension, (err, data) => {
    if(err) console.log(err);
    for(let item of data){
        console.log(item);
    }
});

//  var filterFn = require('./solution_filter.js')
//  var dir = process.argv[2]
//  var filterStr = process.argv[3]

//  filterFn(dir, filterStr, function (err, list) {
//    if (err)
//      return console.error('There was an error:', err)

//    list.forEach(function (file) {
//      console.log(file)
//    })
//  })