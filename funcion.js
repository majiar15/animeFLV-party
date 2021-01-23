
if(window.location.href.substr(0,30) === 'https://www3.animeflv.net/ver/'){
    var start = document.querySelector('iframe')
    console.log(start.src);
    
    window.location.href = start.src;

}else{
    var startIframe = document.querySelector('#start');
    startIframe.click();
    setTimeout(() => {
        let video = document.querySelector('video');
        video.pause();
        video.addEventListener('play', () =>{
            console.log("play");
        });
        video.addEventListener('pause', () =>{
            console.log("paused");
        });
    }, 1000);
}




