//eraseCookie("AllFC")
if(!getCookie("AllFC")){
    setCookie("AllFC",null);
}
const addBtn = document.getElementById("addSet")
const newSet = document.getElementById("newSet")
const addBtn2 = document.getElementById("confirmAdd")
const sidebar = document.getElementById("sidebar1")

const fcF = document.getElementById("fcF")
const fcB = document.getElementById("fcB")

newSet.style.display = "none";

console.log(getCookie("AllFC").split("`"))
getCookie("AllFC").split("`").forEach(function(element){
    if(element){
        el = element.split(",")
        let x = document.createElement("div")
        x.classList.add("set")
        x.id = el;
        x.textContent = el[0].length>10?el[0].slice(0,7)+"...":el[0]
        x.addEventListener("click", function(){
            newSet.style.display = "none";
        });
        console.log(el[0])
        sidebar.appendChild(x)
    }
});

addBtn.addEventListener("click", function(){
    newSet.style.display = "flex";
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
    x.textContent = c[0].length>11?c[0].slice(0,10)+"...":c[0]
    sidebar.appendChild(x)
    x.id = el;
    console.log(getCookie("AllFC").split("`"))
    x.addEventListener("click", function(){
        newSet.style.display = "none";
    });
});

function showFlashCards(){

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