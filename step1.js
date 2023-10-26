const fs = require('fs');

let fileName = process.argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${path}:`);
            console.log(error);
            process.kill(1);
        }

        console.log(data);
    });
}

if (fileName) {
    cat(fileName);
} else {
    console.log('You did not pass a text file as an argument.');
}
