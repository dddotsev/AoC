import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/);

    const input = lines.map(x => x.split(' ').map(x => parseInt(x)).filter(x => !isNaN(x)));

    const time = input[0];
    const distance = input[1];
    const ans1 = getAns(time, distance);
    console.log(ans1);

    const time2 = joinNumbers(time);
    const distance2 = joinNumbers(distance);
    const ans2 = getAns([time2], [distance2]);
    console.log(ans2);
};

const joinNumbers = (nums) => parseInt(nums.map(x => x+'').join(''));

const getAns = (time, distance) => {
    let ans = 1;
    for (let i = 0; i < time.length; i++) {
        for (let x = 1; x < time[i]/2; x++) {
            const y = time[i] - x;
            if (x * y > distance[i]) {
                const z=time[i] - (x - 1)*2 - 1
                ans *= z;
                break;
            }
        }
    }

    return ans;
};

main();