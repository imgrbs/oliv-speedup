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

      console.log('speed up ${SPEED * 100}% !');
    `

    chrome.tabs.executeScript(
        tabs[0].id,
        {code});
  });
};