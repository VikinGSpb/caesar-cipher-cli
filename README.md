You can use my decode/encode app. After cloning you must write in console "npm install". Then you only need to write "node caesar-cipher-cli/app.js" and after that(in the same line) commands.

    -s, --shift: a shift
    -i, --input: an input file
    -o, --output: an output file
    -a, --action: an action encode/decode

Shift and action are required commands.

Examples: 

    node caesar-cipher-cli/app.js -s 5 -a encode
    node caesar-cipher-cli/app.js --shift 3 --action encode -i input.txt --output "output.txt"

