const fs = require('fs');
const input = fs.readFileSync('Day-6/task2_input.txt', 'utf-8').replace(/\r/g, '');
const lines = input.split('\n');

const H = lines.length;
const W = Math.max(...lines.map(x => x.length));

// Normalize lines (pad with spaces)
const grid = lines.map(line => line.padEnd(W, ' '));

const isDigit = c => c >= '0' && c <= '9';

// Identify which columns belong to problems
let colIsActive = new Array(W).fill(false);

for (let c = 0; c < W; c++) {
    for (let r = 0; r < H - 1; r++) {
        if (isDigit(grid[r][c])) {
            colIsActive[c] = true;
            break;
        }
    }
}

// Group consecutive active columns into problems
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

for (const [L, R] of problems) {

    let nums = [];

    // Read columns RIGHT → LEFT
    for (let c = R; c >= L; c--) {
        let digits = '';

        // Read top → bottom (excluding last row)
        for (let r = 0; r < H - 1; r++) {
            if (isDigit(grid[r][c])) digits += grid[r][c];
        }

        if (digits.length > 0) {
            nums.push(Number(digits));
        }
    }

    // Operator from bottom row
    const op = grid[H - 1].slice(L, R + 1).trim();

    // Compute problem result
    if (op === '+') {
        grandTotal += nums.reduce((a, b) => a + b, 0);
    } else if (op === '*') {
        grandTotal += nums.reduce((a, b) => a * b, 1);
    }
}

console.log(grandTotal);

// It was same as part 1 except reading columns in reverse order and adjusting problem parsing accordingly