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
    try{
        request = new XMLHttpRequest();
    }catch(tryMS){
        try{
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(failed){
            request = null;
        }
    }
    return request;
}
