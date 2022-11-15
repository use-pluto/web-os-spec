navigator.registerProtocolHandler("os", "https://system41.github.io/web-os-standard/?protocol=%s", "web-os handler")
let content = document.getElementById("content")
content.innerHTML = `Tried to register protocol handler, visit a link such as <a href="web+os:directory/file.txt">this one</a> to see if it was successful`
let theStuff = new URLSearchParams(location.href).get("protocol")
if (theStuff) {
    content.innerHTML = `Well done! You tried to open ${theStuff}` //yes, I know this is quite insecure (bc innerHTML) but it's just a quick demo
}