let loginId = document.querySelector("#userId")
let loginPw = document.querySelector("#userPw")
// let inputEnter = document.getElementsByTagName("input")
let inputEnter = document.querySelectorAll("input")

loginId.focus();

document.querySelector("#loginBtn").addEventListener("click", () => {
    let member = JSON.parse(localStorage.getItem(loginId.value));
    if(member !== null && member.at(1) === loginPw.value){
        let currentMem = JSON.stringify([loginId.value, loginPw.value])
        sessionStorage.setItem("currentMember", currentMem)
        alert(`${member[3]}님 환영합니다.`)
        location.href = "loginMain.html"
    }else{
        loginMsg("아이디 혹은 비밀번호를 확인해주세요.")
        inputEnter[0].value = "";
        inputEnter[1].value = "";
    }
})

function loginMsg(message){
    document.querySelector("#loginMessage").style.display = "block"
    document.querySelector("#loginMessage").textContent = message
    document.querySelector("#loginMessage").style.marginBottom = "15px"
}

document.querySelector("#openPopup").addEventListener("click", () => {
    window.open("findPw.html", "popup", "width=600, height=200")
})

// inputEnter.addEventListener("keydown", (ev) => {
//     let member2 = JSON.parse(localStorage.getItem(loginId.value));
//     if(ev.key === "Enter"){
//         if(member2 !== null && member2.at(1) === loginPw.value){
//             let currentMem = JSON.stringify([loginId.value, loginPw.value])
//             sessionStorage.setItem("currentMember", currentMem)
//             alert(`${member2[3]}님 환영합니다.`)
//             location.href = "loginMain.html"
//         }else{
//             loginMsg("아이디 혹은 비밀번호를 확인해주세요.")
//             inputEnter[0].value = "";
//             inputEnter[1].value = "";
//         }
//     }
// })

// inputEnter.forEach(el => {
//     el.addEventListener("keydown", (ev) => {
//         let member2 = JSON.parse(localStorage.getItem(loginId.value));
//         if(ev.key === "Enter"){
//             if(member2 !== null && member2.at(1) === loginPw.value){
//                 let currentMem = JSON.stringify([loginId.value, loginPw.value])
//                 sessionStorage.setItem("currentMember", currentMem)
//                 alert(`${member2[3]}님 환영합니다.`)
//                 location.href = "loginMain.html"
//             }else{
//                 loginMsg("아이디 혹은 비밀번호를 확인해주세요.")
//                 el.value = "";
//             }
//         }
//     })
// })

for (let i = 0; i < inputEnter.length; i++) {
    inputEnter[i].addEventListener("keydown", ev => {
        let member2 = JSON.parse(localStorage.getItem(loginId.value));
        if(ev.key === "Enter"){
            if(member2 !== null && member2.at(1) === loginPw.value){
                let currentMem = JSON.stringify([loginId.value, loginPw.value])
                sessionStorage.setItem("currentMember", currentMem)
                alert(`${member2[3]}님 환영합니다.`)
                location.href = "loginMain.html"
            }else{
                loginMsg("아이디 혹은 비밀번호를 확인해주세요.")
                inputEnter[0].value = "";
                inputEnter[1].value = "";
                loginId.focus();
            }
        }
    })

}


