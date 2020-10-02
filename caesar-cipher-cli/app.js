const fs = require('fs');
const chalk = require('chalk');
const { code } = require('./code');
const { action, shift, outFile, inFile } = require('./args');

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

if (action && shift) {
    if (!outFile && !inFile) {
        process.stdin.on('readable', () => {
            if (process.stdin.isPaused()) {
                process.stdin.resume();
            }
            const data = process.stdin.read();
            if (data) {
                process.stdout.write(code(action, shift, data));
                process.stdin.pause();
            }
        });
    }

    if (outFile && !inFile) {
        process.stdin.on('readable', () => {
            if (process.stdin.isPaused()) {
                process.stdin.resume();
            }
            const data = process.stdin.read();
            if (data) {
                try {
                    const writeStream = fs.createWriteStream(outFile, {encoding: 'utf-8', flags: 'a+'});
                    writeStream.write(code(action, shift, data));
                    writeStream.end();
                    process.stdin.pause();
                } catch {
                    console.error(chalk.red('wrong file name for output'));
                }
            }
        });
    }

    if (!outFile && inFile) {
        try {
            const readStream = fs.createReadStream(inFile, 'utf-8');
            readStream.on('data', (data) => {
                process.stdout.write(code(action, shift, data));
            });
            readStream.read();
        } catch(e) {
            console.error(chalk.red('wrong file name for input'));
        }
    }

    if (outFile && inFile) {
        try {
            const readStream = fs.createReadStream(inFile, 'utf-8');
            const writeStream = fs.createWriteStream(outFile, {encoding: 'utf-8', flags: 'a+'});
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