const priceBox = document.querySelector(".priceBox")


// 현재 클릭된 상품 정보를 세션 스토리지에서 파싱
const currentProduct = JSON.parse(sessionStorage.getItem("clickedProd"))

// 상품 페이지의 내용을 설정하는 함수
function setProdPage() {
    document.querySelector("#prodImg").src = currentProduct[0]
    document.querySelector("#productName").textContent = currentProduct[1]
    document.querySelector("#productPrice").textContent = currentProduct[2]
}

// 쇼핑 리스트에 상품을 추가하는 함수
function addList() {
    const myList = JSON.parse(localStorage.getItem("shoppingList")) || []

    let imgUrl = currentProduct[0]
    let prodName = currentProduct[1]
    let prodPrice = currentProduct[2]

    // 이미 추가된 상품인지 확인
    for (let i = 0; i < myList.length; i++) {
        if (myList[i].prodName === prodName) {
            myList[i].cnt = myList[i].cnt + 1
            // 로컬에 다시 덮어주기
            localStorage.setItem("shoppingList", JSON.stringify(myList))
            console.log(myList[i].cnt)

            alert("쇼핑백에 상품이 담겼습니다.");

            return;
        }
    }

    myList.push({ "imgUrl": imgUrl, "prodName": prodName, "prodPrice": prodPrice, "cnt": 1 })

    localStorage.setItem("shoppingList", JSON.stringify(myList))

    alert("쇼핑백에 상품이 담겼습니다.");
}

function buyNow() {
    const nowBuy = JSON.parse(localStorage.getItem("shoppingList")) || []

    let imgUrl = currentProduct[0]
    let prodName = currentProduct[1]
    let prodPrice = currentProduct[2]

    // 이미 추가된 상품인지 확인
    for (let i = 0; i < nowBuy.length; i++) {
        if (nowBuy[i].prodName === prodName) {
            nowBuy[i].cnt = nowBuy[i].cnt + 1
            // 로컬에 다시 덮어주기
            localStorage.setItem("shoppingList", JSON.stringify(nowBuy))
            console.log(nowBuy[i].cnt)
            location.href = "shoppingBag.html"
            return;
        }
    }

    nowBuy.push({ "imgUrl": imgUrl, "prodName": prodName, "prodPrice": prodPrice, "cnt": 1 })

    localStorage.setItem("shoppingList", JSON.stringify(nowBuy))

    location.href = "shoppingBag.html"


}

