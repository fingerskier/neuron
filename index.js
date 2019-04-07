let Neuron = require('./neuron.js')

let ins = [1,1,1,1,1]
let outs = [0.3, 0.2, 0.4,.5,.6,.7,.8]

let N = new Neuron({
    size: ins.length,
    threshold: 0.01
})

console.clear()


N.train(ins, ins)
print_top(N.net)
for (let I = 0; I < 10; I++) N.train(ins, ins)
print_top(N.net)


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