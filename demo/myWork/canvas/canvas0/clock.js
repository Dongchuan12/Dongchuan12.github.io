/* 
* @Author: anchen
* @Date:   2016-10-11 20:59:46
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-11 22:46:42
*/
console.log("lala");
//定义全局变量
var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;

//背景
function drawBackground()
{
    //画背景圆环
    ctx.save();
    ctx.translate(r, r);//重新定位起始点
    ctx.beginPath();
    ctx.lineWidth=10;//定义宽度
    ctx.arc(0, 0, r-5,0, 2*Math.PI,false);
    ctx.stroke();

    //画小时数
    var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];//定义小时数组
    //定义数字样式
    ctx.font="18px Arial";
    ctx.textAlign="center";//文本水平对齐
    ctx.textBaseline="middle";//当前绘制文本的基线为middle
    //遍历小时数组
    hourNumbers.forEach(function(number,i){
        var rad=2*Math.PI/12*i;
        var x=Math.cos(rad)*(r-30);
        var y=Math.sin(rad)*(r-30);
        ctx.fillText(number, x, y);
    });
    //画点
    //遍历60个点
    for(var i=0;i<60;i++)
    {
        var rad=2*Math.PI/60*i;
        var x=Math.cos(rad)*(r-18);
        var y=Math.sin(rad)*(r-18);
        ctx.beginPath();
        if(i%5===0)
        {
            ctx.fillStyle="#333";
            ctx.arc(x, y, 2, 0, 2*Math.PI,false);
        }
        else
        {
            ctx.fillStyle="#ccc";
            ctx.arc(x, y, 2, 0, 2*Math.PI,false);
        }
        
        ctx.fill();
    }
}

function drawHour(hour,minute)
{
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/12*hour;
    var mrad=2*Math.PI/12/60*minute;
    ctx.rotate(rad+mrad);
    ctx.lineWidth=6;
    ctx.lineCap="round";
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -r/2);
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute)
{
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*minute;
    ctx.rotate(rad);
    ctx.lineWidth=4;
    ctx.lineCap="round";
    ctx.moveTo(0,10);
    ctx.lineTo(0,-r+40);
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second)
{
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.fillStyle="#d14543";
    ctx.moveTo(-2, 20);
    ctx.lineTo(2,20);
    ctx.lineTo(1, -r+20);
    ctx.lineTo(-1, -r+20);
    ctx.fill();
    ctx.restore();
}

function drawDot()
{
    ctx.beginPath();
    ctx.fillStyle="#fff";
    ctx.arc(0,0,2,0,2*Math.PI,false);
    ctx.fill();
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    var now=new Date();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

setInterval(draw, 1000);