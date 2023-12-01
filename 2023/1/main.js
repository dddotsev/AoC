import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    const lines = data.split(/\r?\n/);

    const sum1 = lines.reduce((sum, cur) => sum + getNumberFromDigits(cur), 0);
    console.log(sum1);

    const sum2 = lines.reduce((sum, cur) => sum + getNumberFromDigitsAndLetters(cur), 0);
    console.log(sum2);
};

const getNumberFromDigits = line => {
    const chars = Array.from(line);
    let first, last;

    for (const c of chars) {
        if (isNumber(c)) {
            const num = parseInt(c);
            first = first === undefined ? num : first;
            last = num;
        }
    }

    first = first || 0;
    last = last || 0;

    return first * 10 + last;
};
const isNumber = c => {
    return /^\d$/.test(c);
}


const numbers =   ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numberMap = [1,      2,     3,       4,      5,      6,     7,       8,       9,      0,   1,   2,   3,   4,   5,   6,   7,   8,   9 ];

const getNumberFromDigitsAndLetters = line => {
    const chars = Array.from(line);
    let first, last;
    const matchedTos = new Array(numbers.length).fill(-1);

    for (const c of chars) {
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];

            if (c === number[matchedTos[i]+1]) {
                matchedTos[i]++;
                if (matchedTos[i] + 1 === number.length) {
                    last = numberMap[i];
                    first = first === undefined ? numberMap[i] : first;
                }
            } else {
                // since there are no 2 matching common sequences of letters in the numbers, it's ok to just check the first letter
                matchedTos[i] = c === number[0] ? 0 : -1;
            }
        }
    }

    first = first || 0;
    last = last || 0;

    return first * 10 + last;
};

main();