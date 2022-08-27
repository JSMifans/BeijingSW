// Token
Cesium.Ion.defaultAccessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNmEzYjI4ZS01N2U4LTQyYWUtYmRhNS04YTllZmYwMmZjM2EiLCJpZCI6MTAyNjM1LCJpYXQiOjE2NTg4NTEzNzF9.pLFs9Ej-JoR6X-XMKJBRY2TzQ26SDc9dPyDmPxXZ6W8'

const MyViewer = {
	// 经度：116.30
	// 纬度：39.95
	viewer: null,
	option: {
		baseLayerPicker: false,
		animation: false,
		homeButton: false,
		fullscreenButton: false,
		vrButton: false,
		infoBox: false,
		timeline: false,
		geocoder: false,
		sceneModePicker: false,
		navigationHelpButton: false,
		// terrainProvider: Cesium.createWorldTerrain({
		// 	// 3D的地形 和 水的流动
		// 	requestWaterMask: true,
		// 	requestVertexNormals: true,
		// }),
	},
	init() {
		this.viewer = new Cesium.Viewer('cesium-container', this.option)
		this.viewer.scene.globe.depthTestAgainstTerrain = true
		// 去掉版本信息
		this.viewer._cesiumWidget._creditContainer.style.display = 'none' //隐藏版本信息
		this.initCamera()
		this.loadBoundary()
		this.loadWater()
		this.loadCamera()
		this.loadRaildWay()
		this.loadRoadlines()
		this.setSHI()
		this.loadGrass()
		return this
	},
	initCamera() {
		this.viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(116.2282752107384, 40.066668768336854, 50800.41),
			orientation: {
				heading: 0.7343889489224456,
				pitch: -1.5707963267948966,
				roll: 0.0,
			},
		})
	},
	clickCamera(position, heading, pitch) {
		this.viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(116.46, 39.92, 50000.0),
			orientation: {
				heading: 0.7343889489224456,
				pitch: -1.5707963267948966,
				roll: 0.0,
			},
		})
	},
	loadBoundary() {
		const url = './geoJson/boundary.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url)
		this.viewer.dataSources.add(dataSources).then((dataSource) => {
			dataSource.entities.values.forEach((item) => {
				item.polygon.fill = false
				item.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND
				item.polygon.outline = true
				item.polygon.outlineWidth = 4
				item.polygon.outlineColor = Cesium.Color.DARKORANGE
				item.polyline = {
					width: item.polygon.outlineWidth,
					positions: item.polygon.hierarchy._value.positions,
					material: Cesium.Color.DARKORANGE,
					heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
				}
				// console.log(item.polygon)
			})
		})
	},
	loadWater() {
		var _this = this
		$.get('../geoJson/water.json', function (waterGeoJson) {
			let features = waterGeoJson.features
			let coordinates, positions
			features.map((feature) => {
				coordinates = feature.geometry.coordinates[0]
				positions = _this.coordinatesToPositions(coordinates)
				_this.addWaterRegion(positions)
			})
		})
	},
	loadCamera() {
		var _this = this
		$.get('../geoJson/camear.json', function (camearJson) {
			let features = camearJson.features
			// console.log(features)
			features.forEach((item) => {
				var coordinates = item.geometry.coordinates
				var position = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], 0)
				var entity = _this.viewer.entities.add({
					name: '摄像头',
					position: position,
					model: {
						uri: '../geoJson/SXT.gltf',
						color: Cesium.Color.fromAlpha(Cesium.Color.BLACK, 1),
						scale: 50,
						// minimumPixelSize: 100,
					},
				})
			})
		})
	},
	loadRaildWay() {
		// const url = '../geoJson/railway.json'
		// const dataSources = new Cesium.GeoJsonDataSource.load(url, )
		// this.viewer.dataSources.add(dataSources).then((dataSource) => {
		// 	dataSource.entities.values.forEach((item) => {
		// 		item.polyline.material = new PolylineSpriteMaterialProperty({ duration: 10 })
		// 	})
		// })
	},

	loadGrass() {
		const url = '../geoJson/grass.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url)
		this.viewer.dataSources.add(dataSources).then((dataSource) => {
			dataSource.entities.values.forEach((item) => {
				// console.log(item.polygon)
				item.polygon.material = Cesium.Color.DARKGREEN
				item.polyline = {
					positions: item.polygon.hierarchy._value.positions,
					material: Cesium.Color.DARKGREEN,
				}
				// console.log(item.polygon)
			})
		})
	},
	loadRoadlines() {
		const url = '../geoJson/roadlines.json'
		const dataSources = new Cesium.GeoJsonDataSource.load(url)
		this.viewer.dataSources.add(dataSources).then((dataSource) => {
			dataSource.entities.values.forEach((item) => {
				item.polyline.material = new PolylineSpriteMaterialProperty({
					duration: 3000,
					url: '../images/spriteline1.png',
				})
				item.polyline.width = 4
			})
		})
	},
	addWaterRegion(positions) {
		let waterPrimitive = new WaterPrimitive(positions, {
			baseWaterColor: Cesium.Color.CADETBLUE.withAlpha(0.4),
			normalMap: '../images/waterNormalsSmall.jpg',
			frequency: 1000.0,
			animationSpeed: 0.01,
			amplitude: 10,
			specularIntensity: 10,
		})
		this.viewer.scene.primitives.add(waterPrimitive) //添加到场景
		// this.waterPrimitives.push(waterPrimitive)
	},
	coordinatesToPositions(coordinates) {
		let positions = []
		coordinates.map((c) => {
			positions.push(Cesium.Cartesian3.fromDegrees(Number(c[0]), Number(c[1]), 10))
		})
		return positions
	},
	setSHI() {
		var _this = this
		var pickPosition = { x: null, y: null }
		var pickPositionHandler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas) //定义事件
		//获取视角位置
		pickPositionHandler.setInputAction(function (movement) {
			var cartesian = _this.viewer.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid)
			if (cartesian) {
				var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
				var longitudeString = Cesium.Math.toDegrees(cartographic.longitude) //要更高的精度就修改保留的小数位数
				var latitudeString = Cesium.Math.toDegrees(cartographic.latitude) //同上
				pickPosition.x = longitudeString
				pickPosition.y = latitudeString
				let cf = { x: parseFloat(pickPosition.x), y: parseFloat(pickPosition.y) }
				console.log(cf) //鼠标点击位置
				var a = {
					position: _this.viewer.camera.position,
					heading: _this.viewer.camera.heading,
					pitch: _this.viewer.camera.pitch,
				}
				console.log(a) //当前视角
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
	},
}
