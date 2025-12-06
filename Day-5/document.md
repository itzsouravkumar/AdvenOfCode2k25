## Task 1: Fresh Ingredient ID Count
The task is to count how many of the available ingredient IDs are fresh based on the given ranges.
Algorithm:
1. Parse the input to separate fresh ID ranges and available ingredient IDs.
2. Create a set to store all fresh ingredient IDs.
3. For each range, add all IDs within that range to the set.
```javascript

function isFresh(id, ranges) {
    return ranges.some(range => id >= range.start && id <= range.end);
}

function countFreshIngredients(input) {
    const { ranges, ids } = parseInput(input);
    let freshCount = 0;

    ids.forEach(id => {
        if (isFresh(id, ranges)) {
            freshCount++;
        }
    });

    return freshCount;
}
```
Is code me humne input ko parse karke fresh ID ranges aur available ingredient IDs ko alag kiya hai. Phir humne har available ID ke liye check kiya ki kya wo kisi fresh range me aata hai. Agar aata hai to fresh count ko increment kiya

## Task 2: Total Fresh Ingredient IDs
The task is to find the total number of unique fresh ingredient IDs based on the given ranges..
Algorithm:
1. Parse the input to separate fresh ID ranges.
2. Create a set to store all unique fresh ingredient IDs.
3. For each range, add all IDs within that range to the set.
```javascript
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
```

Is code me humne fresh ID ranges ko merge kiya hai taaki overlapping ranges ko combine kiya ja sake. Phir humne har merged range ke andar ke unique IDs ko count kiya hai taaki total fresh ingredient IDs mil sake.

By the way I got stuck here, I don't know what was issue so I took help from ChatGPT. And I came to know that such a large no cannot be parsed. So I took help from ChatGPT to solve this problem. Sorry :)
