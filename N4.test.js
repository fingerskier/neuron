const Neuron = require("./N4")
const {matrix} = require('mathjs')

NN = new Neuron({
	num_inputs: 2,
	num_hiddens: 4,
	num_outputs: 1,
	activation: Neuron.RELU,
})

const input = matrix([[0,0], [0,1], [1,0], [1,1]]);
const target = matrix([[0], [1], [1], [0]]);

NN.train(input, target)

console.log(NN.predict(input))