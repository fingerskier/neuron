const {random, multiply, dotMultiply, mean, abs, subtract, transpose, add} = require('mathjs')

class Neuron {
	constructor(opts={}) {
		this.input_nodes = opts.num_inputs
		this.hidden_nodes = opts.num_hiddens
		this.output_nodes = opts.num_outputs

		this.epochs = opts.epochs || 50000
		this.activation = opts.epochs || Neuron.sigmoid
		this.lr = opts.learning_rate || 0.5

		this.output = 0;

		this.synapse0 = random([this.input_nodes, this.hidden_nodes], -1.0, 1.0); //connections from input layer to hiden
		this.synapse1 = random([this.hidden_nodes, this.output_nodes], -1.0, 1.0); //connections from hidden layer to output
	}

	static RELU(x, derivative) {
		if (derivative) return (x>0) ? 1 :0
		else result = Math.max(0,x)		
	}	

	static sigmoid(x, derivative) {     
		let fx = 1 / (1 + Math.exp(-x));     
		if (derivative)         
			 return fx * (1 - fx);     
		return fx; 	 
	}	

	train(input, target) {
		for (let i = 0; i < this.epochs; i++) {
			//forward
			let input_layer = input; //input data
			let hidden_layer = multiply(input_layer, this.synapse0).map(v => this.activation(v, false)); //output of hidden layer neurons (matrix!)
			let output_layer = multiply(hidden_layer, this.synapse1).map(v => this.activation(v, false)); // output of last layer neurons (matrix!)

			//backward
			let output_error = subtract(target, output_layer); //calculating error (matrix!)       
			let output_delta = dotMultiply(output_error, output_layer.map(v => this.activation(v, true))); //calculating delta (vector!)
			let hidden_error = multiply(output_delta, transpose(this.synapse1)); //calculating of error of hidden layer neurons (matrix!)
			let hidden_delta = dotMultiply(hidden_error, hidden_layer.map(v => this.activation(v, true))); //calculating delta (vector!)

			//gradient descent
			this.synapse1 = add(this.synapse1, multiply(transpose(hidden_layer), multiply(output_delta, this.lr)));
			this.synapse0 = add(this.synapse0, multiply(transpose(input_layer), multiply(hidden_delta, this.lr)));
			this.output = output_layer;

			if (i % 10000 == 0)
					console.log(`Error: ${mean(abs(output_error))}`);
		}
	}

	predict(input) {
    let input_layer = input;
    let hidden_layer = multiply(input_layer, this.synapse0).map(v => this.activation(v, false));
		let output_layer = multiply(hidden_layer, this.synapse1).map(v => this.activation(v, false));
		
		console.log('Neuron innards', this)

    return output_layer;
	}
}

module.exports = Neuron