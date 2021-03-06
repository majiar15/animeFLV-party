function main() {
    if(window.location.href.substr(0,30) === 'https://www3.animeflv.net/ver/'){
        var start = document.querySelector('iframe');
            
        window.location.href = start.src;
    }        
}
    // iniciar chat - acciones chat
    if(
        window.location.href.substr(0,27) === "https://streamium.xyz/gocdn" ||
        window.location.href.substr(0,23) === "https://embedsito.com/v/" ||
        window.location.href.substr(0,25) === "https://streamtape.com/e/" ||
        window.location.href.substr(0,16) === "https://mega.nz/" ||
        window.location.href.substr(0,25) === "https://ok.ru/videoembed/" ||
        window.location.href.substr(0,33) === "https://www.yourupload.com/embed/" ||
        window.location.href.substr(0,31) === "https://my.mail.ru/video/embed/" ||
        window.location.href.substr(0,42) === "https://hqq.tv/player/embed_player.php?vid"
    ){

        var startIframe = document.querySelector('#start');
        startIframe.click();
        setTimeout(() => {
            let video = document.querySelector('video');
            video.pause();
            
            chrome.extension.onMessage.addListener(
                function(request, sender, sendResponse) {
                    if(request.playServer == "playServer"){
                        video.play();
                        console.log("ya dio play");
                        sendResponse(request);
                    }else if(request.pauseServer == "pauseServer"){
                        video.pause();
                        console.log("ya dio pause");
                        sendResponse(request);
                    }else if(request.chat == "InitialChat"){
                       
                        if(!document.querySelector('.sala')){
                            console.log(request);
                            sessionStorage.setItem("sala", request.codigo);
                            // insercion del chat en la pagina 
                            let salaDom = document.createElement('div');
                            let h1 = document.createElement('h1');
                            let h2 = document.createElement('h2');
                            let chat = document.createElement('div');
                            let messageBox = document.createElement('div');
                            let TypingArea = document.createElement('div');
                            let inputText = document.createElement('input');
                            let btn = document.createElement('button');
                            
                            inputText.setAttribute("type","text");
                            inputText.classList.add('inputChat');
                            inputText.placeholder = "Escribe tu mensaje";
                            btn.innerText = "Enviar";
                            h2.innerText = "Sala: ";                        
                            h2.append(document.createElement('span').innerText = request.codigo);
                            chat.classList.add('chat');
                            messageBox.classList.add('messageBox');
                            TypingArea.classList.add('TypingArea');
                            TypingArea.appendChild(inputText);
                            TypingArea.appendChild(btn);
                            salaDom.classList.add("sala");
                            salaDom.appendChild(h1);
                            salaDom.appendChild(h2);
                            salaDom.appendChild(chat);
                            chat.appendChild(messageBox);
                            chat.appendChild(TypingArea);

                            let container = document.querySelector('#container').insertAdjacentElement("beforeend", salaDom);
                            console.log(container);

                            //add events 
                            inputText.addEventListener('keypress', (e) => {
                                if(e.key == 'Enter'){
                                    if(e.target.value != ''){
                                        chrome.runtime.sendMessage(
                                            {action:"messageSend", message: inputText.value},
                                            function (response) {
                                                console.log(response);
                                            }
                                        );
                                        let messageSend = document.createElement('div');
                                        let text = document.createElement('div');
                                        text.classList.add('text');
                                        text.innerText = e.target.value;
                                        messageSend.classList.add('messageSend');
                                        messageSend.appendChild(text);
                                        messageBox.appendChild(messageSend);
                                        messageBox.scroll(0,messageBox.scrollHeight);
                                        // console.log(e.target.value);
                                        e.target.value = '';
                                    }
                                }
                            });
                            btn.addEventListener('click',(e)=>{
                                if(inputText.value != ''){
                                    chrome.runtime.sendMessage(
                                            {action:"messageSend", message: inputText.value},
                                            function (response) {
                                                console.log(response);
                                            }
                                        );
                                    let messageSend = document.createElement('div');
                                    let text = document.createElement('div');
                                    text.classList.add('text');
                                    text.innerText = inputText.value;
                                    messageSend.classList.add('messageSend');
                                    messageSend.appendChild(text);
                                    messageBox.appendChild(messageSend);
                                    messageBox.scroll(0,messageBox.scrollHeight);
                                    console.log(inputText.value);
                                    inputText.value = '';
                                }
                            });

                        }
                        sendResponse(request.codigo)
                    }
                    else if(request.messageReceived){
                        let messageSend = document.createElement('div');
                        let text = document.createElement('div');
                        text.classList.add('text');
                        text.innerText = request.data;
                        messageSend.classList.add('messageRequest');
                        messageSend.appendChild(text);
                        let chat = document.querySelector('.messageBox')
                        chat.appendChild(messageSend);
                        chat.scroll(0,chat.scrollHeight);
                                    
                        sendResponse(request);
                    }else if(request.isInitial == "isInitial"){
                        let sala = sessionStorage.getItem('sala');
                        console.log(sala);
                        if(sala != null && sala != undefined && sala != "undefined"){
                            sendResponse(sala);
                        }else{
                            sendResponse(true);
                        }
                        
                        
                    }
                    return true;
                }
            );


            video.addEventListener('play', () =>{
                chrome.runtime.sendMessage(
                    "play",
                    function (response) {
                        console.log(response);
                    }
                );
            });
            video.addEventListener('pause', () =>{
                chrome.runtime.sendMessage(
                    "pause",
                    function (response) {
                        console.log(response);
                    }
                );
            });

        }, 1500);
    }


chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request == "getUrl"){
            console.log(window.location.href);

            sendResponse(window.location.href)
        }else if(request.init){
            console.log("start");
            main();
            sendResponse("ok");
        }
        return true
    }
)





