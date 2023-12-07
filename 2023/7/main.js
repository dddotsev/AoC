// DISCLAIMER: The code works. The code is shit. Will refactor.

import fs from 'fs';

const order = {'2': 1, '3': 2, '4': 3, '5': 4, '6': 5,
               '7': 6, '8': 7, '9': 8, 'T': 9, 'J': 10,
               'Q': 11, 'K': 12, 'A': 13};

const main = () => {
    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/);

    const split = lines.map(x => x.split(' '));
    let hands = split
        .map(x => ({cards: x[0], bid: parseInt(x[1]), rating: rate1(x[0])}));
    hands.sort(compare);

    const ans1 = calcAns(hands);
    console.log(ans1);

    order['J'] = 0;
    hands = hands.map(x => ({...x, rating: rate2(x.cards)}));
    hands.sort(compare);

    const ans2 = calcAns(hands);
    console.log(ans2);
};

const calcAns = (hands) => hands.reduce((acc, x, i) => acc + x.bid*(i+1), 0);

const rate1 = (cards) => {
    const vals = {};

    for (const card of cards) {
        vals[card] = !vals[card] ? 1 : vals[card]+1;
    }
    const type = Object.values(vals).sort().join('');
    
    return rateType(type);
};

const rateType = (type) => {
    switch (type) {
        case '5':
            return 7;
        case '14':
            return 6;
        case '23':
            return 5;
        case '113':
            return 4;
        case '122':
            return 3;
        case '1112':
            return 2;
        default:
            return 1;
    }
};

const rate2 = (cards) => {
    const vals = {};

    let jokers = 0;
    for (const card of cards) {
        if (card === 'J') {
            jokers++;
            continue;
        }

        vals[card] = !vals[card] ? 1 : vals[card]+1;
    }
    let type = Object.values(vals).sort().join('');
    type = type.substring(0, type.length-1) + ((parseInt(type[type.length-1]) || 0) + jokers);
    
    return rateType(type);
};



const compare = (a, b) => {
    if (a.rating > b.rating) {
        return 1;
    }

    if (a.rating < b.rating) {
        return -1;
    }

    for (let i = 0; i < a.cards.length; i++) {
        const oa = order[a.cards[i]];
        const ob = order[b.cards[i]];
        if (oa > ob) {
            return 1;
        }
    
        if (oa < ob) {
            return -1;
        }
    }

    return 0;
};

main();