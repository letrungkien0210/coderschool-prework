'use strict';

const http = require('http');
const url = require('url');

let port = Number(process.argv[2]);

let server = http.createServer(function(req, res){
    // console.log(req.url);
    let urlObj = url.parse(req.url);
    let query = urlObj.query;
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
    
});
server.listen(port);