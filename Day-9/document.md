## Task 1: Finding the Largest Rectangle with Red Tiles
To solve the problem of finding the largest rectangle that can be formed using red tiles as opposite corners, we can follow these steps:    
1. **Parse the Input**: Read the list of coordinates representing the red tiles and store them in a suitable data structure, such as a set for O(1) lookups.    
2. **Iterate Through Pairs of Red Tiles**: For each pair of red tiles, consider them as opposite corners of a rectangle.    
3. **Calculate Area**: For each pair, calculate the area of the rectangle they would form.    
4. **Check Validity**: Ensure that the other two corners of the rectangle (formed by the x-coordinate of one tile and the y-coordinate of the other) are also red tiles.    
5. **Track Maximum Area**: Keep track of the maximum area found during the iterations.
```javascript
let maxArea = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[j];

    const width = Math.abs(x2 - x1) + 1;
    const height = Math.abs(y2 - y1) + 1;
    const area = width * height;

    maxArea = Math.max(maxArea, area);
  }
}
```
## Task 2: Finding the Largest Rectangle with Red and Green Tiles
To extend the solution to include green tiles, we need to first identify all green tiles based on the connections between red tiles. Then, we can follow a similar approach as in Task 1, but this time checking if the other two corners of the rectangle are either red or green tiles.
1. **Identify Green Tiles**: For each pair of consecutive red tiles, determine the line of green tiles connecting them and add these to a set of valid tiles (red + green).
2. **Iterate Through Pairs of Red Tiles**: As before, consider each pair of red tiles as opposite corners of a rectangle.    
3. **Calculate Area**: Calculate the area of the rectangle formed by each pair.    
4. **Check Validity**: Ensure that the other two corners of the rectangle are either red or green tiles.    
5. **Track Maximum Area**: Keep track of the maximum area found during the iterations.
```javascript
    const edges = [];
    for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    edges.push({ a, b });
    }

    function onSegment(x, y, e) {
    const { a, b } = e;
    if (a[0] === b[0]) {
        // vertical
        if (x !== a[0]) return false;
        return y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]);
    }
    // horizontal
    if (y !== a[1]) return false;
    return x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]);
    }

    function pointInOrOn(x, y) {
    // Boundary check
    for (const e of edges) {
        if (onSegment(x, y, e)) return true;
    }
    // Ray casting to the right
    let crossings = 0;
    for (const { a, b } of edges) {
        const [x1, y1] = a;
        const [x2, y2] = b;
        // Count if edge straddles the ray vertically (avoid double-counting vertices)
        const cond = y1 > y !== y2 > y;
        if (cond) {
        const t = (y - y1) / (y2 - y1);
        const xIntersect = x1 + t * (x2 - x1);
        if (x < xIntersect) crossings++;
        }
    }
    return crossings % 2 === 1;
    }

    function segmentIntersection(rectEdge, polyEdge) {
    const { a: r1, b: r2 } = rectEdge;
    const { a: p1, b: p2 } = polyEdge;
    const rVert = r1[0] === r2[0];
    const pVert = p1[0] === p2[0];

    // Parallel
    if (rVert && pVert) {
        if (r1[0] !== p1[0]) return "none";
        const rMin = Math.min(r1[1], r2[1]);
        const rMax = Math.max(r1[1], r2[1]);
        const pMin = Math.min(p1[1], p2[1]);
        const pMax = Math.max(p1[1], p2[1]);
        return rMax < pMin || pMax < rMin ? "none" : "colinear";
    }
    if (!rVert && !pVert) {
        if (r1[1] !== p1[1]) return "none";
        const rMin = Math.min(r1[0], r2[0]);
        const rMax = Math.max(r1[0], r2[0]);
        const pMin = Math.min(p1[0], p2[0]);
        const pMax = Math.max(p1[0], p2[0]);
        return rMax < pMin || pMax < rMin ? "none" : "colinear";
    }

    // One vertical, one horizontal: check strict interior intersection (touching is ok)
    const v = rVert ? rectEdge : polyEdge;
    const h = rVert ? polyEdge : rectEdge;
    const vx = v.a[0];
    const vyMin = Math.min(v.a[1], v.b[1]);
    const vyMax = Math.max(v.a[1], v.b[1]);
    const hy = h.a[1];
    const hxMin = Math.min(h.a[0], h.b[0]);
    const hxMax = Math.max(h.a[0], h.b[0]);

    const intersectsStrict = vx > hxMin && vx < hxMax && hy > vyMin && hy < vyMax;
    return intersectsStrict ? "cross" : "none";
    }

    function rectangleValid(x1, y1, x2, y2) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    if (minX === maxX || minY === maxY) return false; // degenerate

    const corners = [
        [minX, minY],
        [minX, maxY],
        [maxX, minY],
        [maxX, maxY],
    ];

    for (const [cx, cy] of corners) {
        if (!pointInOrOn(cx, cy)) return false;
    }

    const rectEdges = [
        { a: [minX, minY], b: [minX, maxY] },
        { a: [maxX, minY], b: [maxX, maxY] },
        { a: [minX, minY], b: [maxX, minY] },
        { a: [minX, maxY], b: [maxX, maxY] },
    ];

    for (const re of rectEdges) {
        for (const pe of edges) {
        const t = segmentIntersection(re, pe);
        if (t === "cross") return false; // rectangle edge crosses polygon boundary
        }
    }

    return true;
    }

    let maxArea = 0;

    for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
        if (area <= maxArea) continue; // prune
        if (rectangleValid(x1, y1, x2, y2)) {
        maxArea = area;
        }
    }
    }
```
Note: I am sorry for this task. I have used completely ChatGPT to generate this code. Actually, I understood the task but I was not able to implement it. So, I used ChatGPT to generate the code for me. I will try to understand it.

