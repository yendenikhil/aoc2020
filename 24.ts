const raw = await Deno.readTextFile("24.in");
const p = console.log;

const readDirections = (raw: string) => {
  const ans: string[][] = [];
  for (const line of raw.split("\n")) {
    const dirs: string[] = [];
    const tokens = line.split("");
    for (let i = 0; i < line.length; i++) {
      if (tokens[i] === "n" || tokens[i] === "s") {
        dirs.push(tokens[i] + tokens[i + 1]);
        i++;
      } else {
        dirs.push(tokens[i]);
      }
    }
    ans.push(dirs);
  }
  return ans;
};
const ddir = new Map(
  [
    ["e", [2, 0]],
    ["w", [-2, 0]],
    ["ne", [1, 1]],
    ["nw", [-1, 1]],
    ["se", [1, -1]],
    ["sw", [-1, -1]],
  ],
);
const findcoords = (line: string[]) => {
  const curr = { x: 0, y: 0 };
  line.map((e) => ddir.get(e) ?? [0, 0]).forEach(([x, y]) => {
    curr.x += x;
    curr.y += y;
  });
  return curr;
};
const getInitialSetup = (raw: string) => {
  const directions = readDirections(raw);
  const black: Set<string> = new Set();
  directions.map(findcoords).forEach(({ x, y }) => {
    const key = String(x) + ":" + String(y);
    if (black.has(key)) {
      black.delete(key);
    } else {
      black.add(key);
    }
  });
  return black;
};

const nn = [
  [2, 0],
  [-2, 0],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];
const neighbours = (pt: string) => {
  const [x, y] = pt.split(":").map(Number);
  return nn.map(([dx, dy]) => [dx + x, dy + y])
    .map(([x, y]) => String(x) + ":" + String(y));
};

const part1 = (raw: string) => {
  const black = getInitialSetup(raw);
  p(black.size);
};

const part2 = (raw: string, days: number) => {
  let black = getInitialSetup(raw);
  for (let i = 0; i < days; i++) {
    const queue: string[] = [...black];
    const newB: Set<string> = new Set();
    const done: Set<string> = new Set();
    while (queue.length > 0) {
      const curr = queue.pop();
      if (!curr) break;
      done.add(curr);
      const n = neighbours(curr);
      const len = n.filter((e) => black.has(e)).length;
      // if tile is black
      if (black.has(curr) && len > 0 && len <= 2) newB.add(curr);
      // if tile is white
      if (!black.has(curr) && len === 2) newB.add(curr);
      // add neighbours to queue
      const toadd = n.filter((e) => !done.has(e)).filter((e) =>
        neighbours(e).filter((ee) => black.has(ee)).length > 0
      );
      queue.push(...toadd);
    }
    black = newB;
    // p({ day: i + 1, size: black.size });
  }
  p(black.size);
};
console.time("p");
part1(raw);
console.timeLog("p");
part2(raw, 100);
console.timeEnd("p");
