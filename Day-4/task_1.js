const fs = require('fs');
const input = fs.readFileSync('Day-4/task1_input.txt', 'utf-8').trim(); // Read the input from 'task1_input.txt' file

const grid = input.split('\n').map(line => line.split('')); // Create a 2D array representation of the grid
const numRows = grid.length;
const numCols = grid[0].length;
let accessibleRollsCount = 0; // To count accessible rolls of paper

// Directions for the 8 adjacent positions
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

console.log(accessibleRollsCount); // Output the total count of accessible rolls