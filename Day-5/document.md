<!-- As the forklifts break through the wall, the Elves are delighted to discover that there was a cafeteria on the other side after all.

You can hear a commotion coming from the kitchen. "At this rate, we won't have any time left to put the wreaths up in the dining hall!" Resolute in your quest, you investigate.

"If only we hadn't switched to the new inventory management system right before Christmas!" another Elf exclaims. You ask what's going on.

The Elves in the kitchen explain the situation: because of their complicated new inventory management system, they can't figure out which of their ingredients are fresh and which are spoiled. When you ask how it works, they give you a copy of their database (your puzzle input).

The database operates on ingredient IDs. It consists of a list of fresh ingredient ID ranges, a blank line, and a list of available ingredient IDs. For example:

3-5
10-14
16-20
12-18

1
5
8
11
17
32
The fresh ID ranges are inclusive: the range 3-5 means that ingredient IDs 3, 4, and 5 are all fresh. The ranges can also overlap; an ingredient ID is fresh if it is in any range.

The Elves are trying to determine which of the available ingredient IDs are fresh. In this example, this is done as follows:

Ingredient ID 1 is spoiled because it does not fall into any range.
Ingredient ID 5 is fresh because it falls into range 3-5.
Ingredient ID 8 is spoiled.
Ingredient ID 11 is fresh because it falls into range 10-14.
Ingredient ID 17 is fresh because it falls into range 16-20 as well as range 12-18.
Ingredient ID 32 is spoiled.
So, in this example, 3 of the available ingredient IDs are fresh.

Process the database file from the new inventory management system. How many of the available ingredient IDs are fresh?

Your puzzle answer was 635.

--- Part Two ---
The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

3-5
10-14
16-20
12-18
The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?
 -->


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
