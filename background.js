// const SPEED = 1.8;
// const DELAY_IN_SECOND = 2;

// setTimeout(function() {
//   document.getElementsByTagName('video')[0].playbackRate = SPEED;

//   var list = document.querySelectorAll('vg-cuepoint.ng-scope');
  
//   for (let item of list) {
//       item.style.display = 'none';
//   }
  
//   console.log(`speed up ${SPEED * 100}% !`);
// }, DELAY_IN_SECOND * 1000)
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});