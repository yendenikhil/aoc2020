const raw = await Deno.readTextFile('18.in')
const p = console.log


const solve = (line: string): bigint => {
    const orig = line
    while(line.includes('(')) {
        line = line.replace(/\(([\d+\+\* ]+)\)/, (match, p1) => String(solve(p1)))
    }
    const tokens = line.split(' ')
    let calc = BigInt(tokens[0])
    for (let i = 1; i < tokens.length; i+=2) {
        if (tokens[i] === '+') {
            calc += BigInt(tokens[i+1])
        } else if (tokens[i] === '*') {
            calc *= BigInt(tokens[i+1])
        } else {
            p('error')
        }
    }
    p({calc, orig})
    return calc
}

const solve2 = (line: string): bigint => {
    const orig = line
    while(line.includes('(')) {
        line = line.replace(/\(([\d+\+\* ]+)\)/, (match, p1) => String(solve2(p1)))
    }
    // lets add things 
    while(line.includes('+')) {
        line = line.replace(/\d+ \+ \d+/, (match) => {
            const tokens = match.split(' ')
            return String(BigInt(tokens[0]) + BigInt(tokens[2]))
        })
    }
    while(line.includes('*')) {
        line = line.replace(/\d+ \* \d+/, (match) => {
            const tokens = match.split(' ')
            return String(BigInt(tokens[0]) * BigInt(tokens[2]))
        })
    }

    // p({line, orig})
    return BigInt(line)
}

const part1 = (raw: string) => {
    const lines = raw.split('\n')
    let ans = 0n
    for (const line of lines) {
        ans += solve2(line)
    }
    p(String(ans))
}

// part1('2 * 3 + (4 * 5)')
// part1('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
// part1('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')
// part1(`2 * 3 + (4 * 5)\n1 + (2 * 3) + (4 * (5 + 6))`)
// part1('8 + (7 * 4 * 6 * 4 * 8) * ((4 + 6) * 5 + (9 * 6) + (7 + 9 + 3) * 2) * 5 * (2 * 5 * (2 * 4 * 8 * 5 * 4 * 3) * 9 * 3) + 5')
// part1('2 * 3 + (4 * 5)')

part1(raw)
