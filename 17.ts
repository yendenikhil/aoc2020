const raw = await Deno.readTextFile("17.in");
const p = console.log;

const neighbours = (
  x: number,
  y: number,
  z: number,
  w: number,
  takeW = true,
) => {
  const dd = [-1, 0, 1];
  const nn = [];
  for (const dx of dd) {
    for (const dy of dd) {
      for (const dz of dd) {
        if (takeW) {
          for (const dw of dd) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
              continue;
            }
            nn.push([x + dx, y + dy, z + dz, w + dw]);
          }
        } else {
          if (dx === 0 && dy === 0 && dz === 0) {
            continue;
          }
          nn.push([x + dx, y + dy, z + dz]);
        }
      }
    }
  }
  return nn;
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

const solve = (raw: string, takeW: boolean) => {
  let grid: Set<string> = new Set();
  raw.split("\n").forEach((row, r) => {
    row.split("").forEach((cell, c) => {
      if (cell === "#") {
        const key = r + ":" + c + ":" + 0 + ":" + 0;
        grid.add(key);
      }
    });
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    const [x1, y1, z1, w1, x2, y2, z2, w2] = minmax(grid);
    const after: Set<string> = new Set();
    for (let x = x1 - 1; x <= x2 + 1; x++) {
      for (let y = y1 - 1; y <= y2 + 1; y++) {
        for (let z = z1 - 1; z <= z2 + 1; z++) {
          if (takeW) {
            for (let w = w1 - 1; w <= w2 + 1; w++) {
              const nn = neighbours(x, y, z, w, takeW);
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
          } else {
            const w = 0;
            const nn = neighbours(x, y, z, w, takeW);
            const curr = grid.has(x + ":" + y + ":" + z + ":" + w);
            const len = nn.filter(([dx, dy, dz]) =>
              grid.has(dx + ":" + dy + ":" + dz + ":" + w)
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
  }
  p(grid.size);
};

console.time("p");
solve(raw, false);
console.timeLog("p");
solve(raw, true);
console.timeEnd("p");
