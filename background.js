
    var socket = io.connect('https://animeflvparty.herokuapp.com/');
    // var socket = io.connect('http://localhost:3002');
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log("background.js got a message")
            console.log(request);
            console.log(sender);
            if(request == "play"){
                socket.emit('play');
                sendResponse(request);
            }else if(request == "pause"){
                socket.emit('pause');
                sendResponse(request);
            }
        }
    );
    socket.on('play-server', (data) =>{
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {playServer: "playServer"}, function(response) {
                console.log(response);
            });
        }); 
    });
    socket.on('pause-server', (data) =>{
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {pauseServer: "pauseServer"}, function(response) {
                console.log(response);
            });
        }); 
    });