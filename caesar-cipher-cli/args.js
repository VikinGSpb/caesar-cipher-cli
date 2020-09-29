const argv = require('minimist')(process.argv.slice(2));
let action, shift, outFile, inFile;

for(key in argv) {
    switch(key) {
        case 'a': action = argv.a; break;
        case 'action': action = argv.action; break;
        case 's': shift = argv.s; break;
        case 'shift': shift = argv.shift; break;
        case 'o': outFile = argv.o; break;
        case 'output': outFile = argv.output; break;
        case 'i': inFile = argv.i; break;
        case 'input': inFile = argv.input; break;
    }
}

module.exports = { action, shift, outFile, inFile };