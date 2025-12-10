// Logic is based on solving a system of linear equations in GF(2) using Gaussian elimination.
const fs = require("fs");

// Read input file
const input = fs
  .readFileSync("Day-10/task1_input.txt", "utf8")
  .trim()
  .split("\n");
let totalMinPresses = 0;

for (const line of input) {
  const [diagramPart, ...rest] = line.split(" ");
  const diagram = diagramPart.slice(1, -1); // Remove brackets
  const buttons = rest
    .filter((part) => part.startsWith("("))
    .map((part) => part.slice(1, -1).split(",").map(Number));

  const n = diagram.length; // number of lights
  const m = buttons.length; // number of buttons
  const targetState = Array.from(diagram).map((ch) => (ch === "#" ? 1 : 0));

  // Build augmented matrix: rows = lights (equations), cols = buttons (variables) + target
  // augmented[light][button] = 1 if pressing button toggles this light
  const augmented = [];
  for (let light = 0; light < n; light++) {
    const row = new Array(m + 1).fill(0);
    for (let btn = 0; btn < m; btn++) {
      if (buttons[btn].includes(light)) {
        row[btn] = 1;
      }
    }
    row[m] = targetState[light]; // Last column is RHS (target state)
    augmented.push(row);
  }

  // Gaussian elimination in GF(2)
  let rank = 0;
  const pivot_cols = []; // Track which columns have pivots

  for (let col = 0; col < m && rank < n; col++) {
    // Find pivot row
    let pivot_row = -1;
    for (let row = rank; row < n; row++) {
      if (augmented[row][col] === 1) {
        pivot_row = row;
        break;
      }
    }
    if (pivot_row === -1) continue; // No pivot in this column

    // Swap rows
    [augmented[rank], augmented[pivot_row]] = [
      augmented[pivot_row],
      augmented[rank],
    ];

    pivot_cols.push(col);

    // Eliminate all other rows (forward and backward)
    for (let row = 0; row < n; row++) {
      if (row !== rank && augmented[row][col] === 1) {
        for (let c = 0; c <= m; c++) {
          augmented[row][c] ^= augmented[rank][c];
        }
      }
    }
    rank++;
  }

  // Check for inconsistency (0 = non-zero target)
  let solvable = true;
  for (let row = rank; row < n; row++) {
    if (augmented[row][m] === 1) {
      solvable = false;
      break;
    }
  }

  let minPresses = Infinity;

  if (solvable) {
    // Find free variables (not in pivot_cols)
    const freeVars = [];
    for (let col = 0; col < m; col++) {
      if (!pivot_cols.includes(col)) {
        freeVars.push(col);
      }
    }

    // Try all combinations of free variables
    const numCombinations = 1 << freeVars.length;
    for (let combo = 0; combo < numCombinations; combo++) {
      const solution = new Array(m).fill(0);

      // Set free variables based on combo
      for (let i = 0; i < freeVars.length; i++) {
        solution[freeVars[i]] = (combo >> i) & 1;
      }

      // Solve for basic variables
      for (let i = 0; i < rank; i++) {
        const col = pivot_cols[i];
        let sum = augmented[i][m];
        // Subtract contributions from free variables
        for (let j = col + 1; j < m; j++) {
          sum ^= augmented[i][j] & solution[j];
        }
        solution[col] = sum;
      }

      const presses = solution.reduce((acc, val) => acc + val, 0);
      minPresses = Math.min(minPresses, presses);
    }
  }

  if (minPresses !== Infinity) {
    totalMinPresses += minPresses;
  }
}

console.log(totalMinPresses);
