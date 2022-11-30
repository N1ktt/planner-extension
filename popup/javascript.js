
async function setUp()
{
    document.querySelectorAll(".log").forEach(element=>{
        element.style.display = "block"
    })
    document.querySelector(".logOut").style.display="none"
    document.querySelectorAll(".error-box")[0].style.display="none"
    let token = await chrome.storage.local.get(["token"])
    if(token.token.length>50){
        document.querySelectorAll(".log").forEach(element=>{
            element.style.display = "none"
        })
        document.querySelector(".logOut").style.display = "block"
    }
}
setUp()

async function login()
{
    document.querySelectorAll(".error-box")[0].style.display="none"
    let login = document.querySelector("#log-log").value
    let password = document.querySelector("#log-pass").value
    //checks if form empty
    if(login.trim().length == 0 || password.trim().length == 0){
        document.querySelectorAll(".error-box")[0].style.display="flex"
        if(login.trim().length == 0 && password.trim().length == 0){
            document.querySelectorAll(".error-box")[0].querySelector("p").innerText = "Pola nie zostały wypełnione"
            return
        }
        document.querySelectorAll(".error-box")[0].querySelector("p").innerText = "Jedno z pól nie zostało wypełnione"
        return
    }
    const data = { 
        login : login,
        password : password
    }
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const res = await fetch("http://127.0.0.1:3000/api/login", options)
    const results = await res.json()
    // console.log(results)
    if(results.correct){
        chrome.storage.local.set({ token : results.token })
        //creates cookie with token
        // let expirationDate = new Date(results.expirationDate)
        // console.log(expirationDate)
        // document.cookie = `token=${results.token}; expires=${expirationDate}`
        // for (let i = 0; i < document.cookie.split(";").length; i++) {
        //     if(document.cookie.split(";")[i].split("=")[0].trim()=="token"){
        //         document.write(document.cookie.split(";")[i].split("=")[1])
        //         // let expirationDate = new Date("10-12-1990")
        //         // document.cookie = `token=a; expires=${expirationDate}`
        //     }
        // }
        // chrome.runtime.sendMessage('login '+String(results.token + ' ' + results.expirationDate), (response) => {
        //     console.log(response)
        // })
        document.querySelectorAll(".log").forEach(element=>{
            element.style.display = "none"
        })
        document.querySelector(".logOut").style.display="block"
    }else{
        //displays error
        document.querySelectorAll(".error-box")[0].style.display="flex"
        if(results.message == undefined){
            document.querySelectorAll(".error-box")[0].querySelector("p").innerText = "Brak informacji o błędzie, sprawdź konsole"
        }else{
            document.querySelectorAll(".error-box")[0].querySelector("p").innerText = results.message
        }
    }
}
document.querySelector("#log-btn").addEventListener("click",login)


async function logout(){
    let token = await chrome.storage.local.get(["token"])
    token = token.token
    const data = { 
        token : token
    }
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const res = await fetch("http://127.0.0.1:3000/api/logOut", options)
    chrome.storage.local.set({ token : "" })

    document.querySelectorAll(".log").forEach(element=>{
        element.style.display = "block"
    })
    document.querySelector(".error-box").style.display="none"
    
    document.querySelector(".logOut").style.display="none"
}

document.querySelector("#logout-btn").addEventListener("click",logout)


//Listens for token request from background
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message == 'token') {
//         let data = {
//             token : ""
//           }
//         for (let i = 0; i < document.cookie.split(";").length; i++) {
//             if(document.cookie.split(";")[i].split("=")[0].trim()=="token"){
//                 data.token = document.cookie.split(";")[i].split("=")[1].trim()
//             }
//         }
//         sendResponse(data)
//     }
// })
