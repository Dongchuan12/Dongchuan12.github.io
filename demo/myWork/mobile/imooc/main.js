/* 
* @Author: anchen
* @Date:   2016-10-16 17:37:30
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-16 20:39:34
*/

console.log("lala");
window.onload=function(){
    var page1=document.getElementById("page1");
    var page2=document.getElementById("page2");
    var page3=document.getElementById("page3");

    var music=document.getElementById("music");
    var audio=document.getElementsByTagName("audio")[0];

    // music.addEventListener("ended",function(event){
    //     audio.setAttribute("autoplay","false");
    // },false);
    
    music.onclick=function(){
        if(audio.paused){
            audio.play();
            this.setAttribute("class","play");
            // this.style.animationPlayState="running";
        }
        else{
            audio.pause();
            this.setAttribute("class", "");
            // this.animationPlayState="paused";
        }
    };
    //设置当触动page1是所调用的函数
    page1.addEventListener("touchstart",function(){
        page1.style.display="none";
        page2.style.display="block";
        page3.style.display="block";
        page3.style.top="100%";
        //因为在fadeIn里面设置top为-100%

        setTimeout(function(){
            page2.setAttribute("class", "page fadeOut")
            page3.setAttribute("class", "page fadeIn")
        }, 5500)
    },false);

    
}