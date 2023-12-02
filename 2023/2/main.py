import numpy as np
import functools as ft

RED = 'red'
GREEN = 'green'
BLUE = 'blue'

def main():
    file = open('input.txt', 'r')
    lines = file.readlines()

    lineRes1 = map(processLine1, lines)
    sumLines1 = sum(lineRes1)
    print(sumLines1)

    lineRes2 = map(processLine2, lines)
    sumLines2 = sum(lineRes2)
    print(sumLines2)

def processLine1(line: str):
    tokens = tokenize(line)
    game = int(tokens[0][1][:-1])
    tokens = tokens[1:]
    grouped = group_and_clean(tokens)
    sumarized = list(map(sumarize, grouped))
    lineRes = sum(isOk(group[RED], group[GREEN], group[BLUE]) for group in sumarized)

    return game if lineRes == len(sumarized) else 0

def processLine2(line: str):
    tokens = tokenize(line)
    game = int(tokens[0][1][:-1])
    tokens = tokens[1:]
    grouped = group_and_clean(tokens)
    sumarized = list(map(sumarize, grouped))
    maxes = ft.reduce(
        lambda res, x: {RED: maxColor(res, x, RED), GREEN: maxColor(res, x, GREEN), BLUE: maxColor(res, x, BLUE)},
        sumarized,
        {RED: 0, GREEN: 0, BLUE: 0}
    )

    return maxes[RED] * maxes[GREEN] * maxes[BLUE]

def maxColor(a, b, color):
    return max(a[color], b[color])

def sumarize(group):
    res = {RED: 0, GREEN: 0, BLUE: 0}
    return ft.reduce(addData, group, res)

def addData(obj, cur):
    obj[cur[1]]=cur[0]

    return obj

def group_and_clean(tokens: list):
    groups = []
    currentGroup = []

    for token in tokens:
        last = token[1][-1:]
        currentGroup.append([cleanNum(token[0]), cleanStr(token[1])])
        
        if last == ';':
            groups.append(currentGroup)
            currentGroup = []

    return groups

def cleanNum(str):
    return int(str)

def cleanStr(str):
    return str[:-1]

def tokenize(line: str) -> list:
    tokens = line.split(' ')
    tokens[-1] = tokens[-1].replace('\r\n', ';')
    tokens[-1] = tokens[-1].replace('\r', ';')
    tokens[-1] = tokens[-1].replace('\n', ';')

    split=np.array_split(tokens, len(tokens)/2)

    return split
    
def isOk(r: int, g: int, b: int):
    return r <= 12 and g <= 13 and b <= 14

main()
