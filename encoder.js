class Neuron {
	constructor(opts={}) {
		this.net = []
		
		this.bias = opts.bias || 1
		this.height = opts.height || 4
        this.rate = opts.rate || 0.1
        this.width = opts.width || 4

		for (let X = 0; X < this.width; X++) {
			this.net[X] = new Array(this.width)

    		for (let Y = 0; Y < this.height; Y++) {
				this.net[X][Y] = new Array(this.height)
				
				for (let Z = 0; Z <= this.height; Z++){
                    this.net[X][Y][Z] = 0
				}
			}
		}
        
		for (let X = 0; X < this.width; X++) {
            for (let Y = 0; Y < this.height; Y += this.layer_step(X)) {
			// for (let Y = this.layer_offset(X); Y < this.height-this.layer_offset(X); Y++) {
// console.log(`height:${this.layer_height(X)}, offset:${this.layer_offset(X)}`)
				for (let Z = 0; Z <= this.height; Z++){
                    if (X) this.net[X][Y][Z] = 0.5
				}
			}
		}
    }

    layer_height(X) {
        let result = this.height

        switch (X) {
            case 1: result *= 0.75; break;
            case 2: result *= 0.5; break;
            case 3: result *= 0.75; break;
        }

        return result
    }

    layer_offset(X) {
        return Math.round((this.height - this.layer_height(X)) / 2)
    }

    layer_step(X) {
        let result = 1

        switch (X) {
            case 1: result = 2; break;
            case 2: result = 1; break;
            case 3: result = 1; break;
        }

        return result
    }

	activate() {

        for (let X = 1; X < this.width; X++) {	// update signals (top Z-layer)
            for (let Y = 0; Y < this.height; Y += this.layer_step(X)) {
            // for (let Y = this.layer_offset(X); Y < this.height-this.layer_offset(X); Y++) {
				this.net[X][Y][0] = this.bias

				for (let Z = 1; Z <= this.height; Z++) {
					this.net[X][Y][0] += this.net[X][Y][Z] * this.net[X-1][Y][0]
				}

				this.net[X][Y][0] = Math.max(this.net[X][Y][0], 0)	// RELU activation
			}
		}
	}

	get_layer(X) {
		let result = []

		for (let Y = 0; Y < this.height; Y++)
			result.push(this.net[X][Y][0])

		return result
	}

	set_layer(X, inputs) {
		for (let Y in inputs) {
			this.net[X][Y][0] = inputs[Y]
		}
	}

	train(inputter, expectation) {
		let error = 0
		let expected = expectation.slice()

		this.inputs = inputter.slice

		this.set_layer(0, inputter)

		this.activate()

		for (let X = this.width-1; X > 0; X--) {
            for (let Y = 0; Y < this.height; Y += this.layer_step(X)) {
            // for (let Y = 0; Y < this.height; Y++) {
			// for (let Y = this.layer_offset(X); Y < this.height-this.layer_offset(X); Y++) {
                // count the costs
				error = expected[Y] - this.net[X][Y][0]

				let diff = error * this.rate

// console.log(`X:${X}, Y:${Y}, expected:${expected[Y]} error:${error}`)
				for (let Z = 1; Z <= this.height; Z++) {
					this.net[X][Y][Z] += diff
				}
			}

			this.activate()

			expected = this.get_layer(X)
		}

		return error
	}
}

if (module) module.exports = Neuron
