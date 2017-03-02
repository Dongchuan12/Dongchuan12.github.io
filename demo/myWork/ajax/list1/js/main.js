//初始化函数
function initPage(){
    var thumbPic = document.getElementById("thumbnailPane").getElementsByTagName("img");
    for(var i = 0; i < thumbPic.length; i++){
        thumbPic[i].onclick = function(){
            //点击图片，改变图
            var src = "images/" + this.title + "-detail.jpg";
            document.getElementById("itemDetail").setAttribute("src", src);
            getDetails(this.title);
        }
    }
}

function getDetails(itemName){
    request = createRequest();
    if(request == null){
        alert("Unable create request");
        return;
    }else{
        var url = "getDetails.php?ImageID=" + escape(itemName);
        request.open("GET",url,true);
        request.onreadystatechange = displayDetails;
        request.send(null);
    }
}

function displayDetails(){
    if(request.readyState == 4 && request.status == 200){
        //获取descriptionDIV
        var detailsDiv = document.getElementById("description");
        //清除div中的子元素，因为再次点击需要重新加载所有子元素
        //从最后一个元素开始清除
        for(var i = detailsDiv.childNodes.length; i > 0; i--){
            detailsDiv.removeChild(detailsDiv.childNodes[i-1]);
        }
        //获取服务器返回文本
        var itemDetail = eval("("+ request.responseText +")");
        for(var property in itemDetail){
            var propertyValue = itemDetail[property];
            if(!isArray(propertyValue)){
                var p = document.createElement("p");
                p.appendChild(document.createTextNode(property + ":" + propertyValue));
                detailsDiv.appendChild(p);
            }else{
                var p = document.createElement("p");
                p.appendChild(document.createTextNode(property + ":"));
                var list = document.createElement("ul");
                for(var i = 0; i < propertyValue.length; i++){
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.setAttribute("src", propertyValue[i]);
                    a.appendChild(document.createTextNode(propertyValue[i]));
                    li.appendChild(a);
                    list.appendChild(li);
                }
                detailsDiv.appendChild(p);
                detailsDiv.appendChild(list);
            }
        }
    }
}
//判断是否为数组
function isArray(arg){
    if (typeof arg == 'object') {
        var criteria = arg.constructor.toString().match(/array/i);
        return (criteria != null);
      }
    return false;
}

addLoadEvent(initPage);