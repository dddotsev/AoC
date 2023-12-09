import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/);

    let numArrays = lines
        .map(line => line.split(' ').map(x => parseInt(x)));

    const predicts1 = numArrays.map(predictNext);
    const ans1 = sum(predicts1);
    console.log(ans1);

    const predicts2 = numArrays.map(x => x.reverse()).map(predictNext);
    const ans2 = sum(predicts2);
    console.log(ans2);
};

const sum = (nums) => nums.reduce((a, b) => a + b, 0);

const predictNext = (nums) => {
    const difs = [nums];

    while (!difs.at(-1).every(x => x === 0)) {
        difs.push(difs.at(-1).map((x, i, arr) => x - arr[i-1]).slice(1));
    }

    const next = sum(difs.map(x => x.at(-1)));

    return next;
};

main();
