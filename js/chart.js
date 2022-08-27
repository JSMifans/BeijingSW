// 区域地图
const mapChart = {
	initMap() {
		$.get('../geoJson/haidian.json', function (handianJson) {
			echarts.registerMap('handian', { geoJSON: handianJson })
			var map = echarts.init(document.getElementById('map-container'))
			let data = [
				{
					name: '人脸识别01#',
					value: [116.17377437945859, 40.093463375371705, 85],
				},
				{
					name: '人脸识别02#',
					value: [116.17485562392801, 40.09346510478612, 85],
				},
				{
					name: '枪机12#',
					value: [116.190962252384, 40.104684227698, 85],
				},
				{
					name: '球机20#',
					value: [116.23955861679, 40.1036986970464, 85],
				},
				{
					name: '球机14#',
					value: [116.211552819378, 40.1009962081386, 85],
				},
				{
					name: '枪机37#',
					value: [116.23000652812, 40.1071210520948, 85],
				},
			]
			let option = {
				geo: [
					{
						map: 'handian',
						label: {
							show: true,
							postion: 'center',
							formatter: (params) => {
								return ''
							},
						},
						itemStyle: {
							normal: {
								areaColor: 'rgba(32, 124, 211, 0.5)',
								borderColor: '#3B5077',
							},
							emphasis: {
								areaColor: 'rgba(32, 124, 211, 0.5)',
							},
						},
						tooltip: {
							position: ['50%', '50%'],
							formatter: '{b0}: {c0}<br />{b1}: {c1}',
						},
					},
				],
				series: {
					type: 'effectScatter', //样试
					coordinateSystem: 'geo', //该系列使用的坐标系
					data: data,
					itemStyle: {
						//样试。
						normal: {
							//默认样试
							color: '#d6f628',
						},
					},
					label: {
						normal: {
							show: false,
							formatter: function (params) {
								return '摄像头 ' + params.name
							},
							position: 'top',
							color: '#fff',
							fontSize: '30',
						},
						emphasis: {
							show: true,
						},
					},

					hoverAnimation: true, //鼠标移入放大圆
					tooltip: {
						show: false,
					},
				},
			}
			map.setOption(option)
		})
	},
}
mapChart.initMap()
