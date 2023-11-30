let memberId = document.querySelector("#userId")
let memberPw = document.querySelector("#userPw")
let memberEmail = document.querySelector("#userEmail")
let memberName = document.querySelector("#userName")
let memberAds = document.querySelector("#userAds")
let memberDetailAds = document.querySelector("#userDetailAds")
let logPw = document.querySelector("#logPw")
let logId = document.querySelector("#logId")
let oneCheck = "N";
let twoCheck = "N";

// 다른 파일에 있는 함수 불러오기 실패
// import {changeMainSignup} from "./mainJs";

// 현재 Submit 구현불가..
const newMem = document.forms[0]
newMem.addEventListener("submit", (e) => {
     e.preventDefault()  // 막아주기
    // e.target.submit()   풀어주기
})

document.querySelector("#lastBtn").addEventListener("click", () => {
    // 입력하지 않은 곳은 required 처리
    // 비밀번호 정규표현식 사용

    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$]).{8,16}$/
    if(regex.test(memberPw.value) !== true){
        displayMessagePw("알파벳, 숫자, 특수문자(!@#$)를 조합해주세요")
        memberPw.focus()
        return;
    }

    // Pw 알림문 지워주기
    logPw.style.display = "none"

    if(regex.test(memberPw.value)){
        twoCheck = "Y";
    }
    let member = [memberId.value, memberPw.value, memberEmail.value, memberName.value, memberAds.value + ", " + memberDetailAds.value, "images/defaultPeople.png"]

    if(oneCheck === "N"){
        alert("아이디 중복확인을 진행해주세요")
        return;
    }

    if(oneCheck === "Y" && twoCheck === "Y" && memberEmail.value !== ""
        && memberAds.value !== "" && memberName.value !== "" && memberDetailAds.value !== ""){
        // 고객데이터를 JSON 배열로 저장
        let member = [memberId.value, memberPw.value, memberEmail.value, memberName.value, memberAds.value + ", " + memberDetailAds.value, "images/defaultPeople.png"]
        let jsonMember = JSON.stringify(member)
        localStorage.setItem(memberId.value, jsonMember)

        // 들어갔는지 확인
        let checkId = JSON.parse(localStorage.getItem(memberId.value))
        console.log(checkId)


        // 화면전환
        alert(memberName.value + "님 가입을 환영합니다!");
        location.href = "login.html";
    }



})

// 비밀번호 표현식 다를 경우 메시지 출력
function displayMessagePw(message){
    logPw.style.display = "block"
    logPw.textContent = message
    memberPw.style.marginBottom = "10px"
}


// 카카오주소 사용
document.querySelector("#adsBtn").addEventListener("click", () => {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
            }

            memberAds.value = `${addr} (${data.zonecode})`
            memberDetailAds.focus();
        }
    }).open();

})

document.querySelector("#dupBtn").addEventListener("click", () => {
    // JSON 데이터를 다시 문자열로 바꾸기
    let checkId = JSON.parse(localStorage.getItem(memberId.value))
    // 배열에서 Key 값이 존재하지 않는다면 ok
    console.log(checkId)
    if(checkId === null){
        if(memberId.value === "" || memberId.value === null){
            displayMessageId("사용할 아아디를 입력해주세요.")
            memberId.focus();
            return;
        }
        logId.style.color ="blue"
        displayMessageId("사용 가능한 아이디입니다.")
        memberPw.focus();
        // document.querySelector("#dupBtn").disabled = true;
        // document.querySelector("#dupBtn").style.cursor = "default"
        oneCheck = "Y"

    }else{
        displayMessageId("이미 존재하는 아이디입니다.")
        memberId.focus();
    }

    // 아이디 중복 관련 메시지 출력
    function displayMessageId(message){
        logId.style.display = "block"
        logId.textContent = message
        memberId.style.marginBottom = "10px"
    }



    // 배열 데이터 값 바꾸기? 배열.splice(삭제할 index, 몇개, 바꿀내용)




})