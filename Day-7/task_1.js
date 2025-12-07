const fs = require('fs');

const input = fs.readFileSync('Day-7/task1_input.txt', 'utf-8').trim().split('\n');
let beamPositions = [];

// Find the starting position of the beam (marked by 'S')
for (let col = 0; col < input[0].length; col++) {
    if (input[0][col] === 'S') {
        beamPositions.push(col);
        break;
    }
}

let splitCount = 0;

// Process each row of the manifold
for (let row = 1; row < input.length; row++) {
    const newBeamPositions = new Set();

    for (const pos of beamPositions) {
        if (input[row][pos] === '^') {
            // Beam hits a splitter, create new beams to the left and right
            newBeamPositions.add(pos - 1);
            newBeamPositions.add(pos + 1);
            splitCount++;
        } else {
            // Beam continues downwards
            newBeamPositions.add(pos);
        }
    }

    beamPositions = Array.from(newBeamPositions);
}

console.log(`The beam is split a total of ${splitCount} times.`);