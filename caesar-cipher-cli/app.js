const fs = require('fs');
const chalk = require('chalk');
const { code } = require('./code');
const { action, shift, outFile, inFile } = require('./args');

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

if (action && shift) {
    if (!outFile && !inFile) {
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            if (chunk) {
                process.stdout.write(code(action, shift, chunk));
            }
        });
    }

    if (outFile && !inFile) {
        process.stdin.on('readable', () => {
            const chunk = process.stdin.read();
            if (chunk) {
                try {
                    const writeStream = fs.createWriteStream(outFile);
                    writeStream.write(code(action, shift, chunk));
                    writeStream.end();
                } catch {
                    console.error(chalk.red('wrong file name for output'));
                }
            }
        });
    }

    if (!outFile && inFile) {
        try {
            const readStream = fs.createReadStream(inFile, 'utf-8');
            readStream.on('data', (chunk) => {
                process.stdout.write(code(action, shift, chunk));
            });
            readStream.read();
        } catch(e) {
            console.error(chalk.red('wrong file name for input'));
        }
    }

    if (outFile && inFile) {
        try {
            const readStream = fs.createReadStream(inFile, 'utf-8');
            const writeStream = fs.createWriteStream(outFile, 'utf-8');
            readStream.on('data', (chunk) => {
                writeStream.write(code(action, shift, chunk));
                writeStream.end();
            });
            readStream.read();
        } catch(e) {
            console.error(chalk.red('wrong file name for input or output'));
        }
    }
} else {
    console.error(chalk.red('action and shift is required'));
}