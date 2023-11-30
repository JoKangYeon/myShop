
function makeOrder(){
    let currentKey = JSON.parse(sessionStorage.getItem("currentMember"))[0]
    let currentUser = JSON.parse(localStorage.getItem(currentKey))
    let orderList = JSON.parse(localStorage.getItem("buyList"))
    let total = JSON.parse(localStorage.getItem("totalPrice"))

    let firstBox = document.querySelector("#firstBbox")
    let secondBox = document.querySelector("#secondBbox")
    let thirdBox = document.querySelector("#thirdBbox")
    let fourthBox = document.querySelector("#fourthBbox")
    // let fifthBox = document.querySelector("#fifthBbox")

    console.log(orderList)

    let totalCount = 0;
    for (let i = 0; i < orderList.length; i++) {
        let count = parseInt(orderList[i].prodCount)
        totalCount += count
    }

    firstBox.textContent = `주문자: ${currentUser[3]} 님`
    secondBox.textContent = `배송지: ${currentUser[4]}`
    thirdBox.textContent =  `구매목록: ${orderList[0].product} 외 ${totalCount - 1}건`
    let change = (parseInt(total) / 1000) + ",000"
    fourthBox.textContent = `Total Price: KRW ${change}`

}

function orderComplete(){
    // 쇼핑백 비워주기
    localStorage.removeItem("shoppingList")
    localStorage.removeItem("buyList")
}