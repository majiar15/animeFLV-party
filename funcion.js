

if(window.location.href.substr(0,30) === 'https://www3.animeflv.net/ver/'){
    var start = document.querySelector('iframe')
      
    window.location.href = start.src;
}else if(
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
        
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {

                console.log("background.js got a message")
                console.log(request);
                console.log(sender);
                console.log(request);
                if(request.playServer == "playServer"){
                    video.play();
                    console.log("ya dio play");
                    sendResponse(request);
                }else if(request.pauseServer == "pauseServer"){
                    video.pause();
                    console.log("ya dio pause");
                    sendResponse(request);
                }
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
    }, 3000);
    

}




