let thisn = require('./index.js')
let data = require('./data.json')
// let data = require('./data_fixture.json')

let E = new thisn.Encoder({
    rate: 0.1,
    height: data[0].length
})

let num_records = 10

console.clear()
console.log(`start:${start_index}, num:${num_records}`)

for (let I = 0; I < 100000; I++) {
    let index = Math.round(Math.random() * data.length)
    E.train(data[index], data[index])
    thisn.print_code(E.net,1)
}

thisn.save_model('model.json', E)
