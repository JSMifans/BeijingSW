// 时间方法
$('#headerNowDay').html(dayjs().format('YYYY - MM - DD'))

setInterval(() => {
	$('#mmddss').html(dayjs().format('HH : mm : ss'))
}, 1000)
console.log(MyViewer)
let viewer = MyViewer.init()
// 表格假数据
tableDateCreate()
function tableDateCreate() {
	var html = ''
	for (let i = 0; i < 30; i++) {
		html += `<div class="td">
        <div class="item ellipsis">2022-8-27</div>
        <div class="item ellipsis">北京颐和路</div>
        <div class="item ellipsis">1200M</div>
        <div class="item ellipsis">河面有漂浮杂物,河面有漂浮杂物</div>
    </div>
    `
	}
	$('.td-over').html(html)
}

// 点击事件
$('.search-content .item ').click(function () {
	var name = $(this).find('.text')[0].innerText
	$(this).find('.item-bg').addClass('item-is-bg')
	$(this).siblings().find('.item-bg').removeClass('item-is-bg')
	switch (name) {
		case '摄像头':
			$('.search-content').hide()
			$('.search-list').show()
			$(this).find('.item-bg').removeClass('item-is-bg')
			break
		case '水位':
			$(this).find('img').attr('src', './images/icon_is.png')
			break
		case '阀门':
			$(this).find('img').attr('src', './images/value-is.png')
			break
		case '水泵':
			$(this).find('img').attr('src', './images/pump-is.png')
			break
		default:
			break
	}
})

// 返回
$('.to-home').click(function () {
	$('.search-content').show()
	$('.search-list').hide()
})

// 工具点击效果
$('.clickitem').click(function () {
	$(this).removeClass('items')
	$(this).find('.item-img').show()
	$(this).siblings().find('.item-img').hide()
	$(this).siblings().addClass('items')
})
// left back
var initBack = false
$('#back').click(function () {
	var timer = null
	clearTimeout(timer)
	_this = this
	if (!initBack) {
		initBack = true
		$('#left-container').animate({ left: '-2304px' })
		timer = setTimeout(function () {
			$(_this).addClass('isBack')
		}, 1000)
		return
	}
	$('#left-container').animate({ left: '0px' })
	$('#back').removeClass('isBack')
	initBack = false
})

// right back
var initOpen = false
$('#opens').click(function () {
	var timer = null
	clearTimeout(timer)
	_this = this
	if (!initOpen) {
		initOpen = true
		$('#right-container').animate({ right: '-2134px' })
		timer = setTimeout(function () {
			$(_this).addClass('isOpens')
		}, 1000)
		return
	}
	$('#right-container').animate({ right: '0px' })
	$('#opens').removeClass('isOpens')
	initOpen = false
})

// 大楼地区切换
$('.tabFlower .item').click(function () {
	$(this).addClass('isItem').siblings().removeClass('isItem')
	viewer.clickCamera()
})

// 初始化地区
