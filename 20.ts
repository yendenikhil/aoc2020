const raw = await Deno.readTextFile("20.in");
const p = console.log;

interface Tile {
  id: number;
  pixels: string[][];
  borders: string[];
  nn: number[];
}

const readInput = (raw: string) => {
  const list: Tile[] = [];
  raw.split("\n\n").forEach((tile) => {
    const [header, ...lines] = tile.split("\n");
    list.push({
      id: Number(header.split(" ")[1].slice(0, -1)),
      pixels: lines.map((s) => s.split("")),
      borders: [],
      nn: [],
    });
  });
  return list;
};

const calcBorderPoss = (pix: string[][]) => {
  return [
    pix[0].join(""),
    pix[0].slice().reverse().join(""),
    pix[pix.length - 1].join(""),
    pix[pix.length - 1].slice().reverse().join(""),
    pix.map((e) => e[0]).join(""),
    pix.map((e) => e[0]).slice().reverse().join(""),
    pix.map((e) => e[e.length - 1]).join(""),
    pix.map((e) => e[e.length - 1]).slice().reverse().join(""),
  ];
};
const findBorders = (tiles: Tile[]) => {
  tiles.forEach((t) => {
    t.borders.push(...calcBorderPoss(t.pixels));
  });
};

const findMatchingBorder = (a: string[], b: string[]) => {
  return a.some((line) => b.includes(line));
};

const findNeighbours = (tiles: Tile[]) => {
  tiles.forEach((tile) => {
    tiles.filter((tt) =>
      tile.id !== tt.id && findMatchingBorder(tile.borders, tt.borders)
    ).forEach((tt) => tile.nn.push(tt.id));
  });
};

const part1 = (raw: string) => {
  const tiles = readInput(raw);
  findBorders(tiles);
  findNeighbours(tiles);
  const ans = tiles
    .filter((t) => t.nn.length === 2)
    .map((t) => t.id)
    .reduce((a, b) => a * b, 1);
  p({ ans });
  return { tiles, connections: new Map(tiles.map((t) => [t.id, t.nn])) };
};
const monsterhashcount = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.replaceAll(" ", "").replaceAll("\n", "").length;

const monster: string[][] = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split("\n").map((e) => e.split(""));

interface Piece {
  id: number;
  tile: string[][];
  left: number;
  right: number;
  up: number;
  down: number;
  isFixed: boolean;
}

const rotate = (base: string[][]) => {
  const ans: string[][] = [];
  const rl = base.length - 1;
  base.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (!ans[j]) ans[j] = [];
      ans[j][rl - i] = cell;
    });
  });
  return ans;
};

const flip = (base: string[][]) => {
  return base.map((row) => row.slice().reverse());
};

const allorientations = (base: string[][]): string[][][] => {
  const one = rotate(base);
  const two = rotate(one);
  const three = rotate(two);
  const four = flip(three);
  const five = rotate(four);
  const six = rotate(five);
  const seven = rotate(six);
  return [base, one, two, three, four, five, six, seven];
};

const compareedges = (curr: string[][], check: string[][]) => {
  // check up
  if (curr[0].join("") === check[check.length - 1].join("")) return "u";
  // check down
  else if (curr[curr.length - 1].join("") === check[0].join("")) return "d";
  // check left
  else if (
    curr.map((e) => e[0]).join("") ===
      check.map((e) => e[e.length - 1]).join("")
  ) {
    return "l";
  } // check right
  else if (
    curr.map((e) => e[e.length - 1]).join("") ===
      check.map((e) => e[0]).join("")
  ) {
    return "r";
  } else {
    return "na";
  }
};

const matchBorders = (curr: Piece, check: Piece) => {
  const tries: string[][][] = check.isFixed
    ? [check.tile]
    : allorientations(check.tile);
  for (const t of tries) {
    const res = compareedges(curr.tile, t);
    if (res.length > 1) continue;
    if (res === "u") {
      curr.up = check.id;
      check.down = curr.id;
    } else if (res === "d") {
      curr.down = check.id;
      check.up = curr.id;
    } else if (res === "l") {
      curr.left = check.id;
      check.right = curr.id;
    } else if (res === "r") {
      curr.right = check.id;
      check.left = curr.id;
    } else {
      p(`error ${curr.id}, ${check.id}`);
    }
    check.tile = t;
    check.isFixed = true;
    break;
  }
};

const updateMatch = (curr: Piece, nn: number[], pieces: Map<number, Piece>) => {
  nn.forEach((n) => {
    const pp = pieces.get(n);
    if (pp) {
      matchBorders(curr, pp);
    }
  });
};

const findrelation = (
  start: number,
  tiles: Tile[],
  conn: Map<number, number[]>,
) => {
  const queue = [start];
  const pieces: Map<number, Piece> = new Map();
  tiles.map((t) => {
    return {
      id: t.id,
      tile: t.pixels,
      left: 0,
      right: 0,
      up: 0,
      down: 0,
      isFixed: false,
    } as Piece;
  }).forEach((t) => pieces.set(t.id, t));
  const done: Set<number> = new Set();
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) break;
    if (done.has(curr)) continue;
    done.add(curr);
    // p({curr, done});
    const currPiece = pieces.get(curr);
    if (!currPiece) break;
    currPiece.isFixed = true;
    const nn = conn.get(curr) ?? [];
    updateMatch(currPiece, nn, pieces);
    queue.push(...nn);
  }
  return pieces;
};

const buildpuzzle = (start: number, pieces: Map<number, Piece>) => {
  const ans: string[][] = [];
  const queue: number[] = [start];
  while (true) {
    const curr = pieces.get(start);
    if (!curr || curr.down === 0) break;
    queue.push(curr.down);
    start = curr.down;
  }
  while (queue.length > 0) {
    const pt = queue.shift();
    if (!pt) break;
    let curr = pieces.get(pt);
    const lines: string[][] = [];
    while (true) {
      if (!curr) break;
      curr.tile.slice(1, 9).forEach((row, i) => {
        if (!lines[i]) lines[i] = [];
        lines[i].push(...row.slice(1, 9));
      });
      if (curr.right === 0) break;
      curr = pieces.get(curr.right);
    }
    ans.push(...lines);
  }
  return ans;
};

const countmonsters = (puzzle: string[][]) => {
  const rl = monster.length;
  const cl = monster[0].length;
  const tries = allorientations(puzzle);
  for (const t of tries) {
    let counter = 0;
    for (let i = 0; i < puzzle.length - rl; i++) {
      for (let j = 0; j < puzzle[0].length - cl; j++) {
        const part = t.slice(i, rl + i).map((e) => e.slice(j, j + cl));
        const found = part.every((line, r) => {
          return line.every((cell, c) => {
            if (monster[r][c] === "#") {
              return cell === monster[r][c];
            } else return true;
          });
        });
        if (found) counter++;
      }
    }
    if (counter > 0) return counter;
  }
  return -1;
};

const part2 = (start: number, tiles: Tile[], conn: Map<number, number[]>) => {
  const pieces = findrelation(start, tiles, conn);
  const puzzle = buildpuzzle(start, pieces);
  const counter = countmonsters(puzzle);
  const totalhash = puzzle.map((line) => line.filter((e) => e === "#").length)
    .reduce((a, b) => a + b, 0);
  const ans = totalhash - (counter * monsterhashcount);
  p({ ans });
};

console.time("p");
const { tiles, connections } = part1(raw);
console.timeLog("p");
part2(3769, tiles, connections);
console.timeEnd("p");
