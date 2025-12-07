const fs = require('fs');
const input = fs.readFileSync('Day-7/task2_input.txt', 'utf-8').trim().split('\n');

let width = input[0].length;
let height = input.length;

let memo = new Map();

function countTimelines(x, y) {
    if (y >= height) {
        return 1; // Reached the bottom of the manifold
    }
    let key = `${x},${y}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    let cell = input[y][x];
    let totalTimelines = 0;
    if (cell === '^') {
        // Splitter: go left and right
        if (x > 0) {
            totalTimelines += countTimelines(x - 1, y + 1);
        }
        if (x < width - 1) {
            totalTimelines += countTimelines(x + 1, y + 1);
        }
    } else {
        // Empty space: go down
        totalTimelines += countTimelines(x, y + 1);
    }
    memo.set(key, totalTimelines);
    return totalTimelines;
}

// Find the starting position 'S'
let startX = input[0].indexOf('S');
let startY = 0;

let totalTimelines = countTimelines(startX, startY + 1); // Start just below 'S'

console.log(`A single tachyon particle would end up on a total of ${totalTimelines} different timelines.`);