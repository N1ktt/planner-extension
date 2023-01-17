async function handleResponse(message){
    let messresp = await message
    console.log(`STATUS: ${messresp}`)
}
  
function handleError(error){
    console.log(`Error: ${error}`)
}
  
function notifyBackgroundPage(e){
    let link = window.location.toString()
    // console.log(link)
    const sending = chrome.runtime.sendMessage({
        link: link,
    })
    sending.then(handleResponse, handleError)
}
  
notifyBackgroundPage()

setInterval(notifyBackgroundPage,5000)