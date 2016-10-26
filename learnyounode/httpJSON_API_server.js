'use strict';

const http = require('http');
const url = require('url');

let port = Number(process.argv[2]);

let server = http.createServer(function(req, res){
    // console.log(req.url);
    let urlObj = url.parse(req.url);
    let query = urlObj.query;
    if(urlObj.pathname === '/api/parsetime'){
        if(query){
            let valueOfISO = query.split('=')[1];
            let objDate = new Date(valueOfISO);
            // console.log(objDate.toISOString());

            var jsonDate = JSON.stringify({ 
                hour: objDate.getHours(), 
                minute: objDate.getMinutes(), 
                second: objDate.getSeconds()
            });
            console.log(jsonDate);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(jsonDate);
        }
    }else if(urlObj.pathname === '/api/unixtime'){
        if(query){
            let valueOfISO = query.split('=')[1];
            let objDate = new Date(valueOfISO);
            // console.log(objDate.toISOString());

            var jsonDate = JSON.stringify({ 
                unixtime: objDate.getTime()
            });
            console.log(jsonDate);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(jsonDate);
        }
    }
    
    
});
server.listen(port);
console.log("Listen at port " + port);


    // var http = require('http')
    // var url = require('url')

    // function parsetime (time) {
    //   return {
    //     hour: time.getHours(),
    //     minute: time.getMinutes(),
    //     second: time.getSeconds()
    //   }
    // }

    // function unixtime (time) {
    //   return { unixtime : time.getTime() }
    // }

    // var server = http.createServer(function (req, res) {
    //   var parsedUrl = url.parse(req.url, true)
    //   var time = new Date(parsedUrl.query.iso)
    //   var result

    //   if (/^\/api\/parsetime/.test(req.url))
    //     result = parsetime(time)
    //   else if (/^\/api\/unixtime/.test(req.url))
    //     result = unixtime(time)

    //   if (result) {
    //     res.writeHead(200, { 'Content-Type': 'application/json' })
    //     res.end(JSON.stringify(result))
    //   } else {
    //     res.writeHead(404)
    //     res.end()
    //   }
    // })
    // server.listen(Number(process.argv[2]))