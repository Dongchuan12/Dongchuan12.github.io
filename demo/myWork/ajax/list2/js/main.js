//定义全局变量
var userName = document.getElementById("username");
var password1 = document.getElementById("password1");
var password2 = document.getElementById("password2");
var register = document.getElementById("register");

var usernameValid = false;
var passwordValid = false;
//初始化函数initPage
function initPage(){
    userName.onblur = checkUsername;
    password2.onblur = checkPassword;
    register.disabled = true;
    register.onclick = registerUser;
}

function checkUsername(){
    //失焦时的classs属性
    userName.className = "thinking";
    //调用createRequest函数创建一个新的对象
    usernameRequest = createRequest();
    if(usernameRequest == null){
        alert("Unable to create request");
    }else{
        //获取当前用户键入值
        var username = userName.value;
        //将用户键入值追加到url中，escape用于清理键入值，防止有空格或问号等符号
        var url = "checkName.php?username=" + escape(username);
        usernameRequest.open("GET",url,true);
        //回调函数
        usernameRequest.onreadystatechange = showUsernameStatus;
        usernameRequest.send(null);
    }
}

function showUsernameStatus(){
    if(usernameRequest.readyState == 4 && usernameRequest.status == 200){
        if(usernameRequest.responseText == "okay"){
            userName.className = "approved";
            usernameValid = true;
        }else{
            userName.className = "denied";
            userName.focus();
            userName.select();
            usernameValid = false;
        }
        checkFormStatus();
    }
}
//password判断
function checkPassword(){
    password2.className = "thinking";
    if(password1.value == "" || (password2.value != password1.value)){
        password2.className = "denied";
    }else{
        passwordRequest = createRequest();
        if(passwordRequest == null){
            alert("Unable to create request");
        }else{
            //获取当前用户键入值
            var password = password2.value;
            //将用户键入值追加到url中，escape用于清理键入值，防止有空格或问号等符号
            var url = "checkPassword.php?password=" + escape(password);
            passwordRequest.open("GET",url,true);
            //回调函数
            passwordRequest.onreadystatechange = showPasswordStatus;
            passwordRequest.send(null);
        }
    }
}
//根据服务器返回状态设置相关class属性
function showPasswordStatus(){
    if(passwordRequest.readyState == 4 && passwordRequest.status == 200){
        if(passwordRequest.responseText == "okay"){
            password2.className = "approved";
            passwordValid = true;
        }else{
            password2.className = "denied";
            password2.focus();
            password2.select();
            passwordValid = false;
        }
        //检查相关状态
        checkFormStatus();
    }
}
//监视器函数，可以监视两个请求对象的返回值
function checkFormStatus(){
    if(usernameValid && passwordValid){
        register.disabled = false;
    }else{
        register.disabled = true;
    }
}

//向服务器发送一个异步请求并配置这个对象的属性
function registerUser(){
    register.value = "Processing...";
    registerRequest = createRequest();
    if(registerRequest == null){
        alert("Unable to create request");
    }else{
        var url = "register-feedback.php";
        //定义需要传输的数据
        var requestData = "username="+
        escape(document.getElementById("username").value) + "&password=" +
        escape(document.getElementById("password1").value) + "&firstname=" + 
        escape(document.getElementById("firstname").value) + "&lastname=" + 
        escape(document.getElementById("lastname").value) + "&email=" + 
        escape(document.getElementById("email").value) + "&genre=" + 
        escape(document.getElementById("genre").value) + "&favorite=" + 
        escape(document.getElementById("favorite").value) + "&tastes=" +
        escape(document.getElementById("tastes").value);
        //POST可用来向服务器发送大量数据
        //需要通过表单POST数据，使用setRequestHeader()来添加HTTP头，最后在send中规定希望发送的数据
        registerRequest.open("POST",url,true);
        //回调函数
        registerRequest.onreadystatechange = registrationProcessed;
        registerRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        registerRequest.send(requestData);
    }
}
//回调函数，成功返回则将php文件显示在wrapper内
function registrationProcessed(){
    if(registerRequest.readyState == 4 && registerRequest.status == 200){
        document.getElementById("wrapper").innerHTML = registerRequest.responseText;
    }
}



addLoadEvent(initPage);
