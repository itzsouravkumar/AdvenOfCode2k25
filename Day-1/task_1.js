// Read input from file
const fs = require('fs');
const input = fs.readFileSync('Day-1/task1_input.txt', 'utf-8').trim().split('\n'); // It will read the input from 'task1_input.txt' file and split it into lines

let dialPosition = 50; // Starting position
let zeroCount = 0; // Count of times the dial points at 0

// Now our input variable contains the lines from the file and our approach will be simple
input.forEach(line => { // Here we iterate through each line of the input
    const direction = line[0]; // Get the direction (L or R)
    const distance = parseInt(line.slice(1), 10); // Get the distance and convert it to an integer
    if(direction === 'L') {
        dialPosition = (dialPosition - distance + 100) % 100; // Rotate left
    } else if(direction === 'R') {
        dialPosition = (dialPosition + distance) % 100; // Rotate right
    }
    if(dialPosition === 0) {
        zeroCount++; // Increment count if dial points at 0
    }
});

console.log(zeroCount); // Output the result