// 쇼핑 카트에 상품 목록을 표시하는 함수
function setCart() {
    const main = document.getElementById("midInBox")
    let userList = JSON.parse(localStorage.getItem("shoppingList"))
    for (let i = 0; i < userList.length; i++) {
        // 각 상품을 나타내는 div 요소 생성
        let divBox = document.createElement("div")
        divBox.style.display = "flex"
        divBox.style.flexDirection = "column"
        divBox.style.width = "22%"
        divBox.style.padding = "3px"
        divBox.style.height = "50%"
        divBox.style.marginRight = "50px"

        // 첫 번째 상자에 이미지 추가
        let firstBox = document.createElement("div")
        firstBox.style.width = "100%"
        firstBox.style.height = "80%"
        firstBox.style.display = "flex"
        firstBox.style.alignItems = "center"
        firstBox.style.justifyContent = "center"
        let imgBox = document.createElement("img")
        imgBox.style.width = "80%"
        imgBox.style.height = "80%"
        imgBox.src = userList[i].imgUrl
        firstBox.append(imgBox)

        // 두 번째 상자에 상품 이름과 가격 추가
        let secondBox = document.createElement("div")
        secondBox.style.width = "100%"
        secondBox.style.height = "10%"
        secondBox.style.textAlign = "center"
        secondBox.textContent = userList[i].prodName + " / " + userList[i].prodPrice

        // 세 번째 상자에 체크박스, 라벨, 셀렉트 박스 추가
        let thirdBox = document.createElement("div")
        thirdBox.style.width = "100%"
        thirdBox.style.height = "10%"
        thirdBox.style.textAlign = "center"
        thirdBox.style.display = "flex"
        thirdBox.style.alignItems = "center"
        thirdBox.style.justifyContent = "center"
        let checkBox = document.createElement("input")
        let labelBox = document.createElement("label")
        let selectBox = document.createElement("input")
        thirdBox.append(selectBox)
        thirdBox.append(checkBox)
        thirdBox.append(labelBox)
        selectBox.style.width = "50px"
        selectBox.style.height = "25px"
        selectBox.type = "number"
        console.log(userList[i])
        selectBox.value = userList[i].cnt
        selectBox.min = "1"
        selectBox.id = userList[i].prodName + "1"
        selectBox.addEventListener("change", () => {
            userList[i].cnt = selectBox.value
            localStorage.setItem("shoppingList", JSON.stringify(userList))
            getTotal()

        } )

        // // 1부터 10까지의 옵션을 셀렉트 박스에 추가
        // for (let j = 0; j < 10; j++) {
        //     let option = (document.createElement("option"))
        //     option.textContent = (j + 1) + ""
        //     option.value = (j + 1) + ""
        //     selectBox.appendChild(option)
        // }

        checkBox.type = "checkbox"
        checkBox.checked = true
        checkBox.style.width = "15px"
        checkBox.style.height = "15px"
        checkBox.id = userList[i].prodName
        checkBox.addEventListener("click", () => {
            getTotal()
        })
        checkBox.name = userList[i].prodName
        labelBox.textContent = "추가하기"
        labelBox.style.fontSize = "20px"
        labelBox.htmlFor = userList[i].prodName

        // 상자들 메인에 추가
        divBox.append(firstBox, secondBox, thirdBox)
        main.append(divBox)
    }
    // 총 가격 업데이트
    getTotal()
}

// 선택된 상품들의 총 가격을 계산하는 함수
function getTotal() {
    let selectedList = JSON.parse(localStorage.getItem("shoppingList")) || []

    // 선택된 상품들 토탈 가격
    let totalPrice = 0;
    for (let i = 0; i < selectedList.length; i++) {
        let name = selectedList[i].prodName;
        let selectId =  document.getElementById(name)
        let priceCnt = document.getElementById(name + "1")

        if (selectId.checked) {
            // 숫자 이외에 다 제거하고 가격을 더함
            let price = parseInt(selectedList[i].prodPrice.replace(/[^0-9]/g, ""))
            let sumPrice = priceCnt.value * price
            const sumA = priceCnt.value
            totalPrice += sumPrice;

        }
    }
    // 총 가격을 화면에 업데이트
    priceBox.textContent = 'Total Price: KRW ' + totalPrice;
    // 총 가격을 로컬에 저장
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
}





let selectedList = JSON.parse(localStorage.getItem("shoppingList"))

document.querySelector("#selectAllBtn").addEventListener("click", () => {

    console.log(selectedList.length)
    for (let i = 0; i < selectedList.length; i++) {
        let name = selectedList[i].prodName;
        let selectId =  document.getElementById(name)
        if(!selectId.checked){
            selectId.checked = true;
        }

    }
    getTotal()
})




document.querySelector("#buyBtn").addEventListener("click", () => {
    let selectedList = JSON.parse(localStorage.getItem("shoppingList")) || []
    for (let i = 0; i < selectedList.length; i++) {
        let name = selectedList[i].prodName;
        let selectId = document.getElementById(name)
        let priceCnt = document.getElementById(name + "1")
        if (selectId.checked) {
            let price = parseInt(selectedList[i].prodPrice.replace(/[^0-9]/g, ""))
            const sumA = priceCnt.value

            // 로컬에 저장
            const product1 = name;
            const prodPrice2 = selectedList[i].prodPrice.replace(/[^0-9]/g, "")
            const prodCount3 = sumA

            const orderList = JSON.parse(localStorage.getItem("buyList")) || []
            orderList.push( {"product" : product1, "prodPrice" : prodPrice2, "prodCount" : prodCount3} )
            localStorage.setItem("buyList", JSON.stringify(orderList))

        }

    }







    location.href = "buyPage.html"
})









