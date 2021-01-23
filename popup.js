const variable = document.querySelector('body');
console.log(chrome);
chrome.tabs.executeScript(null, {
    file: "funcion.js"
});