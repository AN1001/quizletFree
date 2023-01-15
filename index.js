//eraseCookie("AllFC")
var currentFlashCard = 0;
var flashCardLen = 0;
var frontFaceVisible = true;
var data;

if(!getCookie("AllFC")){
    setCookie("AllFC",null);
}
const addBtn = document.getElementById("addSet")
const newSet = document.getElementById("newSet")
const addBtn2 = document.getElementById("confirmAdd")
const sidebar = document.getElementById("sidebar1")
const flashCards = document.getElementById("flashCards")
const flashCard = document.getElementById("flashCard")
const flashCardsName = document.getElementById("flashCardsName")


const fcF = document.getElementById("fcF")
const fcB = document.getElementById("fcB")

const prev = document.getElementById("prev")
const next = document.getElementById("next")

newSet.style.display = "none";
flashCards.style.display = "none";

console.log(getCookie("AllFC").split("`"))
getCookie("AllFC").split("`").forEach(function(element){
    if(element){
        el = element.split(",")
        let x = document.createElement("div")
        x.classList.add("set")
        x.id = el;
        x.textContent = el[0].length>10?el[0].slice(0,8)+"...":el[0]
        x.addEventListener("click", function(e){
            showFlashCards(e.target)
        });
        console.log(el[0])
        sidebar.appendChild(x)
    }
});

addBtn.addEventListener("click", function(){
    newSet.style.display = "flex";
    flashCards.style.display = "none";
});

prev.addEventListener("click", function(){
    console.log("clicked")
    if(currentFlashCard > 0){
        currentFlashCard-=2
        frontFaceVisible = true
        if(frontFaceVisible) flashCard.textContent = data[currentFlashCard+1]
        if(!frontFaceVisible) flashCard.textContent = data[currentFlashCard+2]
    }

    flashCard.style.display = "none";
    flashCard.style.display = "unset";
});

next.addEventListener("click", function(){
    if(currentFlashCard < flashCardLen-2){
        currentFlashCard+=2
        frontFaceVisible = true
        if(frontFaceVisible) flashCard.textContent = data[currentFlashCard+1]
        if(!frontFaceVisible) flashCard.textContent = data[currentFlashCard+2]
    }
});

addBtn2.addEventListener("click", function(){
    newSet.style.display = "none";
    let title = document.getElementById("setNameInput").value
    let fronts = fcF.value.split(",")
    let backs = fcB.value.split(",")

    //Zip two arrays
    var c = fronts.map(function(e, i) {
        return [e, backs[i]];
    });

    c.unshift(title)
    console.log(c)

    setCookie("AllFC", getCookie("AllFC")+"`"+c);
    let x = document.createElement("div")
    x.classList.add("set")
    x.textContent = title.length>10?title.slice(0,8)+"...":title
    sidebar.appendChild(x)
    console.log(getCookie("AllFC").split("`"))
    x.addEventListener("click", function(e){
        showFlashCards(e.target)
    });
    y = getCookie("AllFC").split("`")
    x.id = y[y.length - 1];
});

flashCard.addEventListener("click", function(){
    frontFaceVisible = !frontFaceVisible
    if(frontFaceVisible) flashCard.textContent = data[currentFlashCard+1]
    if(!frontFaceVisible) flashCard.textContent = data[currentFlashCard+2]
});

function showFlashCards(target){
    flashCards.style.display = "flex";
    newSet.style.display = "none";
    data = target.id.split(",");
    flashCardsName.textContent = data[0].length>25?data[0].slice(0,22)+"...":data[0]
    currentFlashCard = 0
    flashCardLen = data.length-1;
    console.log(data);
    frontFaceVisible = true
    flashCard.textContent = data[currentFlashCard+1]
}

function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (500*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}