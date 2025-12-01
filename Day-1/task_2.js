const fs = require('fs');
const input = fs.readFileSync('Day-1/task2_input.txt', 'utf-8').trim().split('\n'); // It will read the input from 'task2_input.txt' file and split it into lines

// In this task, we need to count how many times the dial points at 0, including during rotations
let dialPosition = 50;
let zeroCount = 0;

// Improvement is to count zeros during the rotation itself
input.forEach(line => { // Here we iterate through each line of the input
    const direction = line[0]; // Get the direction (L or R)
    const distance = parseInt(line.slice(1), 10); // Get the distance and convert it to an integer
    if(direction === 'L') {
        // Count zeros during left rotation
        for(let i = 1; i <= distance; i++) { // Rotate one step at a time
            dialPosition = (dialPosition - 1 + 100) % 100; // Rotate left by 1
            if(dialPosition === 0) {
                zeroCount++;
            }
        }
    } else if(direction === 'R') {
        for(let i = 1; i <= distance; i++) { // Rotate one step at a time
            dialPosition = (dialPosition + 1) % 100; // Rotate right by 1
            if(dialPosition === 0) {
                zeroCount++;
            }
        }
    }
});

console.log(zeroCount); // Output the result