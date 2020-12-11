const raw = await Deno.readTextFile('11.in')
const p = console.log

const buildGraph = (raw: string) => {
    const graph = []
    for (const line of raw.split('\n')) {
        graph.push(line.split(''))
    }
    return graph
}

const isEmptySeat = (graph: string[][], row: number, column: number) => {
    if (row >= graph.length || column >= graph[0].length) return false
    return graph[row][column] === 'L'
}
const isOccSeat = (graph: string[][], row: number, column: number) => {
    if (row >= graph.length || column >= graph[0].length) return false
    return graph[row][column] === '#'
}
const adjucentSeats = (graph: string[][], row: number, column: number) => {
    const DR = [-1, -1, -1, 0, 0, 1, 1, 1]
    const DC = [-1, 0, 1, -1, 1, -1, 0, 1]
    const rl = graph.length
    const cl = graph[0].length
    return DR.map((r, i) => [row + r, column + DC[i]])
        .filter(e => e[0] >= 0 && e[0] < rl && e[1] >= 0 && e[1] < cl)
        .map(([r, c]) => graph[r][c])
}
const adjucentSeatsV2 = (graph: string[][], row: number, column: number) => {
    const DR = [-1, -1, -1, 0, 0, 1, 1, 1]
    const DC = [-1, 0, 1, -1, 1, -1, 0, 1]
    const rl = graph.length
    const cl = graph[0].length
    const ans: string[] = []
    for (let i = 0; i <= DR.length; i++) {
        let x = 1
        while (DR[i] * x + row >= 0 && DR[i] * x + row < rl &&
            DC[i] * x + column >= 0 && DC[i] * x + column < cl
        ) {
            const val = graph[DR[i] * x + row][DC[i] * x + column]
            if (val !== '.') {
                ans.push(val)
                break
            }
            x++
        }
    }
    return ans
}

const rule1 = (graph: string[][], row: number, column: number) => {
    return isEmptySeat(graph, row, column) && adjucentSeats(graph, row, column).filter(s => s === '#').length === 0
}
const rule1V2 = (graph: string[][], row: number, column: number) => {
    return isEmptySeat(graph, row, column) && adjucentSeatsV2(graph, row, column).filter(s => s === '#').length === 0
}
const rule2 = (graph: string[][], row: number, column: number) => {
    return isOccSeat(graph, row, column) && adjucentSeats(graph, row, column).filter(s => s === '#').length > 3
}
const rule2V2 = (graph: string[][], row: number, column: number) => {
    return isOccSeat(graph, row, column) && adjucentSeatsV2(graph, row, column).filter(s => s === '#').length > 4
}
const changeSeatState = (graph: string[][], row: number, column: number) => {
    graph[row][column] = graph[row][column] === 'L' ? '#' : 'L'
}
const compare = (g1: string[][], g2: string[][]) => {
    for (let i = 0; i < g1.length; i++) {
        if (g1[i].join('') !== g2[i].join('')) return false
    }
    return true
}

const part1 = (graph: string[][]) => {
    let startGraph: string[][] = []
    graph.forEach(row => startGraph.push(row.slice()))
    let newGraph: string[][] = []
    let match = false
    while (!match) {
        newGraph = []
        startGraph.forEach(row => newGraph.push(row.slice()))
        for (let i = 0; i < newGraph.length; i++) {
            for (let j = 0; j < newGraph[0].length; j++) {
                if (rule1(startGraph, i, j) || rule2(startGraph, i, j)) changeSeatState(newGraph, i, j)
            }
        }
        match = compare(newGraph, startGraph)
        startGraph = newGraph
    }
    p(startGraph.map(r => r.filter(s => s === '#').length).reduce((a, b) => a + b))
}

const part2 = (graph: string[][]) => {
    let startGraph: string[][] = []
    graph.forEach(row => startGraph.push(row.slice()))
    let newGraph: string[][] = []
    let match = false
    while (!match) {
        newGraph = []
        startGraph.forEach(row => newGraph.push(row.slice()))
        for (let i = 0; i < newGraph.length; i++) {
            for (let j = 0; j < newGraph[0].length; j++) {
                if (rule1V2(startGraph, i, j) || rule2V2(startGraph, i, j)) changeSeatState(newGraph, i, j)
            }
        }
        match = compare(newGraph, startGraph)
        startGraph = newGraph
    }
    p(startGraph.map(r => r.filter(s => s === '#').length).reduce((a, b) => a + b))
}
console.time('p')
part1(buildGraph(raw))
console.timeLog('p')
part2(buildGraph(raw))
console.timeEnd('p')