
function editMemo(event){
    console.log(event.target);

}



function displayMemo(memo){
    const ul = document.querySelector("#memo-ul");
    
    const li = document.querySelector("li");// list 안에 텍스트를 넣어줌
    li.innerText = `[id:${memo.id}] ${memo.content}`;
    
    const editBtn = document.createElement("button");
    editBtn.innerText = "수정하기"; //버튼이름
    editBtn.addEventListener("click", editMemo);
    editBtn.dataset.id = memo.id;

    ul.appendChild(li); //list 추가
    li.appendChild(editBtn);
}

async function readMemo(){
    const res = await fetch('/memos'); //읽어오는거라 get 사용
    const jsonRes = await res.json();
    //jsonRes = [{id:123,contetnt ='블라블라'}]
    //["a","b","c"].forEach(func); //forEach는 a에 대해 func함수를 실행, b에대해 func함수를 실행, c에대해 func 함수를 실행
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = ""; //내부 초기화
    jsonRes.forEach(displayMemo);
}

// 서버한테 메모를 보내는 요청
async function createMemo(value){
    const res = await fetch("/memos",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
        }),
    }); //메모를 추가해달라는 거라 POST해야함
    readMemo();
}


//메모를 생성하는 과정
function handleSubmit(event){
    event.preventDefault(); //콘솔로그에 깜빡이는 것을 막아줌
    const input = document.querySelector("#memo-input");//input에 있는 값을 가져와야함
    createMemo(input.value); //input에 있는 value값을 가져옴
    input.value = ""; //input에 입력한 값을 없애줌
}

const form = document.querySelector('#memo-form');
form.addEventListener("submit",createMemo); //값이 제출되었을 때 발생하는 이벤트

readMemo();