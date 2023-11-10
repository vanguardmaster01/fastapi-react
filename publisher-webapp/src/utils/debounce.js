const debounce = (func, dealyTime = 500) => {
	let timer
	return function (...args) {
		const context = this
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			timer = null
			func.apply(context, args)
		}, dealyTime)
	}
}

export default debounce
