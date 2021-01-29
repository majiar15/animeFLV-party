let btnCrearSala = document.querySelector('#CrearSala');
let salaDom = document.querySelector('.sala');
let containerDom = document.querySelector('.container');
let codigo = document.querySelector('#codigo');
btnCrearSala.addEventListener('click', () =>{
    chrome.runtime.sendMessage( {action: "crearSala"}, function(response) {
        console.log(response);

    });
    
    
});
let btnEntrarSala = document.querySelector('#EntrarSala');


