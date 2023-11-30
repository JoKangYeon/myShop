function deleteCurrentStorage(){
    sessionStorage.clear()
    localStorage.removeItem("shoppingList")
    localStorage.removeItem("buyList")
}


let allPA = document.querySelectorAll(".products>a")
let firstP = document.querySelectorAll(".products>a>p:nth-child(1)")



allPA.forEach(el => {el.addEventListener("click", (ele) => {
    let prodImage = el.querySelector(".prodImage").src
    // console.log(prodImage)
    let prodName = el.querySelector(".prodName").textContent
    // console.log(prodName)
    let prodPrice = el.querySelector(".price").textContent
    // console.log(prodPrice)
    let currentProd = JSON.stringify([prodImage, prodName, prodPrice])
    sessionStorage.setItem("clickedProd", currentProd)
    location.href = "product.html"
})})

function sorryMsg() {
    alert("현재 준비중인 서비스입니다.")
}
