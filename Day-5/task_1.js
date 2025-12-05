const fs = require('fs');

function parseInput(input) {
    const [rangesPart, idsPart] = input.trim().split('\n\n');
    const ranges = rangesPart.split('\n').map(line => {
        const [start, end] = line.split('-').map(Number);
        return { start, end };
    });
    const ids = idsPart.split('\n').map(Number);
    return { ranges, ids };
}

function isFresh(id, ranges) {
    return ranges.some(range => id >= range.start && id <= range.end);
}

function countFreshIngredients(input) {
    const { ranges, ids } = parseInput(input);
    let freshCount = 0;

    ids.forEach(id => {
        if (isFresh(id, ranges)) {
            freshCount++;
        }
    });

    return freshCount;
}

const input = fs.readFileSync('Day-5/task1_input.txt', 'utf-8');
const result = countFreshIngredients(input);
console.log(`Number of fresh ingredient IDs: ${result}`);

