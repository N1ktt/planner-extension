console.log("background works")
// chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
// {
//     if( request.login === "SetCookie" )
//     {
//         let tabURL = "Not set yet"
//         chrome.tabs.query({active:true},function(tabs){
//             if(tabs.length === 0) {
//                 sendResponse({})
//                 return
//             }
//             tabURL = tabs[0].url;
//             sendResponse( {navURL:tabURL} )
//         })   
//     }
// })
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     if (message.split(" ")[0] == 'login') {
//         console.log(message.split(" ")[1])
//         //creates cookie with token
//         let expirationDate = new Date(message.split(" ")[2])
//         // console.log(expirationDate)
//         document.cookie = `token=${message.split(" ")[1]}; expires=${expirationDate}`
//       sendResponse("Token saved")
//     }
//     if (message == 'logout') {
//         let expirationDate = new Date("10-12-1990")
//         document.cookie = `token=a; expires=${expirationDate}`
//       sendResponse("Token removed")
//     }
//   })

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     // 2. A page requested user data, respond with a copy of `user`
//     if (message == 'token') {
//       sendResponse();
//     }
//   });



// chrome.runtime.sendMessage('token', (response) => {
//     console.log('token = ', response)
// })


async function handleMessage(request, sender, sendResponse) {
    let link = await request.link
    console.log(`link: ${request.link}`)
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
    const res = await fetch("http://127.0.0.1:3000/api/getYoutubeData", options)
    const results = await res.json()
    console.log(results)
    sendResponse({ response: "Done" })
}
  
chrome.runtime.onMessage.addListener(handleMessage)