import React,{useEffect} from 'react'
import Neuron from "./neuron"
import {matrix} from 'mathjs'

function useNeuron(input,target) {
	let N = new Neuron()

	useEffect(() => {
		if (input && target) {
			const Ilen = input[0].length
			const Olen = target[0].length

			input = matrix(input)
			target = matrix(target)

			N = new Neuron({
				num_inputs: Ilen,
				num_hiddens: 4,
				num_outputs: Olen,
				activation: Neuron.RELU,
			})

			N.train(input, target)
		}
	}, [input, target])

	function predict(A) {
		const thisn = matrix(A)
		return N.predict(A)
	}

	return [predict]
}

export default useNeuron