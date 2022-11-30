
// async function sendData(){
//     console.log(window.location.toString())
//     let link = window.location.toString()
//     // link = link.split("&")[0]
//     let token = await chrome.storage.local.get(["token"])
//     token = token.token
//     console.log(token)
//     const data = { 
//         token : token,
//         link : link
//     }
//     console.log(data)
//     const options = {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }
//     const res = await fetch("http://127.0.0.1:3000/api/getYoutubeData", options)
//     const results = await res.json()
//     console.log(results)


    
// function handleResponse(message) {
//     console.log(`Message from the background script: ${message.response}`);
//   }
  
// function handleError(error) {
//     console.log(`Error: ${error}`)
// }
  
// function notifyBackgroundPage(e) {
//     const sending = browser.runtime.sendMessage({
//         greeting: "Greeting from the content script",
//     });
//     sending.then(handleResponse, handleError);
// }
  
//   window.addEventListener("click", notifyBackgroundPage);
// }

// sendData()





async function handleResponse(message){
    let messresp = await message
    console.log(`STATUS: ${messresp}`)
}
  
function handleError(error){
    console.log(`Error: ${error}`)
}
  
function notifyBackgroundPage(e){
    let link = window.location.toString()
    console.log(link)
    const sending = chrome.runtime.sendMessage({
        link: link,
    })
    sending.then(handleResponse, handleError)
}
  
notifyBackgroundPage()

setInterval(notifyBackgroundPage,5000)