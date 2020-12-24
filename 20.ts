const raw = await Deno.readTextFile("20.in");
const p = console.log;

interface Tile {
  id: number;
  pixels: string[][];
  borders: string[];
  nn: number[]
}

const readInput = (raw: string) => {
  const list: Tile[] = [];
  raw.split("\n\n").forEach((tile) => {
    const [header, ...lines] = tile.split("\n");
    list.push({
      id: Number(header.split(" ")[1].slice(0, -1)),
      pixels: lines.map((s) => s.split("")),
      borders: [],
      nn: []
    });
  });
  return list;
};

const calcBorderPoss = (pix: string[][]) => {
  return [
    pix[0].join(''),
    pix[0].slice().reverse().join(''),
    pix[pix.length - 1].join(''),
    pix[pix.length - 1].slice().reverse().join(''),
    pix.map((e) => e[0]).join(''),
    pix.map((e) => e[0]).slice().reverse().join(''),
    pix.map((e) => e[e.length - 1]).join(''),
    pix.map((e) => e[e.length - 1]).slice().reverse().join(''),
  ];
};
const findBorders = (tiles: Tile[]) => {
  tiles.forEach((t) => {
    t.borders.push(...calcBorderPoss(t.pixels))
  });
};

const findMatchingBorder = (a: string[], b: string[]) => {
  return a.some( line => b.includes(line))
}

const findNeighbours = (tiles: Tile[]) => {
  tiles.forEach(tile => {
    tiles.filter(tt => 
      tile.id !== tt.id && findMatchingBorder(tile.borders, tt.borders)
    ).forEach(tt => tile.nn.push(tt.id))
  })
}

const part1 = (raw: string) => {
  const tiles = readInput(raw);
  findBorders(tiles);
  findNeighbours(tiles)
  const ans = tiles
  .filter(t => t.nn.length === 2)
  .map(t => t.id)
  .reduce((a,b) => a * b, 1)
  p(ans)
  // tiles.forEach(t => p(t.id, t.nn))

};

part1(raw);
