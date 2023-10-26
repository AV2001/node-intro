const fs = require('fs');
const axios = require('axios');

let catArg = process.argv[2];

function cat(arg) {
    fs.readFile(arg, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${arg}:`);
            console.log(error);
            process.kill(1);
        }

        console.log(data);
    });
}

async function webCat(arg) {
    try {
        const response = await axios.get(arg);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

if (catArg) {
    if (catArg.includes('.com')) {
        webCat(catArg);
    } else if (catArg.includes('.txt')) {
        cat(catArg);
    }
} else {
    console.log('No argument provided.');
}
