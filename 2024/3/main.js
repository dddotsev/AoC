import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('inputs/fucked.txt', 'utf8');
    const lines = data.split(/\r?\n/).map(x => x.split(' ').map(y => parseInt(y)));

    const ans1 = getAns1(lines);
    console.log(ans1);

    const [ans22, l22] = getAns2_2(lines);
    console.log(ans22);
    
    const [ans2, l2] = getAns2(lines);
    console.log(ans2);

    const y = [];
    for (let i = 0; i < lines.length; i++) {
        if (l2[i] !== l22[i]) {
            y.push(lines[i].join(' '));
        }
    }
    console.log(y.join('\n'));
};

const getAns1 = (lines) => {
    let ans = 0;

    for (let i = 0; i < lines.length; i++) {
        let ok = true;
        let lastSign = undefined;

        for(let j = 1; j < lines[i].length; j++) {
            const last = lines[i][j - 1];
            const current = lines[i][j];
            const diff = current - last;
            const absDiff = Math.abs(diff);

            if (absDiff < 1 || absDiff > 3) {
                ok = false;
                break;
            }

            const sign = Math.sign(diff);
            if (lastSign !== undefined && lastSign !== sign) {
                ok = false;
                break;
            }
            lastSign = sign;
        }

        if (ok) {
            ans++;
        }
    }

    return ans;
};



const getAns2_2 = (lines) => {
    let ans = 0;
    const x = {};

    for (let i = 0; i < lines.length; i++) {
        let toRemove = undefined;
        while (true) {
            let ok = true;
            let lastSign = undefined;

            const newLine = lines[i].filter((x, idx) => idx !== toRemove);

            for(let j = 1; j < newLine.length; j++) {
                const last = newLine[j - 1];
                const current = newLine[j];
                const diff = current - last;
                const absDiff = Math.abs(diff);

                if (absDiff < 1 || absDiff > 3) {
                    ok = false;
                    break;
                }

                const sign = Math.sign(diff);
                if (lastSign !== undefined && lastSign !== sign) {
                    ok = false;
                    break;
                }
                lastSign = sign;
            }

            if (ok) {
                ans++;
                x[i] = true;
                break;
            } else {
                if (toRemove === undefined) {
                    toRemove = 0;
                } else {
                    toRemove++;
                }
                if (toRemove >= lines[i].length) {
                    break;
                }
            }
        }
    }

    return [ans, x];
};

const getAns2 = (lines) => {
    let ans = 0;
    const x = {};

    for (let i = 0; i < lines.length; i++) {
        let ok = true;
        let lastSign = undefined;
        let hasRemoved = false;
        let isLastRemoved = false;

        for(let j = 1; j < lines[i].length; j++) {
            const last = lines[i][j - (isLastRemoved ? 2 : 1)];
            const current = lines[i][j];
            const diff = current - last;
            const absDiff = Math.abs(diff);

            if (absDiff < 1 || absDiff > 3) {
                if (hasRemoved) {
                    ok = false;
                    break;
                } else {
                    hasRemoved = true;
                    isLastRemoved = true;
                    continue;
                }
            }

            const sign = Math.sign(diff);
            if (lastSign !== undefined && lastSign !== sign) {
                if (hasRemoved) {
                    ok = false;
                    break;
                } else {
                    hasRemoved = true;
                    isLastRemoved = true;
                    continue;
                }
            }
            lastSign = sign;
            isLastRemoved = false;
        }

        if (ok) {
            x[i] = true;
            ans++;
        }
    }

    return [ans, x];
};


main();