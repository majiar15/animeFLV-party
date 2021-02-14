let btnCrearSala = document.querySelector('#CrearSala');
let salaDom = document.querySelector('.sala');
let containerDom = document.querySelector('.container');
let codigo = document.querySelector('#codigo');
let salaId = document.querySelector('#salaId');
let linkHref = document.querySelector('link');
let p = document.querySelector('p');
let pageHref;

chrome.runtime.sendMessage( 'activo', function(response) {
    pageHref = response;
    console.log(response);
    

    if(pageHref === null){
        console.log("is null");
        containerDom.style.display = "none";
        containerDom.style.background= "white";
        document.body.style.background = "white"
    }
    else if(
        
        pageHref.includes('https://www3.animeflv.net/') ||
        pageHref.includes("https://streamium.xyz/gocdn")||
        pageHref.includes("https://embedsito.com/v/")||
        pageHref.includes("https://streamtape.com/e/")||
        pageHref.includes("https://mega.nz/")||
        pageHref.includes("https://ok.ru/videoembed/")||
        pageHref.includes("https://www.yourupload.com/embed/")||
        pageHref.includes("https://my.mail.ru/video/embed/")||
        pageHref.includes("https://hqq.tv/player/embed_player.php?vid")
    ){
        containerDom.style.display = "block";
        p.style.display = "none";
        btnCrearSala.addEventListener('click', () =>{
            chrome.runtime.sendMessage({action: "isInitial"},function(response) {
        
                if(response == true){
                    chrome.runtime.sendMessage( {action: "crearSala"}, function(response) {
                    
                        console.log(response);
                
                    });
        
                }else{
                    console.log(response);
                    chrome.runtime.sendMessage({action: "InitialChat-poppup", codigo :response}, function(response) {
                        console.log(response);
                        
                    });
                    
                }
            return true;
            });
        
            
            
        });
        let btnEntrarSala = document.querySelector('#EntrarSala');
        
        btnEntrarSala.addEventListener('click', (e)=>{
            chrome.runtime.sendMessage({action: "entrarSala", salaId: salaId.value},function(response) {
                console.log(response);
            });
        
        });
    
    }else{
        containerDom.style.display = "none";
        p.style.width = "290px";

        linkHref.remove();
    }

});

