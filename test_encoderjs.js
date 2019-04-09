console.clear()

let fs = require('fs')
let Encoder = require('./encoder.js')

let ins = []
for (let I = 0; I < 5; I++) ins.push(Math.random())


let E = new Encoder({
    height: ins.length,
    rate: 0.1
})


console.log(ins)


E.train(ins, ins)
for (let I = 0; I < 1000000; I++) E.train(ins, ins)

for (let I = 0; I < E.size; I++) print_layer(E.net, I)

print_layer(E.net, 0)
print_layer(E.net, 1)
print_layer(E.net, 2)
print_layer(E.net, 3)
print_layer(E.net, 4)


save_model('model.json', E.net)


function load_model(filepath, thisn) {
    fs.readFileSync(filepath, function(stuff){
        thisn = JSON.parse(stuff)
    })
}

function save_model(filepath, thisn) {
    fs.writeFileSync(filepath, JSON.stringify(thisn))
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
