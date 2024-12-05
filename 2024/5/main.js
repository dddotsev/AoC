import fs from 'fs';

const main = () => {
    // const data = fs.readFileSync('inputs/simple1.txt', 'utf8');
    const data = fs.readFileSync('inputs/1.txt', 'utf8');
    const [rulesData, updatesData] = data.split('\r\n\r\n');
    const rules = rulesData.split('\r\n').map(rule => rule.split('|').map(subRule => parseInt(subRule)));
    const updates = updatesData.split('\r\n').map(update => update.split(',').map(subUpdate => parseInt(subUpdate)));
    

    const ans1 = getAns1(rules, updates);
    console.log(ans1);

    const ans2 = getAns2(rules, updates);
    console.log(ans2);
};

const getRuleMap = (rules) => {
    const ruleMap = {};

    for(const rule of rules) {
        ruleMap[rule[1]] = ruleMap[rule[1]] ? [...ruleMap[rule[1]], rule[0]] : [rule[0]];
    }

    return ruleMap;
}

const getCorrectlyOrderedUpdates = (ruleMap, updates) => {
    return updates
        .filter(update => update.every((subUpdate, index) => !ruleMap[subUpdate] || !update.slice(index + 1).some(sliceEl => ruleMap[subUpdate].includes(sliceEl))))
}

const sumMiddles = (updates) => {
    return updates.map(update => update[Math.floor(update.length / 2)])
    .reduce((acc, curr) => acc + curr, 0)
};

const getAns1 = (rules, updates) => {
    const ruleMap = getRuleMap(rules);

    const correctlyOrderedUpdates = getCorrectlyOrderedUpdates(ruleMap, updates);

    return sumMiddles(correctlyOrderedUpdates)
};

const getAns2 = (rules, updates) => {
    const ruleMap = getRuleMap(rules);

    const correctlyOrderedUpdates = getCorrectlyOrderedUpdates(ruleMap, updates);
    const toSort = updates.filter(update => !correctlyOrderedUpdates.includes(update));

    const sorted = toSort.map(update => update.sort((a, b) => {
        if (ruleMap[b] && ruleMap[b].includes(a)) {
            return -1;
        }

        if (ruleMap[a] && ruleMap[a].includes(b)) {
            return 1;
        }

        return 0;
    }));

    return sumMiddles(sorted);
};

main();