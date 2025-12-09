
const fs = require("fs");
const input = fs
  .readFileSync("Day-9/task1_input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(",").map(Number));

// We need to find the largest rectangle using any two red tiles as opposite corners
// The width and height of the rectangle are simply the differences in coordinates
let maxArea = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[j];

    // Calculate rectangle dimensions
    // Width = |x2 - x1| + 1 (inclusive of both corners)
    // Height = |y2 - y1| + 1 (inclusive of both corners)
    const width = Math.abs(x2 - x1) + 1;
    const height = Math.abs(y2 - y1) + 1;
    const area = width * height;

    maxArea = Math.max(maxArea, area);
  }
}

console.log("Largest rectangle area:", maxArea);
