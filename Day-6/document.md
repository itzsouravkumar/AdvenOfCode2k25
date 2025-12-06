## Task 1: Grand Total Calculation
The task is to read the math worksheet arranged in columns and calculate the grand total by performing the specified operations.
Algorithm:
1. Parse the input to read the numbers and operations in a column-wise manner.
2. For each problem, extract the numbers and the operation.
3. Perform the operation (addition or multiplication) on the extracted numbers.
```javascript
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
```
Is code me humne input ko column-wise parse kiya hai aur har problem ke liye numbers aur operation ko extract kiya hai. Phir humne specified operation ko perform karke grand total calculate kiya hai.

## Task 2: Grand Total Calculation (Right-to-Left)
The task is to read the math worksheet arranged in columns from right to left and calculate the grand total by performing the specified operations.
Algorithm:
1. Parse the input to read the numbers and operations in a column-wise manner from right to left.
2. For each problem, extract the numbers and the operation.
3. Perform the operation (addition or multiplication) on the extracted numbers.
```javascript
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
```
Is code me humne input ko right-to-left column-wise parse kiya hai aur har problem ke liye numbers aur operation ko extract kiya hai. Phir humne specified operation ko perform karke grand total calculate kiya hai.