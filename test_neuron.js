console.clear()

let fs = require('fs')
let Neuron = require('./neuron.js')

let ins = []
for (let I = 0; I < 8; I++) ins.push(Math.random())

let outs = ins.slice()
outs.reverse()

let N = new Neuron({
    activation: 'trunc',
    height: ins.length,
    rate: 0.01
})


console.log(ins)
console.log(outs)


N.train(ins, outs)
for (let I = 0; I < 100000; I++) N.train(ins, outs)

for (let I = 0; I < N.size; I++) print_layer(N.net, I)

print_layer(N.net, 0)
print_layer(N.net, 1)
print_layer(N.net, 2)

save_model('model.json', N.net)


function load_model(filepath, thisn) {
    fs.readFileSync(filepath, function(stuff){
        thisn.net = JSON.parse(stuff)
    })
}

function save_model(filepath, thisn) {
    fs.writeFileSync(filepath, JSON.stringify(thisn.net))
}

function print_layer(array2, X) {
    console.log("***")

    let line = ""

    for (let Y in array2[X]) {
        line += array2[X][Y][0].toFixed(2) + ',\t'
    }

    console.log(line)

    console.log("***")
}


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
