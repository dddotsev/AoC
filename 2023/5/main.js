// DISCLAIMER: The code works. The code is shit. Will fix.

import fs from 'fs';

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/)
        .filter(line => line !== '');

    const seeds = lines[0].substring(7).split(' ').map(x => parseInt(x));
    const maps = lines
        .slice(1)
        .reduce((acc, line) => {
            if (isNaN(parseInt(line[0]))) {
                acc.push([]);
            } else {
                acc[acc.length - 1].push(line);
            }
            return acc;
        }
        , [])
        .map(x => x.map(y => y.split(' ').map(z => parseInt(z))));

    const ans1 = getAns1(maps, seeds);
    console.log(ans1);

    const ans2 = getAns2(maps, seeds);
    console.log(ans2);
};

const getAns1 = (maps, seeds) => {

    const mapped = seeds.map(s => {
        for (const map of maps) {
            let done = false;
            for (const m of map) {
                if (!done && s >= m[1] && s - m[1] < m[2]) {
                    s = m[0] + s - m[1];
                    done = true;
                }
            }
            done = false;
        }

        return s;
    });

    return Math.min(...mapped);
};

const getAns2 = (maps, seeds) => {
    const q = [];

    for (let i = 0; i < seeds.length; i += 2) {
        q.push({f: seeds[i], t: seeds[i] + seeds[i+1] - 1, m1: -1, m2: -1})
    }
    maps = maps.map(x => x.map(y => ({f: y[1], t: y[1] + y[2] -1, m: y[0]-y[1]})));

    const final = [];

    while (q.length > 0) {
        const s = q.shift();

        if (s.f > s.t) { // just in case
            continue;
        }

        if (s.m1 === maps.length - 1) {
            final.push(s);
            continue;
        }

        if (s.m2 === maps[s.m1+1].length - 1) {
            q.push({...s, m1: s.m1+1, m2: -1});
            continue;
        }

        const m = maps[s.m1 + 1][s.m2 + 1];

        if ((m.f < s.f && m.t < s.f) || (m.f > s.t && m.t > s.t)) { // all out
            q.push({...s, m1: s.m1, m2: s.m2 + 1});
            continue;
        }

        if (m.f <= s.f && m.t >= s.t) { // seeds in
            q.push({f: s.f+m.m, t: s.t+m.m, m1: s.m1 + 1, m2: -1});
            continue;
        }

        if (m.f >= s.f && m.t <= s.t) { // map in
            q.push({f: s.f, t: m.f-1, m1: s.m1, m2: s.m2 + 1});
            q.push({f: m.f+m.m, t: m.t+m.m, m1: s.m1 + 1, m2: -1});
            q.push({f: m.t+1, t: s.t, m1: s.m1, m2: s.m2 + 1});
            continue;
        }

        if (m.f <= s.f && m.t <= s.t) { // map left
            q.push({f: s.f+m.m, t: m.t+m.m, m1: s.m1+1, m2: -1});
            q.push({f: m.t+1, t: s.t, m1: s.m1, m2: s.m2+1});
            continue;
        }

        if (m.f >= s.f && m.t >= s.t) { // map right
            q.push({f: s.f, t: m.f-1, m1: s.m1, m2: s.m2+1});
            q.push({f: m.f+m.m, t: s.t+m.m, m1: s.m1+1, m2: -1});
            continue;
        }

    }

    const froms = final.map(x => x.f)
    return Math.min(...froms);
};

main();