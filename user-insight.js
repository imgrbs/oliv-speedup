var dataLayer = [];
document.getElementById('active').addEventListener('click', function() {
    dataLayer.push({
    speed: document.getElementById('speed').value,
    clearButton: document.getElementById('disbled-btn').checked
    })
})
