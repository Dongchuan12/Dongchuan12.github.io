function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func();
    }else{
        oldonload();
        func();
    }
}

function createRequest(){
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return request;
}

function initPage(){
    document.getElementById("username").onblur = checkUsername;
    document.getElementById("register").disabled = true;
}

function createRequest(){
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return request;
}

function checkUsername(){
   document.getElementById("username").className = "thinking";
   request = createRequest();
   if(request == null){
    alert("Your browser can't create request");
   }else{
    username = document.getElementById("username").value;
    var url = "checkUsername.php?username=" + escape(username);
    request.open("GET",url,true);
    request.onreadystatechange = showUsernameStatus;
    request.send(null);
   }
}

function showUsernameStatus(){
    var username = document.getElementById("username");
    var register = document.getElementById("register");
    if(request.readyState == 4 && request.status == 200){
        if(request.responseText == "okey"){
            username.className = "approve";
            register.disabled = false;
        }else{
            username.className = "denied";
            username.focus();
            username.select();
            register.disabled = true;
        }
    }
}

addLoadEvent(initPage);