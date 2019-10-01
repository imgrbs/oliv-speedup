// ****************** //
// Google Analytics
// ****************** //

var _AnalyticsCode = 'UA-148718978-1';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

function trackSpeedClick(e) {
  _gaq.push(['_trackEvent', e.target.value, 'selected']);
}

function trackCheckbox(e) {
  _gaq.push(['_trackEvent', e.target.checked, 'clicked']);
}

document.addEventListener('DOMContentLoaded', function () {
  _gaq.push(['_trackEvent', 'extension open up', 'loaded']);

  var speed = document.getElementById('speed');
  speed.addEventListener('change', trackSpeedClick); 

  var disableButton = document.getElementById('disbled-btn');
  disableButton.addEventListener('change', trackCheckbox); 

  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});

// ****************** //
// Core Features
// ****************** //

let activeButton = document.getElementById('active');

activeButton.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let SPEED = document.getElementById('speed').value;
    let DISBLED_USELESS_BUTTON = document.getElementById('disbled-btn').checked;
    const code = `
      document.getElementsByTagName('video')[0].playbackRate = ${SPEED};

      if (${DISBLED_USELESS_BUTTON}) {
        var list = document.querySelectorAll('vg-cuepoint.ng-scope');
        
        for (let item of list) {
            item.style.display = 'none';
        }
      }
      console.log('%c speed up ${SPEED * 100}% ! ', 'background: #222; color: #bada55');
    `

    chrome.tabs.executeScript(
        tabs[0].id,
        {code});
  });
};

