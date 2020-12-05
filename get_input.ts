const headers = new Headers();
const secret = await Deno.readTextFile("./secret.txt");
headers.set(
  "cookie",
  secret,
);

const parse = () => {
  return ["2020", Deno.args[0]];
};

const [year, day] = parse();
const url = `https://adventofcode.com/${year}/day/${day}/input`;

const raw = await fetch(
  url,
  { headers },
);
const text = await raw.text();
if (Deno.args[1]) {
  await Deno.writeTextFile(Deno.args[1], text);
} else {
  console.log(text);
}
