// DISCLAIMER: Code is shit. Won't fix.

import fs from 'fs';

const hasLeft = ['J', '-', '7'];
const hasTop = ['|', 'J', 'L'];
const hasRight = ['L', '-', 'F'];
const hasBottom = ['|', 'F', '7'];

const main = () => {

    const data = fs.readFileSync('input.txt', 'utf8');
    let lines = data.split(/\r?\n/);
    let tiles = lines.map(l => l.split(''));

    let at;
    let done = false;
    for (let i = 0; i < tiles.length && !done; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j] === 'S') {
                at = {i, j};
                done = true;
                break;
            }
        }
    }
    
    const vis = Array(tiles.length).fill().map(()=>Array(tiles[0].length).fill(false));
    vis[at.i][at.j]=true;

    fillTile(tiles, at);

    let travels = 0;
    while (true) {
        switch (tiles[at.i][at.j]) {
            case '-':
                at = goto(vis, {...at, j: at.j-1}, {...at, j: at.j+1});
                break;
            case '|':
                at = goto(vis, {...at, i: at.i-1}, {...at, i: at.i+1});
                break;
            case '7':
                at = goto(vis, {...at, j: at.j-1}, {...at, i: at.i+1});
                break;
            case 'L':
                at = goto(vis, {...at, i: at.i-1}, {...at, j: at.j+1});
                break;
            case 'J':
                at = goto(vis, {...at, i: at.i-1}, {...at, j: at.j-1});
                break;
            case 'F':
                at = goto(vis, {...at, j: at.j+1}, {...at, i: at.i+1});
                break;
        }
        travels++;

        if (!at) {
            break;
        }
    }

    const ans1 = travels/2;
    console.log(ans1);
    
    tiles = clean(tiles, vis);
    tiles = expand(tiles);

    const visited = Array(tiles.length).fill().map(()=>Array(tiles[0].length).fill(false));
    const toVisit = [{i: 0, j:0}];
    visited[0][0]=true;
    tiles[0][0]='O';

    while (toVisit.length > 0) {
        const cur = toVisit.pop();
        
        visit(tiles, visited, toVisit, {i: cur.i-1, j: cur.j});
        visit(tiles, visited, toVisit, {i: cur.i+1, j: cur.j});
        visit(tiles, visited, toVisit, {i: cur.i, j: cur.j+1});
        visit(tiles, visited, toVisit, {i: cur.i, j: cur.j-1});
    }

    let ans2 = 0;
    for (let i=1; i<tiles.length; i+=2) {
        for (let j=1; j<tiles[i].length; j+=2) {
            if (tiles[i][j] === '.') {
                ans2++;
            }
        }
    }

    console.log(ans2);
};

const visit = (tiles, visited, toVisit, pos) => {
    const l = visited[pos.i];

    if (!l) {
        return;
    }

    if (l[pos.j] === false && tiles[pos.i][pos.j] === '.') {
        l[pos.j] = true;
        tiles[pos.i][pos.j]='O';
        toVisit.push(pos);
    }
}

const findHoles = (tiles, pos) => {
    const ans = [];

    for (const has of [hasLeft, hasTop, hasRight, hasBottom]) {
        if (has.includes(get(tiles, pos))) {
            ans.push(has);
        }
    }

    return ans;
};

const fillTile = (tiles, at) => {
    const left = findHoles(tiles, {i: at.i, j: at.j-1});
    const top = findHoles(tiles, {i: at.i-1, j: at.j});
    const right = findHoles(tiles, {i: at.i, j: at.j+1});
    const bottom = findHoles(tiles, {i: at.i+1, j: at.j});

    if (left.includes(hasRight) && right.includes(hasLeft)) {
        tiles[at.i][at.j] = '-';
    } else if (top.includes(hasBottom) && bottom.includes(hasTop)) {
        tiles[at.i][at.j] = '|';
    } else if (top.includes(hasBottom) && right.includes(hasLeft)) {
        tiles[at.i][at.j] = 'L';
    } else if (right.includes(hasLeft) && bottom.includes(hasTop)) {
        tiles[at.i][at.j] = 'F';
    } else if (left.includes(hasRight) && top.includes(hasBottom)) {
        tiles[at.i][at.j] = 'J';
    } else if (left.includes(hasRight) && bottom.includes(hasTop)) {
        tiles[at.i][at.j] = '7';
    } else {
        tiles[at.i][at.j] = '.';
    }
};

const get = (tiles, pos) => {
    const l = tiles[pos.i];
    if (!l) {
        return undefined;
    }

    return l[pos.j];
}

const expand = (tiles) => {
    const newTiles=[];

    for (let i = 0; i < tiles.length; i++) {
        const line = []
        newTiles.push(line);
        for (let j = 0; j < tiles[i].length; j++) {
            line.push(tiles[i][j]);
            line.push(undefined);
        }
        newTiles.push(Array(tiles[i].length*2).fill(undefined));
    }

    for (let i = 0; i < newTiles.length; i++) {
        for (let j = 0; j < newTiles[i].length; j++) {
            if (!newTiles[i][j]) {
                fillTile(newTiles, {i, j});
            }
        }
    }

    const len = newTiles[0].length+1;
    newTiles.unshift(Array(len).fill('.'))
    for (let i = 0; i < newTiles.length; i++) {
        newTiles[i].unshift('.');
    }

    return newTiles;
};

const clean = (tiles, vis) => {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (!vis[i][j]) {
                tiles[i][j]='.';
            }
        }
    }

    return tiles;
};

const goto = (vis, pos1, pos2) => {
    let pos;
    if (!vis[pos1.i][pos1.j]) {
        pos = pos1;
    } else if (!vis[pos2.i][pos2.j]) {
        pos = pos2;
    } else {
        return undefined;
    }
    vis[pos.i][pos.j]=true;
    return pos;
}

main();
