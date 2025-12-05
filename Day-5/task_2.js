const fs = require('fs');

function parseRanges(input) {
    const ranges = [];
    const lines = input.trim().split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // ignore empty lines
        if (line === '') continue;

        if (!line.includes('-')) {
            console.error(`❌ Error: line ${i + 1} has no dash → "${line}"`);
            continue;
        }

        const parts = line.split('-');
        if (parts.length !== 2) {
            console.error(`❌ Error: line ${i + 1} has extra dashes → "${line}"`);
            continue;
        }

        const start = Number(parts[0]);
        const end = Number(parts[1]);

        if (Number.isNaN(start) || Number.isNaN(end)) {
            console.error(`❌ Error parsing numbers on line ${i + 1}: "${line}"`);
            continue;
        }

        ranges.push({ start, end });
    }

    return ranges;
}


function mergeRanges(ranges) {
    // Sort ranges by start
    ranges.sort((a, b) => a.start - b.start);

    const merged = [];
    let current = { ...ranges[0] };

    for (let i = 1; i < ranges.length; i++) {
        const next = ranges[i];

        if (next.start <= current.end + 1) {
            // Overlap → merge
            current.end = Math.max(current.end, next.end);
        } else {
            // No overlap → push and move on
            merged.push(current);
            current = { ...next };
        }
    }

    merged.push(current);
    return merged;
}

function countTotalFreshIDs(ranges) {
    let total = 0;

    for (const r of ranges) {
        total += (r.end - r.start + 1);
    }

    return total;
}

const input = fs.readFileSync('Day-5/task2_input.txt', 'utf-8');

const ranges = parseRanges(input);
const merged = mergeRanges(ranges);
const result = countTotalFreshIDs(merged);

console.log("Total fresh ingredient IDs:", result);
