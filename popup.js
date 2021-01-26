const variable = document.querySelector('body');

chrome.tabs.executeScript(null, {
    file: "socket.io.js"
});