const fs = require('fs');
const axios = require('axios');

let shouldOutputBeWrittenToFile = process.argv[2] === '--out' ? true : false;

function cat(fileName) {
    fs.readFile(fileName, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${fileName}:`);
            console.log(error);
            process.kill(1);
        }

        console.log(data);
    });
}

function catWrite(outputFilePath, fileName) {
    fs.readFile(fileName, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            process.kill(1);
        }

        fs.writeFile(outputFilePath, data, 'utf8', (error) => {
            if (error) {
                console.log(error);
                process.kill(1);
            }
            console.log(
                `The contents of ${fileName} have been successfully written to ${outputFilePath}.`
            );
        });
    });
}

async function webCat(fileName) {
    try {
        const response = await axios.get(fileName);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function webCatWrite(outputFilePath, fileName) {
    try {
        const response = await axios.get(fileName);
        fs.writeFile(outputFilePath, response.data, 'utf8', (error) => {
            if (error) {
                console.log(error);
                process.kill(1);
            }
            console.log(
                `The contents of ${fileName} have been successfully written to ${outputFilePath}.`
            );
        });
    } catch (error) {
        console.log(error);
    }
}

if (shouldOutputBeWrittenToFile) {
    const outputFilePath = process.argv[3];
    const fileName = process.argv[4];
    if (fileName.includes('.com')) {
        webCatWrite(outputFilePath, fileName);
    } else if (fileName.includes('.txt')) {
        catWrite(outputFilePath, fileName);
    }
} else {
    const fileName = process.argv[2];
    if (fileName.includes('.com')) {
        webCat(fileName);
    } else if (fileName.includes('.txt')) {
        cat(fileName);
    }
}
