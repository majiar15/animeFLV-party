

    // var socket = io.connect('https://animeflvparty.herokuapp.com/');
    var socket = io.connect('http://localhost:3002');
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
            }else if(request.action == "CrearSala"){
                
                let dataGlobal;
                chrome.storage.local.get(['salaCode'], (result) => {
                    if(result.salaCode){
                        dataGlobal = result.salaCode;
                        sendResponse(result.salaCode);
                    }else{
                        fetch('http://localhost:3000/api/crear/sala',{
                            method: 'post',
                            
                        })
                        .then(response => response.json())
                        .then(data => {
                            dataGlobal = data;
                            chrome.storage.local.set({'salaCode': data}, function() {
                                sendResponse(data);
                              });
                        })
                        .catch(error => {
                            sendResponse(error);
                        });
                    }
                    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {chat: "InitialChat", data :dataGlobal}, function(response) {
                            console.log(response);
                        });
                });
                
            });
            return true;
                
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
