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

<!-- Now, the Elves just need help accessing as much of the paper as they can.

Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

Initial state:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

Remove 13 rolls of paper:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.

Remove 12 rolls of paper:
.......x..
.@@.x.x.@x
x@@@@...@@
x.@@@@..x.
.@.@@@@.x.
.x@@@@@@.x
.x.@.@.@@@
..@@@.@@@@
.x@@@@@@@.
....@@@...

Remove 7 rolls of paper:
..........
.x@.....x.
.@@@@...xx
..@@@@....
.x.@@@@...
..@@@@@@..
...@.@.@@x
..@@@.@@@@
..x@@@@@@.
....@@@...

Remove 5 rolls of paper:
..........
..x.......
.x@@@.....
..@@@@....
...@@@@...
..x@@@@@..
...@.@.@@.
..x@@.@@@x
...@@@@@@.
....@@@...

Remove 2 rolls of paper:
..........
..........
..x@@.....
..@@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@x.
....@@@...

Remove 1 roll of paper:
..........
..........
...@@.....
..x@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
...x@.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
....x.....
...@@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...

Remove 1 roll of paper:
..........
..........
..........
...x@@....
...@@@@...
...@@@@@..
...@.@.@@.
...@@.@@@.
...@@@@@..
....@@@...
Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?

Your puzzle answer was 8409. -->
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