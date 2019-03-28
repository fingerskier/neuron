let bias = 1
let net = []
let rate = 1
let size = 3
let stability = 1
let threshold = 0.1
let weight = []


function activate() {
	for (let X = 1; X < size; X++) {	// update signals (top Z-layer)
		for (let Y = 0; Y < size; Y++){
			for (let Z = 1; Z <= size; Z++){
				net[X][Y][0] = Math.max(net[X][Y][Z] * net[X-1][Y][0], 0)	// RELU activation
			}
		}
	}
}

module.exports = class {
	constructor(opts={}) {
		bias = opts.bias || bias
		rate = opts.rate || rate
		size = opts.size || size
		threshold = opts.threshold || threshold
		weight = opts.weight || weight

		for (let X = 0; X < size; X++) {
			net[X] = new Array(size)
			
			for (let Y = 0; Y < size; Y++){
				net[X][Y] = new Array(size)
				
				for (let Z = 0; Z <= size; Z++){
					net[X][Y][Z] = 0.5
				}
			}
		}
	}

	get control() {
		let I = Math.floor(size / 2)

		let result = []

		for (let Y = 0; Y < size; Y++) result.push(net[I][Y][0])
	}

	get print() {
		let line = ""

		activate()

		console.log()
		console.log(`=${size}x${size}=`)
		for (let Z = 0; Z <= size; Z++) {
			for (let Y = 0; Y < size; Y++) {
				line = ""
				
				for (let X = 0; X < size; X++) {
					line += (Math.round(net[X][Y][Z] * 100) / 100) + "\t"
				}   
				console.log(`${line}`)
			}
			console.log(`---`)
		}
		console.log(`=${stability}=`)
	}

	get status() {
		return stability
	}

	set inputs(ins) {
		let inputter = ins.slice()

		for (let Y = 0; Y < size; Y++) net[0][Y][0] = inputter[Y]	// glean inputs
	}


	train(inputter, expectation) {
		let error = []
		let expected = expectation.slice()

		stability = 0

		this.inputs = inputter

		activate()

		for (let X = 1; X < size; X++) {
			for (let Y = 0; Y < size; Y++) {	// count the costs
				error[Y] = expected[Y] - net[X][Y][0]
				stability = Math.max(stability, error[Y])
			}

			for (let Y = 0; Y < size; Y++) {
				let diff = error[Y] * net[X][Y][0] * rate

				for (let Z = 1; Z <= size; Z++) {
					net[X][Y][Z] += diff
				}
			}

			activate()

			for (let Y = 0; Y < size; Y++)	// glean the expected values for nexties
			expected[Y] = net[X][Y][0]
		}
	}

	learn(ins, outs, report=false) {
		stability = 1

		while (stability > threshold) {
			this.train(ins, outs)
		}

		if (report) this.print
	}
}
