createLineChart()
function createLineChart() {
	let line = echarts.init(document.getElementById('line-container'))
	let option = {
		title: {
			left: 20,
			top: 5,
			text: '坝轴位移(m)',
			textStyle: {
				fontSize: 40,
				color: '#fff',
			},
		},
		legend: {
			data: ['平行坝轴位移', '水平坝轴位移'],
			right: 0,
			top: 10,
			textStyle: {
				fontSize: 30,
				color: '#fff',
			},
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},

		xAxis: {
			type: 'category',
			data: ['2022/07/10', '2022/07/10', '2022/07/10', '2022/07/10'],
			axisLabel: {
				textStyle: {
					fontSize: 25,
					color: '#fff',
				},
			},
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 25,
				},
			},
			splitLine: {
				//网格线
				lineStyle: {
					type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
					width: 2,
				},
				show: true, //隐藏或显示
			},
		},
		series: [
			{
				name: '平行坝轴位移',
				data: [0, 130, 124, 218, 135, 147, 260],
				type: 'line',
				stack: 'Total',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: 'rgba(255, 224, 144)',
				},
			},
			{
				name: '水平坝轴位移',
				data: [0, 132, 101, 134, 90, 130, 210],
				type: 'line',
				stack: 'Total',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: 'rgba(17, 133, 240)',
				},
			},
		],
	}
	line.setOption(option)
}

craeteBarChart()
function craeteBarChart() {
	let bar = echarts.init(document.getElementById('zhu-chart'))
	let option = {
		legend: {
			data: ['高水位', '低水位'],
			right: 0,
			top: 10,
			textStyle: {
				fontSize: 30,
				color: '#fff',
			},
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},
		xAxis: {
			type: 'category',
			data: ['2022/07/10', '2022/07/10', '2022/07/10', '2022/07/10'],
			axisLabel: {
				textStyle: {
					fontSize: 25,
					color: '#fff',
				},
			},
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff',
					fontSize: 25,
				},
			},
			splitLine: {
				//网格线
				lineStyle: {
					type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
					width: 2,
				},
				show: true, //隐藏或显示
			},
		},
		series: [
			{
				name: '高水位',
				type: 'bar',
				data: [12.0, 41.9, 27.0, 23.2, 25.6],
			},
			{
				name: '低水位',
				type: 'bar',
				data: [12.6, 51.9, 92.0, 26.4, 28.7],
			},
		],
	}
	bar.setOption(option)
}
