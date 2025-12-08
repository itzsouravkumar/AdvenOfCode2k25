const fs = require('fs');
const input = fs.readFileSync('Day-8/task1_input.txt', 'utf8').trim().split('\n').map(line => line.split(',').map(Number));

function distance(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
        this.size = Array(size).fill(1);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
                this.size[rootX] += this.size[rootY];
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
                this.size[rootY] += this.size[rootX];
            } else {
                this.parent[rootY] = rootX;
                this.size[rootX] += this.size[rootY];
                this.rank[rootX]++;
            }
        }
    }

    getSize(x) {
        return this.size[this.find(x)];
    }
}

const edges = [];
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        edges.push([distance(input[i], input[j]), i, j]);
    }
}

edges.sort((a, b) => a[0] - b[0]);

const uf = new UnionFind(input.length);
for (let i = 0; i < 1000; i++) {
    const [_, a, b] = edges[i];
    uf.union(a, b);
}

const sizes = {};
for (let i = 0; i < input.length; i++) {
    const root = uf.find(i);
    sizes[root] = (sizes[root] || 0) + 1;
}

const largestSizes = Object.values(sizes).sort((a, b) => b - a).slice(0, 3);
const result = largestSizes.reduce((acc, size) => acc * size, 1);

console.log(result);