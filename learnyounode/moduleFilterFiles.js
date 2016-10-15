'use strict'
let fs = require("fs");
let path = require("path");

module.exports = function(dir, extension, callback){
    fs.readdir(dir, (err, data) => {
        if(err) return callback(err);
        let result = [];
        extension = "."+extension;
        for(let item of data){
            if(path.extname(item) === extension){
                result.push(item);
            }
        }
        callback(null, result);
    });
}

//  var fs = require('fs')
//  var path = require('path')

//  module.exports = function (dir, filterStr, callback) {

//    fs.readdir(dir, function (err, list) {
//      if (err)
//        return callback(err)

//      list = list.filter(function (file) {
//        return path.extname(file) === '.' + filterStr
//      })

//      callback(null, list)
//    })
//  }