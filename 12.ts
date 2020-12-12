const raw = await Deno.readTextFile("12.in");
const p = console.log;

const delta = (ang: number) => {
  switch (ang) {
    case 0:
      return [1, 0];
    case 90:
      return [0, -1];
    case 180:
      return [-1, 0];
    case 270:
      return [0, 1];
    default:
      p(`wrong angle ${ang}`);
      return [0, 0];
  }
};

const part1 = (raw: string): void => {
  const comm: [string, number][] = raw.split("\n").map(
    (e) => [e.substring(0, 1), Number(e.substring(1))]
  );
  let x = 0;
  let y = 0;
  let angle = 0;
  for (const instr of comm) {
    switch (instr[0]) {
      case "N":
        y += instr[1];
        break;
      case "S":
        y -= instr[1];
        break;
      case "E":
        x += instr[1];
        break;
      case "W":
        x -= instr[1];
        break;
      case "L":
        angle = (angle - instr[1] + 360) % 360;
        break;
      case "R":
        angle = (angle + instr[1]) % 360;
        break;
      case "F":
        {
          const [dx, dy] = delta(angle);
          x += dx * instr[1];
          y += dy * instr[1];
        }
        break;
      default:
        p("wrong instr");
    }
  }
  p(Math.abs(x) + Math.abs(y));
};

const rotateLeft = (wx: number, wy: number, deg: number) => {
  for (let i = 0; i < deg / 90; i++) {
    const temp = wx;
    wx = -1 * wy;
    wy = temp;
  }
  return [wx, wy];
};
const rotateRight = (wx: number, wy: number, deg: number) => {
  for (let i = 0; i < deg / 90; i++) {
    const temp = wx;
    wx = wy;
    wy = -1 * temp;
  }
  return [wx, wy];
};

const part2 = (raw: string): void => {
  const comm: [string, number][] = raw.split("\n").map(
    (e) => [e.substring(0, 1), Number(e.substring(1))]
  );
  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;
  let angle = 0;
  for (const instr of comm) {
    switch (instr[0]) {
      case "N":
        wy += instr[1];
        break;
      case "S":
        wy -= instr[1];
        break;
      case "E":
        wx += instr[1];
        break;
      case "W":
        wx -= instr[1];
        break;
      case "L":
        [wx, wy] = rotateLeft(wx, wy, instr[1]);
        break;
      case "R":
        [wx, wy] = rotateRight(wx, wy, instr[1]);
        break;
      case "F":
        {
          x += wx * instr[1];
          y += wy * instr[1];
        }
        break;
      default:
        p("wrong instr");
    }
  }
  p(Math.abs(x) + Math.abs(y));
};
console.time("p");
part1(raw);
console.timeLog("p");
part2(raw);
console.timeEnd("p");
