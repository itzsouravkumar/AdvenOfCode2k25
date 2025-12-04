## Task 1: Accessible Paper Rolls
The task is to find the number of paper rolls that can be accessed by a forklift. A paper roll is represented by '@' and can be accessed if there are fewer than four adjacent paper rolls in the eight surrounding positions.

Algorithm:
1. Read the input file line by line to create a 2D grid representation of the paper rolls.
2. For each paper roll ('@'), check its eight adjacent positions.
3. Count the number of adjacent paper rolls. If there are fewer than four, increment the accessible count.
```javascript
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
];

// Function to check if a roll of paper is accessible
function isAccessible(row, col) {
    let adjacentRolls = 0;

    // Check all 8 adjacent positions
    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        // Check if the new position is within bounds
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            if (grid[newRow][newCol] === '@') {
                adjacentRolls++;
            }
        }
    }

    return adjacentRolls < 4; // Accessible if fewer than 4 adjacent rolls
}

// Iterate through each cell in the grid
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        if (grid[row][col] === '@' && isAccessible(row, col)) {
            accessibleRollsCount++; // Increment count if roll is accessible
        }
    }
}
```

Is code me humne ek grid banaya hai jisme paper rolls ko represent kiya gaya hai. Phir humne har roll ke 8 adjacent positions ko check kiya aur count kiya ki kitne adjacent rolls hain. Agar adjacent rolls 4 se kam hain to hum accessible count ko increment karte hain.

## Task 2: Forklift Paper Roll Removal
The task is to find the total number of paper rolls that can be removed by the forklifts. A paper roll can be removed if it is accessible (fewer than four adjacent paper rolls).
Algorithm:
1. Use the same accessibility check as in Task 1.
2. While there are accessible paper rolls, remove them and update the grid.
```javascript
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
];

// Function to check if a roll of paper is accessible
function isAccessible(row, col) {
    let adjacentRolls = 0;

    // Check all 8 adjacent positions
    for (const [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;

        // Check if the new position is within bounds
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            if (grid[newRow][newCol] === '@') {
                adjacentRolls++;
            }
        }
    }

    return adjacentRolls < 4; // Accessible if fewer than 4 adjacent rolls
}

// Repeat the removal process until no more rolls can be removed
let rollsRemovedInIteration;
do {
    rollsRemovedInIteration = 0;

    // Iterate through each cell in the grid
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === '@' && isAccessible(row, col)) {
                grid[row][col] = '.'; // Remove the roll of paper
                rollsRemovedInIteration++;
            }
        }
    }

    totalRemovedRolls += rollsRemovedInIteration; // Update total removed rolls
} while (rollsRemovedInIteration > 0); // Continue until no rolls are removed in an iteration
```

Is code me humne ek loop banaya hai jo tab tak chalta rahega jab tak koi roll remove ho raha hai. Har iteration me hum grid ko check karte hain aur accessible rolls ko remove karte hain. Jab tak koi roll remove hota rahega, loop chalta rahega aur total removed rolls count hota rahega.