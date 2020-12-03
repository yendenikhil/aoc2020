const p = console.log;
const raw = `....#...............##...#...#.
#...#..#.....##.##.#.##....#...
...#.....#...#.................
#..#..#.......#...#.#..........
...##..#.#..........##...#.....
........###.#.##..#............
...###......##.#..#.#...#.#....
......##..#.#....#...#.........
.................#......#......
..............##....#..........
#.....................#...#.#.#
.##..#............##...##.##..#
.....#.####...#..##......#.#..#
#.......#.#..#......##.#.#....#
.....##...###.#..........##....
#...........#.##....##.....#..#
..###..##.##.....#....#........
...#.#.#............#.#..#....#
#......#....#...##.#.#.#.#..#..
.......#.#...#..#..#..##......#
.....#..#.............#..#...#.
##..#.##.....#........#........
....##....#..#...........#...#.
.......#........##.......##....
..##...#.......#........##.#...
..........#..#.....##........#.
..#..##..#............#........
.#.#...#...#.......#......#....
....#....#.....#.#.........###.
.............#...#....#..#.#...
##.#...#..#......#.#.##.....#..
#...##.#..........#..#.#...#...
#####.......#.#.....#..#.......
#...#...#........#....#...#....
......##.#..#..#............#..
....#....#.......#...###.......
.#......##...#.##....#...#.....
..#....#...##.....#.#...##.#...
#.......#........#.####........
#.##..#..#.........#.#........#
.#...#.#.#.#......#....#.#..#..
#...####...##.##.#....#......##
..#...#......##........#.....#.
...#.#....##...................
...##................#.........
...##.....##........#....#..#..
.........#..#.....#............
.#..#.......................#..
.#.........#..##........#.#.#.#
......#.....##..#.##...#..#.##.
..#..............##.......#....
...............##....#...##..#.
###...#..###.........#...#.....
...#..#...#....#.....##........
....#..##...#........#.........
..#......#.......#.....#..#....
.#...........##.....###....#...
.#..#.....##.........##.....#..
....##.#.....#................#
..#..#......#.#..#....#..##....
#.....#...##............#......
.#.............#....#.......#..
#.........#..#...##.#...#.#.##.
...#......#..####....#.#.....#.
......#........#..........##.##
......##.#..##.##.....#........
##.....#..##.##..#.......##....
.##.........#...........#...#..
.....#...###..#...#...........#
..........#.#......#.###.....#.
...#.............#.##......##..
#.##.........#..###...........#
....#..##....#..#..#........###
...#........##.......##..#..#..
...#......#..#.#...............
#......###....#.#..#.#..#....#.
#.#.####.#.........#..#.#.#....
.....#....#...............#...#
.#........#......#.#...#.......
................#...#.....##...
.............#...####..........
.................##....##.###..
#................#......#......
.###.#........#..##.....#..###.
..#.#..#...#..#.#...#.#.....#.#
.....#............#..##..#..#.#
#........##.#...#.....#........
#.#.#..###......###............
...#..#...........##...#.....#.
......#........#...#.#....#....
....#..........#.#..#.#....##..
...#.....##..#......#.#.##...#.
.........#..#................#.
..#....#.##.....#.......#......
...#.....#.......##.##.....#...
#...#..............#..###..#...
#.#......#.#....#........##..#.
...#...##...##..#.........#....
..#...#......##.#.#.#....##....
#.......#.......#..#..#........
.........#..#.....#....#.....##
.#......#.......#.#..#..#...#.#
..#....#.#..#..................
#.....####..........#.#.....#.#
.#..#.#.#....#.#.....#.#.......
....##......#..#.....#.#.#...#.
...##...#......##.#....##.#....
..#..##....#...#...........#...
.......#........#...##.#.......
#.#..#....##.#....##...........
.......#............#..##..##..
#.#.#.....#....##.#.#.#.....#..
##...#...#.......#..#...#.....#
##..##.##..........#........##.
..............#.....#..#..##...
.......#...#.........#....#.#..
...#..#..#....#.#....##........
..#.......#....#....##.........
#...#.....#..#.#...##....#.....
.....##..#..##..#..............
.....##............#....#.#....
..#.....#....##.#.....#..#.....
#...#..#..#......#.#.#..##.....
.............................##
#...#.#................#....#.#
.#.#.#....##......###..##......
#.....#..#.##.#.#.##...###.....
.........#............##..#....
.#..#...#....#.....#.#........#
...............#......#..#.....
...................###........#
.###..##..##.......#.#.........
#.........#......#....#.#...#..
.#.#....#.......#.#..##...##...
.#.....#....##.......#.#.....#.
.........#...#....#.#..........
....###..#..##.#...##....#..#..
...#.#..##.#.........###.#..#..
#...#...........#....#.........
....##...........#.#.#......###
#....#...........##..#.........
###....#.....#.......#....###..
.#.......#....#.#.#.#......#.#.
........#...............#.#.#..
....#.........#.....#...##.##.#
...#............#.............#
..........#..#.................
........#.....##............#.#
..#...##........#...#.....#.#..
....#........#.#.#..........#..
#.#...#...........#............
....#.#...##...........#.....#.
...........#.#..#.....#........
.....#..#..#..#.....#.#.....#.#
#.....#.......#.......#...#....
#.........#....#.#........#..#.
...#..#.........#.....#..#.....
...#..#.............#..........
.#.......#..........#.....#...#
.....#.#......#.......#....#...
...#.....#..#..##....##....#...
.#.#.#..#...#.....#....#.......
..##.#..........#.....#.#......
..#..#.............#...##..##..
.#.............#..#....##...#..
..#...#.....#.................#
..##.......#.....#...#....#....
.#..#.##.........#...#.#...#...
...##.......##..#.....##.##...#
........####.#.........#.......
..#.#...##.#..#..#.......##.#..
.#..#............###..#..#.....
#.....#.#...#.#.......#........
..........#......#.#...#...#...
..#......#..#..#.#...#.........
..###........#.#....#.#...##...
.#.....#..#.#......#........#..
.#...#..#...#....#.......#..#..
..#....#..#.....#.#........#...
#..#.#.........#..........#..#.
.#.....##....#.........#.#.#.#.
#.#...#.....#.#.#....#.#..#....
.........#...................#.
..#.....#..##...#..........#.#.
..............#....#.........#.
.#....#.....#..............##..
#...#...#.#........##.........#
....###....#.#....#.#.........#
.....#........#.....##.........
.#...##..##..#.........##......
............#.....#........#...
..#....#.......#......#..#.#.#.
#.......#.#...........#..##.#..
......#.##......#....#.......#.
.....#........#...###.....#....
###..........#........#.#.#....
.....#...#.#...#...#...##.....#
.##...#.#........#.#....#......
......#.........#.....#.#......
.....#.##.....###.#...#...##..#
.#.#.......##....#..#..#.##....
.####...###.#.#.#.#............
......#..##...#..........#.##.#
......#............#...........
.....#.#..#.......##...##......
......#........#..#....#.#.#.#.
#..#..#.....#..#.....#.......#.
.#...#.....#..............#....
.#....#..#.##.#............####
..........#....#.##...#.#......
...#.#.#.#.#.......#.........#.
##........#..##..#.........#...
..#......#...#..#.#.....#......
..#.#......#...#...#.#.........
........................##.....
...#.##.#........#...#.......#.
..#.#......#....##........#.#..
#......#.##........#..#......#.
.....#..#..#.............#.....
......#......#........#....#...
...#....###.....#..#.#....#....
#.......................#....#.
..#...#...................#....
....#..#.....##.#..#...#.....#.
...#.........#...#.......#.....
..#....#.....#...#...#.#####...
.....####......#...........#...
......#.#..........#...#.#.#..#
###..#.#....#..#...............
...#...###..#..#.#.#...........
.....#...#.##.#.#.###..##......
.........#...........#....##.#.
....#..#......#................
...........#..#..#...#.#.......
..#.....#......##.###..........
.........#...................#.
..........#...#.#....##........
..#...##....#....#.......#...##
#......#.....#...#...#...#.....
....##...#.#.......#.#...##....
...#.....#....#.....#....#.....
#....##.....##..##..........##.
.....#.....#.#.#...............
.#.##....#.....#.#..#....#..##.
.....#.#.....##....#...........
.........#..#.......##..##.....
..#....##.....###...#....#.#...
............#......#.#...#..#..
#..##......#.#.##....#.#.......
.#.#.....#...#.#.#....#.....#..
#....#..#.#....#...#...........
......#.#.....#...#.#.#......#.
###..#....#.###.............#..
..............#####........###.
..#..#.#.#.#......#......#.....
###.........#.#..........#..#.#
.#.........#...#......####.....
..#.......####..#....#...#..#..
#.#..#.#...............#.#.#.#.
###....#.....##.#....#......##.
..#..#........#....###.#.#.....
...#.#..........#.....#...#....
....#......##.#............#..#
...##...#.....#..##....#..#.#.#
.......#.....#..#....#....##.#.
.#..#....#..#......##....##...#
..#......#...#.#..###..#.##....
#...#.....#......##...#.......#
.....#.#.....#...##............
.#..##.##..#..##.#........#....
....#.#......##...#.#.#.#..##..
.#..............##........#....
.##....#..#..#....#...#......#.
............###....##.......##.
..............####.....#.......
........##..##.#...#.......#...
....#..#.....##.......#####...#
.##..##..#.....#...#..#..#....#
##..#.#.#...........#..........
#..#......#...#....#...........
...#..##.#..........#..#.......
........#.#.....#......##......
.....#....#............#.......
.#.#..#....##......#.......###.
.#..#.#........#......#...##..#
...#....#......#..#........#.##
.........#..#...#..#.#.##......
....###.#...........#...#......
.##............#.......#..##...
##...#.#...............#.#...##
..#..#.....#.#..#..#...........
..#..#.##..#......#.##..#.#....
..#...#......#.#...#....##.#...
...###....####......#....#...#.
.......##........#.....##....#.
.........##..........#...#.....
.....#............#.##.#....#.#
..........#...#....##..........
....................#......#...
#......#..#...#.............##.
...........#...................
..#...#.........#.##.#..##.#...
#.#....#.#.....#............#..
.#..#.....#.....####......#.#..
#....#.......##..#...........#.
............#...#.....#..#.#...
#...........#...#####....#...#.
..........#...###..##.........#
#.....###............#..#..#.#.
...##.....#....#......#.....#..
#....#.......#..#......###...#.
...##.##......##..##..........#
.......#.#..#.#..#.#.#.#..#..#.
..#..###...#....#.....#......#.
...#.........#..#.##.#.....###.
..#.........#.##.#..#..#..###..
..####..#.........#.........#.#
..#.#...#.......#....##........
.#......#.#....................
..........#.......#.#..#..#....
..#........#....#.#..#.........
..#.....#.............#....#...
##...#.........#.....#...#.....`;

const part1 = (raw: string, slopes: number[][]) => {
  const lines = raw.split("\n");
  const mod = lines[0].length;
  let ans = 1;
  for (let j = 0; j < slopes.length; j++) {
    const dr = slopes[j][0];
    const dc = slopes[j][1];
    let trees = 0;
    for (let i = 0; i < lines.length; i += dc) {
      const dot = lines[i].split("")[(dr * i / dc) % mod];
      if (dot === "#") trees++;
    }
    ans *= trees;
  }
  return ans;
};

p(part1(raw, [[3, 1]]));
p(part1(raw, [[3, 1], [1, 1], [5, 1], [7, 1], [1, 2]]));