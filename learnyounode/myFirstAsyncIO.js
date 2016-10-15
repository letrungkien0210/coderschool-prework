var fs = require('fs');
var file = process.argv[2];

fs.readFile(process.argv[2], (err, data) => {
    var lines = data.toString().split('\n').length -1;
    console.log(lines);
});
