// @ts-nocheck
'use strict';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  var speed = message.speed;
  var isDisabledUselessButton = message.isDisabledUselessButton;

  setVideoPlaybackSpeedRate(speed);

  if (isDisabledUselessButton) {
    disabledUselessButton();
  }
});

function setVideoPlaybackSpeedRate(speed) {
  document.getElementsByTagName('video')[0].playbackRate = speed;

  console.log(
    `%c speed up ${speed * 100}% !`,
    'background: #222; color: #bada55'
  );
}

function disabledUselessButton() {
  var list = document.querySelectorAll('vg-cuepoint.ng-scope');

  for (let item of list) {
    item.style.display = 'none';
  }
}
