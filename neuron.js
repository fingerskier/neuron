class Neuron {
	constructor(opts={}) {
		this.net = []
		
		this.bias = opts.bias || 1
		this.rate = opts.rate || 0.1
		this.size = opts.size || 3

		for (let X = 0; X < this.size; X++) {
			this.net[X] = new Array(this.size)
			
			for (let Y = 0; Y < this.size; Y++){
				this.net[X][Y] = new Array(this.size)
				
				for (let Z = 0; Z <= this.size; Z++){
					this.net[X][Y][Z] = 0.5
				}
			}
		}
	}

	activate() {
		for (let X = 1; X < this.size; X++) {	// update signals (top Z-layer)
			for (let Y = 0; Y < this.size; Y++) {
				this.net[X][Y][0] = this.bias
				
				for (let Z = 1; Z <= this.size; Z++) {
					this.net[X][Y][0] += this.net[X][Y][Z] * this.net[X-1][Y][0]
				}
				
				this.net[X][Y][0] = Math.max(this.net[X][Y][0], 0)	// RELU activation
			}
		}
	}

	get_layer(X) {
		let result = []

		for (let Y = 0; Y < this.size; Y++)
			result.push(this.net[X][Y][0])

		return result
	}

	set_layer(X, inputs) {
		for (let Y in inputs) {
			this.net[X][Y][0] = inputs[Y]
		}
	}

	train(inputter, expectation) {
		let expected = expectation.slice()

		this.inputs = inputter.slice

		this.set_layer(0, inputter)

		this.activate()

		for (let X = this.size-1; X > 0; X--) {
			for (let Y = 0; Y < this.size; Y++) {	// count the costs
				let error = expected[Y] - this.net[X][Y][0]

				let diff = error * this.rate

				for (let Z = 1; Z <= this.size; Z++) {
					this.net[X][Y][Z] += diff
				}
			}

			this.activate()

			expected = this.get_layer(X)
		}
	}
}

if (module) module.exports = Neuron
