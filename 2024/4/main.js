import fs from 'fs';

const main = () => {
    // const data = fs.readFileSync('inputs/simple1.txt', 'utf8');
    // const data = fs.readFileSync('inputs/pedali.txt', 'utf8');
    const data = fs.readFileSync('inputs/1.txt', 'utf8');
    const dataArr = data.split('\r\n').map((line) => line.split(''));

    const ans1 = getAns1(dataArr);
    console.log(ans1);

    const ans2 = getAns2(dataArr);
    console.log(ans2);
};

const text = 'XMAS';

const search_better = (data, i, j, n) => {
    if (n === text.length) {
        return 1;
    }

    if (i < 0 || i >= data.length || j < 0 || j >= data[i].length) {
        return 0;
    }

    if (data[i][j] === text[n]) {
        const n1 = n + 1;

        return 0
            + search(data, i - 1, j - 1, n1)
            + search(data, i - 1, j, n1)
            + search(data, i - 1, j + 1, n1)
            + search(data, i, j - 1, n1)
            + search(data, i, j + 1, n1)
            + search(data, i + 1, j - 1, n1)
            + search(data, i + 1, j, n1)
            + search(data, i + 1, j + 1, n1)
    }

    return 0;
};

const search = (data, i, j, n, diri, dirj) => {
    if (n === text.length) {
        return 1;
    }

    if (i < 0 || i >= data.length || j < 0 || j >= data[i].length) {
        return 0;
    }

    if (data[i][j] === text[n]) {
        const n1 = n + 1;

        return search(data, i + diri, j + dirj, n1, diri, dirj);
    }

    return 0;
};

const getAns1 = (data) => {
    let ans = 0;

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            ans += 0
            + search(data, i, j, 0, -1, -1)
            + search(data, i, j, 0, -1, 0)
            + search(data, i, j, 0, -1, 1)
            + search(data, i, j, 0, 0, -1)
            + search(data, i, j, 0, 0, 1)
            + search(data, i, j, 0, 1, -1)
            + search(data, i, j, 0, 1, 0)
            + search(data, i, j, 0, 1, 1);
        }
    }

    return ans;
};

const getAns2 = (data) => {
    let ans = 0;

    for(let i = 1; i < data.length - 1; i++) {
        for(let j = 1; j < data[i].length - 1; j++) {
            if (data[i][j] === 'A'
                && ((data[i-1][j-1] === 'M' && data[i+1][j+1] === 'S') || (data[i-1][j-1] === 'S' && data[i+1][j+1] === 'M'))
                && ((data[i-1][j+1] === 'M' && data[i+1][j-1] === 'S') || (data[i-1][j+1] === 'S' && data[i+1][j-1] === 'M'))
            ) {
                ans++;
            }
        }
    }

    return ans;
};

main();