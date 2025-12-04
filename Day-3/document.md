## Task 1: Finding Max Jot Values
The task is to find the maximum joltage from each bank of batteries and sum them up. Each bank is represented by a string of digits, and you can only turn on two batteries at a time.

Algorithm:
1. Read the input file line by line.
2. For each line (bank), find the two largest digits.
3. Form the maximum joltage by concatenating these two digits.

```
Hamara approach simple hai - input ko line by line read kro and har line me se do largest digits nikaalo. Unhe concatenate karke maximum joltage banao.
```
```javascript
function maxJoltage(bank) {
    let max = 0;
    for (let i = 0; i < bank.length; i++) {
        for (let j = i + 1; j < bank.length; j++) {
            const joltage = parseInt(bank[i] + bank[j], 10);
            if (joltage > max) {
                max = joltage; // Update max if a larger joltage is found
            }
        }
    }
    return max;
}
```

## Task 2: Finding Max Jot Values with 12 Digits
The task is similar to the first one, but now you need to find the maximum joltage by turning on exactly twelve batteries within each bank.
Algorithm:
1. Read the input file line by line.
2. For each line (bank), find the twelve largest digits.
3. Form the maximum joltage by concatenating these twelve digits.
```
Hamara approach simple hai - input ko line by line read kro and har line me se bara 12 largest digits nikaalo. Unhe concatenate karke maximum joltage banao.
```
```javascript
function max12DigitJoltage(bank) {
    const target = 12;
    const stack = [];
    let removable = bank.length - target;

    for (const digit of bank) {
        while (stack.length > 0 && removable > 0 && stack[stack.length - 1] < digit) {
            stack.pop();
            removable--;
        }
        stack.push(digit);
    }

    return stack.slice(0, target).join('');
}
```
