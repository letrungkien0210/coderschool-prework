var path = require('path');
var dir = process.argv[2];
var extension = process.argv[3];

// path.readdir(dir, (err, data) => {
//     console.log(data);
// });

console.log(path.basename(dir));