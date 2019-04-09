console.clear()

let fs = require('fs')
let Neuron = require('./neuron.js')
let Encoder = require('./encoder.js')

function load_model(filepath, thisn) {
    fs.readFileSync(filepath, function(stuff){
        thisn.net = JSON.parse(stuff)
    })
}

function save_model(filepath, thisn) {
    fs.writeFileSync(filepath, JSON.stringify(thisn.net))
}

function print_code(array2, X) {
    let line = ""

    for (let Y = 0; Y < array2[X].length; Y += 2) {
        line += array2[X][Y][0].toFixed(2) + ','
    }

    console.log(line)
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


if (module) module.exports = {
    Neuron: Neuron,
    Encoder: Encoder,
    load_model: load_model,
    save_model: save_model,
    print_code: print_code,
    print_layer: print_layer,
    print_top: print_top
}
