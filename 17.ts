const raw = await Deno.readTextFile("17.in");
const p = console.log;

const neighbours1 = (x: number, y: number, z: number) => {
  const dd = [-1, 0, 1];
  const nn = [];
  for (const dx of dd) {
    for (const dy of dd) {
      for (const dz of dd) {
        if (dx === 0 && dy === 0 && dz === 0) {
          continue;
        }
        nn.push([x + dx, y + dy, z + dz]);
      }
    }
  }
  return nn;
};

const neighbours2 = (x: number, y: number, z: number, w: number) => {
  const dd = [-1, 0, 1];
  const nn = [];
  for (const dx of dd) {
    for (const dy of dd) {
      for (const dz of dd) {
        for (const dw of dd) {
          if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
            continue;
          }
          nn.push([x + dx, y + dy, z + dz, w + dw]);
        }
      }
    }
  }
  return nn;
};
const part1 = (raw: string) => {
  let grid: Set<string> = new Set();
  let xl = 0;
  let yl = 0;
  let zl = 1;
  raw.split("\n").forEach((row, r) => {
    xl++;
    row.split("").forEach((cell, c) => {
      yl++;
      if (cell === "#") {
        grid.add(r + ":" + c + ":" + 0);
      }
    });
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    const after: Set<string> = new Set();
    for (let x = -1 * xl; x <= xl + 1; x++) {
      for (let y = -1 * yl; y <= yl + 1; y++) {
        for (let z = -1 * zl; z <= zl + 1; z++) {
          const nn = neighbours1(x, y, z);
          const curr = grid.has(x + ":" + y + ":" + z);
          const len = nn.filter(([dx, dy, dz]) =>
            grid.has(dx + ":" + dy + ":" + dz)
          ).length;
          if (curr && len > 1 && len < 4) {
            after.add(x + ":" + y + ":" + z);
          } else if (!curr && len === 3) {
            after.add(x + ":" + y + ":" + z);
          }
        }
      }
    }
    xl += 2;
    yl += 2;
    zl += 2;
    grid = after;
  }
  p(grid.size);
};

const minmax = (grid: Set<string>) => {
  const min = [22, 22, 22, 22];
  const max = [-10, -10, -10, -10];
  for (const e of grid) {
    const [x, y, z, w] = e.split(":").map(Number);
    if (min[0] > x) min[0] = x;
    if (min[1] > y) min[1] = y;
    if (min[2] > z) min[2] = z;
    if (min[3] > w) min[3] = w;
    if (max[0] < x) max[0] = x;
    if (max[1] < y) max[1] = y;
    if (max[2] < z) max[2] = z;
    if (max[3] < w) max[3] = w;
  }
  min.push(...max);
  return min;
};

const part2 = (raw: string) => {
  let grid: Set<string> = new Set();
  raw.split("\n").forEach((row, r) => {
    row.split("").forEach((cell, c) => {
      if (cell === "#") {
        grid.add(r + ":" + c + ":" + 0 + ":" + 0);
      }
    });
  });

  // console.time("t");
  for (let cycle = 0; cycle < 6; cycle++) {
    // let counter = 0;
    const [x1, y1, z1, w1, x2, y2, z2, w2] = minmax(grid);
    // p({ x1, x2, y1, y2, z1, z2, w1, w2 });
    const after: Set<string> = new Set();
    for (let x = x1 - 1; x <= x2 + 1; x++) {
      for (let y = y1 - 1; y <= y2 + 1; y++) {
        for (let z = z1 - 1; z <= z2 + 1; z++) {
          for (let w = w1 - 1; w <= w2 + 1; w++) {
            // counter++;
            const nn = neighbours2(x, y, z, w);
            const curr = grid.has(x + ":" + y + ":" + z + ":" + w);
            const len = nn.filter(([dx, dy, dz, dw]) =>
              grid.has(dx + ":" + dy + ":" + dz + ":" + dw)
            ).length;
            if (curr && len > 1 && len < 4) {
              after.add(x + ":" + y + ":" + z + ":" + w);
            } else if (!curr && len === 3) {
              after.add(x + ":" + y + ":" + z + ":" + w);
            }
          }
        }
      }
    }
    grid = after;
    // console.timeLog("t");
    // p({ cycle, counter, l: grid.size });
  }
  // console.timeEnd("t");
  p(grid.size);
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
