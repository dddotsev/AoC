import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/);

    const dirs = lines[0].split('');
    lines = lines.slice(2);
    const path = {};

    for (const line of lines) {
        path[line.substring(0, 3)] = {L: line.substring(7, 10), R: line.substring(12, 15)};
    }

    const ans1 = findPathLen(path, dirs, 'AAA', (p) => p === 'ZZZ');
    console.log(ans1);

    const ans2 = getAns2(path, dirs);
    console.log(ans2);
};

const findPathLen = (path, dirs, pos, isDone) => {
    let ans = 0;
    while (true) {
        for (const dir of dirs) {
            pos = path[pos][dir];
            ans++;

            if (isDone(pos)) {
                return ans;
            }
        }
    }
};

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);

const getAns2 = (path, dirs) => {
    let startFrom = Object.keys(path).filter(x => x.endsWith('A'));
    const pathLens = startFrom.map(start => findPathLen(path, dirs, start, x => x[2] === 'Z'));

    const ans = pathLens.reduce(lcm);
    return ans;
};

main();
