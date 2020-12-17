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

const part2 = (raw: string) => {
  let grid: Set<string> = new Set();
  let xl = 0;
  let yl = 0;
  let zl = 1;
  let wl = 1;
  raw.split("\n").forEach((row, r) => {
    xl++;
    row.split("").forEach((cell, c) => {
      yl++;
      if (cell === "#") {
        grid.add(r + ":" + c + ":" + 0 + ":" + 0);
      }
    });
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    const start = -1 * cycle - 1;
    // p({l: grid.size})
    const after: Set<string> = new Set();
    for (let x = start; x <= xl + 1; x++) {
      for (let y = start; y <= yl + 1; y++) {
        for (let z = start; z <= zl + 1; z++) {
          for (let w = start; w <= wl + 1; w++) {
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
    xl += 2;
    yl += 2;
    zl += 2;
    wl += 2;
    grid = after;
  }
  p(grid.size);
};

console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
