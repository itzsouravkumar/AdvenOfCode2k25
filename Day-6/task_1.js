const fs = require('fs');
const input = fs.readFileSync('Day-6/task1_input.txt', 'utf-8').replace(/\r/g, '');
const lines = input.split('\n');

const H = lines.length;
const W = Math.max(...lines.map(x => x.length));

// Normalize lines (pad with spaces)
const grid = lines.map(line => line.padEnd(W, ' '));

const isDigit = c => c >= '0' && c <= '9';

// STEP 1: Identify columns that belong to problems
let colIsActive = new Array(W).fill(false);

// A column is active if ANY of the non-op rows have a digit in it
for (let c = 0; c < W; c++) {
    for (let r = 0; r < H - 1; r++) {
        if (isDigit(grid[r][c])) {
            colIsActive[c] = true;
            break;
        }
    }
}

// STEP 2: Group consecutive active columns into problem blocks
let problems = [];
let start = null;

for (let c = 0; c < W; c++) {
    if (colIsActive[c]) {
        if (start === null) start = c;
    } else {
        if (start !== null) {
            problems.push([start, c - 1]);
            start = null;
        }
    }
}
if (start !== null) problems.push([start, W - 1]);

let grandTotal = 0;

// STEP 3: Parse each problem block
for (const [L, R] of problems) {

    // Extract numbers
    let nums = [];

    for (let r = 0; r < H - 1; r++) {
        const value = grid[r].slice(L, R + 1).trim();
        if (value !== '' && !isNaN(Number(value))) {
            nums.push(Number(value));
        }
    }

    // Operation from last row
    const op = grid[H - 1].slice(L, R + 1).trim();

    // STEP 4: Evaluate
    if (op === '+') {
        grandTotal += nums.reduce((a, b) => a + b, 0);
    } else if (op === '*') {
        grandTotal += nums.reduce((a, b) => a * b, 1);
    }
}

console.log(grandTotal);

