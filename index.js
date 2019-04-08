console.clear()

let Neuron = require('./neuron.js')

let ins = []
for (let I = 0; I < 3; I++) ins.push(Math.random())

let outs = ins.slice()
outs.push(0)

ins.unshift(0)

let N = new Neuron({
    size: ins.length,
    rate: 0.01
})


console.log(ins, outs)

N.train(ins, outs)
print_top(N.net)
for (let I = 0; I < 10000; I++) N.train(ins, outs)
print_top(N.net)

console.log(outs, N.get_layer(N.net[0].length-1))


function print_top(array3) {
    console.log("===")

    let line = ""

    for (let x in array3){
        line = ""
        for (let y in array3[x]){
            line += array3[x][y][0].toFixed(2) + ',\t'
        }
        
        console.log(line)
    }
    
    console.log("===")
}

function print(array3) {
    let result = "===\n\r"
    
    for (let x in array3){
        for (let y in array3[x]){
            for (let z in array3[x][y]){
                result += array3[x][y][z].toFixed(2) + '\t'
    }}}
    
    result = "===\n\r"
    
    return result
}