import { read } from "./utils.ts";
const raw = await read("4.in");
const p = console.log;

const checkAllPresent = (reqd: string[]) =>
  (person: string[]) => {
    return reqd.filter((e) => !person.some((ee) => ee === e)).length === 0;
  };

const part1 = (raw: string) => {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let person = [];
  let valid = 0;
  const check = checkAllPresent(required);
  for (const line of raw.split("\n")) {
    if (line.length > 0) {
      person.push(...line.split(" ").map((ee) => ee.split(":")[0]));
    } else {
      if (check(person)) valid++;
      person = [];
    }
  }
  p({ valid });
};

const part2 = (raw: string) => {
  const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let person = [];
  let valid = 0;
  // all fields check
  const check = checkAllPresent(required);
  // each field requirements check
  const byr = (e: string[]) =>
    e[1].search(/^\d{4,4}$/) > -1 && Number(e[1]) >= 1920 &&
    Number(e[1]) <= 2002;

  const iyr = (e: string[]) =>
    e[1].search(/^\d{4,4}$/) > -1 && Number(e[1]) >= 2010 &&
    Number(e[1]) <= 2020;

  const eyr = (e: string[]) =>
    e[1].search(/^\d{4,4}$/) > -1 && Number(e[1]) >= 2020 &&
    Number(e[1]) <= 2030;

  const cm = (e: string) =>
    e.search(/1\d\dcm/) > -1 && Number(e.substr(0, 3)) >= 150 &&
    Number(e.substr(0, 3)) <= 193;
  const inch = (e: string) =>
    e.search(/\d\din/) > -1 && Number(e.substr(0, 2)) >= 59 &&
    Number(e.substr(0, 2)) <= 76;
  const hgt = (e: string[]) =>
    e[1].search(/^\d{2,3}(cm|in)$/) > -1 && (cm(e[1]) || inch(e[1]));

  const hcl = (e: string[]) => e[1].search(/^#[0-9a-f]{6,6}$/) > -1;

  const ecl = (e: string[]) =>
    e[1].search(/^(amb|blu|brn|gry|grn|hzl|oth)$/) > -1;

  const pid = (e: string[]) => e[1].search(/^\d{9,9}$/) > -1;

  const fieldValid = (e: string[]) => {
    switch (e[0]) {
      case "byr":
        return byr(e);
      case "iyr":
        return iyr(e);
      case "eyr":
        return eyr(e);
      case "hgt":
        return hgt(e);
      case "hcl":
        return hcl(e);
      case "ecl":
        return ecl(e);
      case "pid":
        return pid(e);
      default:
        return false;
    }
  };

  // iterate all lines
  for (const line of raw.split("\n")) {
    if (line.length > 0) {
      person.push(
        ...line.split(" ").map((ee) => ee.split(":")).filter(fieldValid).map(
          (ee) => ee[0],
        ),
      );
    } else {
      if (check(person)) valid++;
      person = [];
    }
  }
  p({ valid });
};

part1(raw);
part2(raw);
