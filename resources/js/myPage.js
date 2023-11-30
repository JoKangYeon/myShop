// 현재 로그인한 계정정보
let currentKey = JSON.parse(sessionStorage.getItem("currentMember"))[0]
let currentUser = JSON.parse(localStorage.getItem(currentKey))
// console.log(currentKey)
// console.log(currentUser)



document.querySelector("#backBtn").addEventListener("click", () => {
    location.href = "loginMain.html"
})

document.querySelector("#changeBtn").addEventListener("click", () => {
    // 바뀐 이름
    currentUser[3] = document.querySelector("#currentName").value

    if(document.querySelector("#currentEmail").value.includes("@")){
        currentUser[2] = document.querySelector("#currentEmail").value
        localStorage.setItem(currentKey, JSON.stringify(currentUser))
        alert("변경되었습니다.")
        location.href = "loginMain.html"
    }else{
        alert("이메일 형식은 @를 포함해야합니다.")
    }





})

// 각각의 값 채워주기 (현재 로그인 정보로)
document.querySelector("#currentName").value = currentUser[3]
document.querySelector("#currentId").textContent = currentUser.at(0)
document.querySelector("#currentEmail").value = currentUser.at(2)
document.querySelector("#currentAddress").textContent = currentUser.at(4)
// if(currentUser.at(5) !== null){
    document.querySelector("#selectedImage").src = currentUser.at(currentUser.length-1)
// }else{
//     document.querySelector("#selectedImage").src = "images/defaultPeople.png"
// }
// console.log(currentUser)


function changeName(){
    document.querySelector("#currentName").readOnly = false;
    document.querySelector("#currentName").addEventListener("blur", () =>{
        document.querySelector("#currentName").readOnly = true;
    });
}


function changeEmail(){
    document.querySelector("#currentEmail").readOnly = false;
    document.querySelector("#currentEmail").addEventListener("blur", () =>{
        document.querySelector("#currentEmail").readOnly = true;
    });
}

// 비밀번호 바꾸기 팝업
function changePw(){
    window.open("changePw.html", "popup", "width=600, height=200")
}

function displayImage() {
    const fileInput = document.getElementById('fileInput');
    const selectedImage = document.getElementById('selectedImage');

    const file = fileInput.files[0];
    console.log(file)

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            currentUser[5] = (selectedImage.src)  // 처음에 이미지배열을 안만들어서 일단 추가하는 형태
            localStorage.setItem(currentKey, JSON.stringify(currentUser))
        };

        reader.readAsDataURL(file);



        // Clear the file input value to allow selecting the same file again
        fileInput.value = '';
    } else {
        alert('이미지를 선택해주세요.');
    }
}

document.getElementById('fileInput').addEventListener('change', displayImage);





