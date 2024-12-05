import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('inputs/1.txt', 'utf8');
    const lines = data.split(/\r?\n/).map(x => x.split('   '));

    const a1 = lines.map(x => parseInt(x[0]));
    const a2 = lines.map(x => parseInt(x[1]));

    const ans1 = getAns1(a1, a2);
    console.log(ans1);

    const ans2 = getAns2(a1, a2);
    console.log(ans2);
};

const sortNum = (array) => {
    return [...array].sort((a, b) => a - b);
}

const getAns1 = (a1, a2) => {
    a1 = sortNum(a1);
    a2 = sortNum(a2);

    let ans = 0;
    for (let i = 0; i < a1.length; i++) {
        ans += Math.abs(a1[i] - a2[i]);
    }

    return ans;
};

const getAns2 = (a1, a2) => {
    const map2 = {};

    for (let i = 0; i < a2.length; i++) {
        map2[a2[i]] = map2[a2[i]] ? map2[a2[i]] + 1 : 1;
    }

    let ans = 0;
    for (let i = 0; i < a1.length; i++) {
        ans += a1[i] * (map2[a1[i]] || 0);
    }

    return ans;
};


main();