console.log("background script works")
async function handleMessage(request, sender, sendResponse) {
    let link = await request.link
    console.log(`link: ${request.link}`)
    let prevLink = await chrome.storage.session.get(["link"])
    console.log(prevLink)
    if(prevLink.link == link){
        return sendResponse({ response: "Link the same" })
    }else{
        chrome.storage.session.set({ link : link })
        let token = await chrome.storage.local.get(["token"])
        token = token.token
        console.log(token)
        const data = { 
            token : token,
            link : link
        }
        console.log(data)
        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const res = await fetch("https://planner-kccm.onrender.com/api/getYoutubeData", options)
        const results = await res.json()
        console.log(results)
        sendResponse({ response: "Done" })
    }
    
}
  
chrome.runtime.onMessage.addListener(handleMessage)