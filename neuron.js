class Neuron {
	constructor(opts={}) {
		this.bias = 1
		this.net = []
		this.rate = 0.1
		this.threshold = 0.1

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
				this.net[X][Y][0] = 0
				
				for (let Z = 1; Z <= this.size; Z++) {
					this.net[X][Y][0] = this.net[X][Y][Z] * this.net[X-1][Y][0]
				}
				
				this.net[X][Y][0] = Math.max(this.net[X][Y][0], 0)	// RELU activation
			}
		}
	}

	train(inputter, expectation) {
		let expected = expectation.slice()

		this.inputs = inputter.slice

		for (let Y = 0; Y < this.size; Y++) {	// glean inputs
			this.net[0][Y][0] = +inputter[Y]
		}

		this.activate()

		for (let X = this.size-1; X > 0; X--) {
			for (let Y = 0; Y < this.size; Y++) {	// count the costs
				let error = expected[Y] - this.net[X][Y][0]

				let diff = error * this.net[X][Y][0] * this.rate

				for (let Z = 1; Z <= this.size; Z++) {
					this.net[X][Y][Z] += diff
				}
			}

			this.activate()

			for (let Y = 0; Y < this.size; Y++)	// glean the expected values for nexties
				expected[Y] = this.net[X][Y][0]
		}
	}
}

if (module) module.exports = Neuron
