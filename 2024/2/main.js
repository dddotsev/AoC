import fs from 'fs';

const main = () => {
    // const data = fs.readFileSync('inputs/simple2.txt', 'utf8');
    const data = fs.readFileSync('inputs/1.txt', 'utf8');

    // const ans1 = getAns1(data);
    // console.log(ans1);
    
    const ans2 = getAns2(data);
    console.log(ans2);
};

const getAns1 = (data) => {
    let n1 = undefined;
    let n2 = undefined;
    let stage = 0;
    let str = '';

    let ans = 0;


    const reset = () => {
        n1 = undefined;
        n2 = undefined;
        stage = 0;
        str = '';
    };

    for (let i = 0; i < data.length; i++) {
        const c = data[i];

        if (stage === 0) {
            if (['m', 'u', 'l'].includes(c)) {
                str += c;
                continue;
            }
            if (c === '(' && str === 'mul') {
                stage = 1;
                continue;
            }
        }

        if (stage === 1) {
            if (c === ',' && n1 !== undefined) {
                stage = 2;
                continue;
            }

            if (c >= '0' && c <= '9') {
                const n = parseInt(c);
                n1 = n1 ? n1 * 10 + n : n;
                continue;
            }
        }

        if (stage === 2) {
            if (c === ')' && n2 !== undefined) {
                ans += n1 * n2;
                reset();
                continue;
            }

            if (c >= '0' && c <= '9') {
                const n = parseInt(c);
                n2 = n2 ? n2 * 10 + n : n;
                continue;
            }
        }

        reset();
    }

    return ans;
};

const getAns2 = (data) => {
    let n1 = undefined;
    let n2 = undefined;
    let stage = 0;
    let str = '';

    let ans = 0;
    let isEnabled = true;
    let doStr = '';


    const reset = () => {
        n1 = undefined;
        n2 = undefined;
        stage = isEnabled ? 0 : -1;
        str = '';
    };

    for (let i = 0; i < data.length; i++) {
        const c = data[i];

        if (c === 'd') {
            doStr = 'd';
        } else {
            doStr += c;
        }

        if (c === ')') {
            if (doStr === 'don\'t()') {
                isEnabled = false;
                reset();
                continue;
            } else if (doStr === 'do()') {
                isEnabled = true;
                reset();
                continue;
            }
        }

        if (stage === 0) {
            if (['m', 'u', 'l'].includes(c)) {
                str += c;
                continue;
            }
            if (c === '(' && str === 'mul') {
                stage = 1;
                continue;
            }
        }

        if (stage === 1) {
            if (c === ',' && n1 !== undefined) {
                stage = 2;
                continue;
            }

            if (c >= '0' && c <= '9') {
                const n = parseInt(c);
                n1 = n1 ? n1 * 10 + n : n;
                continue;
            }
        }

        if (stage === 2) {
            if (c === ')' && n2 !== undefined) {
                ans += n1 * n2;
                reset();
                continue;
            }

            if (c >= '0' && c <= '9') {
                const n = parseInt(c);
                n2 = n2 ? n2 * 10 + n : n;
                continue;
            }
        }

        reset();
    }

    return ans;
};


main();