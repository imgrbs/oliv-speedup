// @ts-nocheck

// ****************** //
// Google Analytics
// ****************** //

var _AnalyticsCode = "UA-148718978-1";

var _gaq = _gaq || [];
_gaq.push(["_setAccount", _AnalyticsCode]);
_gaq.push(["_trackPageview"]);
(function() {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

function trackButtonClick(e) {
  _gaq.push(["_trackEvent", e.target.id, "clicked"]);
}

function trackSpeedClick(e) {
  _gaq.push(["_trackEvent", e.target.value, "selected"]);
  document.getElementById("active").click();
}

function trackCheckbox(e) {
  _gaq.push(["_trackEvent", e.target.checked, "clicked"]);
}

document.addEventListener("DOMContentLoaded", function() {
  _gaq.push(["_trackEvent", "extension open up", "loaded"]);

  var speed = document.getElementById("speed");
  speed.addEventListener("change", trackSpeedClick);

  var disableButton = document.getElementById("disbled-btn");
  disableButton.addEventListener("change", trackCheckbox);

  var buttons = document.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", trackButtonClick);
  }
});

// ****************** //
// Core Features
// ****************** //

let activeButton = document.getElementById("active");

// Inject the script when start the tabs
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.executeScript(tabs[0].id, { file: "script.js" });
});

// Handle when user clicks the `active` button
activeButton.onclick = function(element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let speed = document.getElementById("speed").value;
    let isDisabledUselessButton = document.getElementById("disbled-btn")
      .checked;

    chrome.tabs.sendMessage(tabs[0].id, {
      speed,
      isDisabledUselessButton
    });
  });
};
