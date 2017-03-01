function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func();
    }else{
        oldonload();
        func();
    }
}

function showPic(){
    var thumbnailPane = document.getElementById("thumbnailPane");
    var detailsPic = thumbnailPane.getElementsByTagName("img");
    for(var i = 0; i < detailsPic.length; i++){
        detailsPic[i].onclick = function(){
            var itemDetail = document.getElementById("itemDetail");
            itemDetail.src = "images/" + this.title + "-detail.jpg";
            getDetails(this.title);
        }
    }
}

function createRequest(){
    if(window.XMLHttpRequest){
        request = new XMLHttpRequest();
    }
    else{
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return request;
}

function getDetails(itemName){
    request = createRequest();
    if(request == null){
        alert("Your browser can't return request");
        return;
    }
    var url = "getDetails.php?ImageID=" + escape(itemName);
    //请求对象
    request.open("GET",url,true);
    //告诉服务器对请求做出响应时要调用哪个代码
    request.onreadystatechange = displayDetails;  //函数引用，而不是函数调用，所以不用加括号
    //使用send发送请求
    request.send(null);
}

function displayDetails(){
    var description = document.getElementById("description");
    if(request.readyState == 4 && request.status == 200){
        description.innerHTML = request.responseText;
    }
}

addLoadEvent(showPic);