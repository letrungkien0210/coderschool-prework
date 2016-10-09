"use strict"

// let path = require('path');
// let fs = require("fs");
// let dir = process.argv[2];
// let extension = process.argv[3];

// // path.readdir(dir, (err, data) => {
// //     console.log(data);
// // });
// fs.readdir(dir, (err, data) => {
//     // let arrayFiles = data;
//     for(let item of data){
//         // let extensionFile = "."+extension;
//         // if(path.extname(item) === "")
//         //     continue
//         if(path.extname(item) === '')
//             continue;
//         if(path.extname(item).replace(".","") === extension)
//             console.log(item);
//     }
//     // console.log(data);
// });

 var fs = require('fs')
 var path = require('path')

 var folder = process.argv[2]
 var ext = '.' + process.argv[3]

 fs.readdir(folder, function (err, files) {
   if (err) return console.error(err)
   files.forEach(function(file) {
       if (path.extname(file) === ext) {
           console.log(file)
       }
   })
 })