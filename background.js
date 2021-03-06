    // var link = 'https://animeflvparty.herokuapp.com/';
    // var socket = io.connect(link);
    var link = 'http://localhost:3000/';
    var socket = io.connect('http://localhost:3000/');
    chrome.runtime.sendMessage(
        {activo: "activo", href: window.location.href}
    )

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
            }else if(request.action == "crearSala"){
                let dataGlobal;
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, "getUrl", function(response) {
                        // va ha content
                        console.log(response);
                        if(!response.includes('https://www3.animeflv.net/')){
                            fetch(link+'api/crear/sala',{
                                method: 'post',
                                body:{
                                    url:response
                                },
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                              
                                },
                                body: JSON.stringify({url: response})
                            })
                            .then(response => response.json())
                            .then(data => {
                                dataGlobal = data.codigo;
                                sendResponse(dataGlobal);
                                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                                    chrome.tabs.sendMessage(tabs[0].id, {chat: "InitialChat", codigo :dataGlobal}, function(response) {
                                        console.log(response);
                                    });                
                                });
                            })
                            .catch(error => {
                                sendResponse(error);
                            });
                            console.log(response);
                        }else{
                            sendResponse(false)
                        }
                        
                        return true;
                    });      
                    return true;          
                });
                return true;
            }else if(request.action == 'InitialChat-poppup'){
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {chat: "InitialChat", codigo :request.codigo}, function(response) {
                        console.log(response);
                        return true;
                    });                
                });
                sendResponse('chat iniciado');
            }else if(request.action == 'messageSend'){
                socket.emit('sendMessage', request.message);
                sendResponse(request);
            }else if(request.action == 'isInitial'){
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {isInitial: "isInitial"}, function(response) {
                        // va a  content
                        sendResponse(response);
                        return true;
                    });                
                });
                
            }else if (request.action == 'entrarSala'){
                fetch('https://animeflvparty.herokuapp.com/api/entrar/sala',{
                            method: 'post',
                            headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
						  
							},
                            body: JSON.stringify({codigo: request.salaId})
                        })
                        .then(response => response.json())
                        .then(data => {
                            
                        })
                        .catch(error => {
                            sendResponse(error);
                        });

            }else if(request == "activo"){
                chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, "getUrl", function(response) {
                        sendResponse(response);
                        return true
                    });                
                });
                
            }else if(request == "start"){
                chrome.tabs.query({active: true, currentWindow: true},function(tab) {
                    chrome.tabs.sendMessage(tab[0].id, {init: true}, function(response) {
                        // va a content
                        let parcialResponse;
                        chrome.tabs.sendMessage(tab[0].id, {action: 'isInitial'}, function(response) {
                            parcialResponse = response;
                            sendResponse(true);
                        });
                        sendResponse(parcialResponse);
                        
                        return true;
                    });                
                });
                sendResponse(true);
            }
           return true;
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
    socket.on('message-received', (data) =>{
        chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {messageReceived:true, data: data.data}, function(response) {
                console.log(response);
            });
        }); 
    });
