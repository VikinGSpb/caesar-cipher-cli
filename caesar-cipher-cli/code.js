const { letters, bigLetters } = require('./constants');

function code(action, shift, word) {
    const arr = word.split('');
    const result = [];
    arr.forEach((letter) => {
        if (!letters.includes(letter) && !bigLetters.includes(letter)) {
            result.push(letter);
        } else if (letters.includes(letter)) {
            letters.forEach((let, idx) => {
                if (letter === let) {
                    if (action === 'decode') {
                        if (idx + shift < letters.length) {
                            result.push(letters[idx + shift]); 
                        } else {
                            result.push(letters[Math.abs(letters.length - idx - shift)]); 
                        }
                    } else if (action === 'encode') {
                        if (idx - shift >= 0) {
                            result.push(letters[idx - shift]); 
                        } else {
                            result.push(letters[Math.abs(letters.length + idx - shift)]); 
                        }
                    }
                }
            });
        } else if (bigLetters.includes(letter)) {
            bigLetters.forEach((let, idx) => {
                if (letter === let) {
                    if (action === 'decode') {
                        if (idx + shift < bigLetters.length) {
                            result.push(bigLetters[idx + shift]); 
                        } else {
                            result.push(bigLetters[Math.abs(bigLetters.length - idx - shift)]); 
                        }
                    } else if (action === 'encode') {
                        if (idx - shift >= 0) {
                            result.push(bigLetters[idx - shift]); 
                        } else {
                            result.push(bigLetters[Math.abs(bigLetters.length + idx - shift)]); 
                        }
                    }
                }
            });
        }
    });
    return result.join('');
}

module.exports = { code };