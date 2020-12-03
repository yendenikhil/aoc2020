const headers = new Headers();
const secret = await Deno.readTextFile("./secret.txt");
headers.set(
  "cookie",
  secret,
);

const parse = () => {
  if (Deno.args.length > 1) {
    return Deno.args.slice(0, 2);
  } else {
    return ["2020", Deno.args[0]];
  }
};

const [year, day] = parse();
const url = `https://adventofcode.com/${year}/day/${day}/input`;

const raw = await fetch(
  url,
  { headers },
);
const text = await raw.text();
console.log(text);
