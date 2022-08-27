createVideoHtml()
function createVideoHtml() {
	var html = ''
	for (let i = 0; i < 4; i++) {
		html += `
        <div class="item">
            <div class="video-item">
                <video
                    id="my-video${i}"
                    class="video-js"
                    controls
                    width="439px"
                    height="300px"
                    data-setup="{}"
                    muted="muted"
                >
                    <source
                        src="http://112.20.185.196:17086/live/cameraid/1000001%241/substream/1.m3u8"
                        type="application/x-mpegURL"
                        style="width: 100%; height: 100%"
                    />
                </video>
            </div>
            <div class="ellipsis text">颐和路28号门口</div>
        </div>`
	}
	$('.jiankong-container').html(html)
	console.log(videojs)
	let myPlayer0 = videojs('my-video0', { autoplay: false })
	myPlayer0.play()
	let myPlayer1 = videojs('my-video1', { autoplay: false })
	myPlayer1.play()
	let myPlayer2 = videojs('my-video2', { autoplay: false })
	myPlayer2.play()
	let myPlayer3 = videojs('my-video3', { autoplay: false })
	myPlayer3.play()

	// let myPlayer0 = videojs('#my-video0')
	// myPlayer0.play()
	// let myPlayer2 = videojs('#my-video2')
	// myPlayer2.play()
	// let myPlayer3 = videojs('#my-video3')
	// myPlayer3.play()
}
