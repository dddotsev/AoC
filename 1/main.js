import fs from 'fs';
  
// Use fs.readFile() method to read the file 
fs.readFile('input.txt', 'utf8', function(err, data){ 
      
    const lines = data.split(/\r?\n/);

    const sum = lines.reduce((sum, cur) => sum + getNum(cur), 0);

    console.log(sum);
});

const getNum = line => {
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
