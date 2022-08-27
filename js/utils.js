;(function () {
	// * 默认缩放值
	const scale = {
		width: '1',
		height: '1',
	}
	const baseWidth = 7680
	const baseHeight = 2160
	// const baseWidth = 3960
	// const baseHeight = 1080
	// * 需保持的比例（默认1.77778）
	const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))
	var app = document.getElementById('app')
	const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))

	function scaleZoom() {
		if (currentRate > baseProportion) {
			scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
			scale.height = (window.innerHeight / baseHeight).toFixed(5)
			app.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
		} else {
			scale.height = (window.innerWidth / baseProportion / baseHeight).toFixed(5)
			scale.width = (window.innerWidth / baseWidth).toFixed(5)
			app.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
		}
	}
	scaleZoom()
	// window.addEventListener('resize', function () {
	// 	scaleZoom()
	// })
})()
