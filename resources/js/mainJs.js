let allPA = document.querySelectorAll(".products>a")

allPA.forEach(el => {el.addEventListener("click", () => {
    alert("로그인 후 이용가능합니다.")
})})

document.querySelector("#cart").addEventListener("click", () => {
    alert("로그인 후 이용가능합니다.")
})