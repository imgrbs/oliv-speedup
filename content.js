if (typeof process === 'undefined') {
  var process = {
    env: 'production'
  }
}

const url = window.location.href
const isOlivVideo = /learning.sit.kmutt.ac.th\/#\/video\/(\w+)/.test(url) || process.env === 'test'

if (isOlivVideo) {
  let checkVideoVisibleInterval
  checkVideoVisibleInterval = setInterval(function () {
    const video = document.getElementsByTagName('video')[0]
    if (video) {
      addControlButton()
      bindControlKey(video)
      clearInterval(checkVideoVisibleInterval)
    }
  }, 500)
}

function addControlButton () {
  const olivControl = document.getElementById('custom-oliv-video-control')
  console.log('addControl')
  if (!olivControl) {
    const videoPlayer = document.getElementsByTagName('video-player')[0]
    const rewindImage = chrome.extension.getURL('rewind.svg')
    videoPlayer.insertAdjacentHTML('afterend', `
      <div id="custom-oliv-video-control" style="max-width: 900px; margin: 5px auto;">
        <button style="
          border-radius: 50%;
          width: 50px;
          padding: 0;
          border: none;"
          id="custom-oliv-video-rewind"
          title="rewind"
        >
          <img src=${rewindImage} />
        </button>
        <button style="
          border-radius: 50%;
          width: 50px;
          padding: 0;
          border: none;"
          id="custom-oliv-video-forward"
          title="forward"
        >
          <img style="transform: scale(-1)" src=${rewindImage} />
        </button>
      </div>
    `)
  }
}

function bindControlKey (video) {
  document.getElementById('custom-oliv-video-rewind').addEventListener('click', () => rewindVideo(video))
  document.getElementById('custom-oliv-video-forward').addEventListener('click', () => forwardVideo(video))
}

const timeOffset = 5

function rewindVideo (video) {
  const time = video.currentTime
  video.currentTime = time - timeOffset
}

function forwardVideo (video) {
  const time = video.currentTime
  video.currentTime = time + timeOffset
}
