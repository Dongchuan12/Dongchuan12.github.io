/*饼图组件对象*/
var H5ComponentPie = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var w = cfg.width;
    var h = cfg.height;
    var r = w/2;

    // 创建画布--背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',1);
    component.append(cns);

    // 绘制底层背景
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

    // 绘制数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',2);
    component.append(cns);

    var colors = ['green','blue','red','yellow','orange'];
    var sAngel = 1.5 * Math.PI;
    var eAngel = 0 * Math.PI;
    var aAngel = 2 * Math.PI;

    var step = cfg.data.length;
    for(var i = 0; i < step; i++){
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());

        eAngel = sAngel + aAngel * item[1];

        ctx.beginPath();
        ctx.moveTo(r, r);
        ctx.arc(r,r,r,sAngel,eAngel);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;

        // 绘制项目名称及百分比
        var text = $('<div class="text">');
        var per = $('<div class="per">');
        text.text(item[0]);
        per.text((item[1]*100)+'%');
        text.append(per);

        var x = r + Math.sin(.5*Math.PI - sAngel) * r;
        var y = r + Math.cos(.5*Math.PI - sAngel) * r;

        if(x > r){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }
        if(y > r){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }
        if(item[2]){
            text.css('color',item[2]);
        }
        component.append(text);
    }

    // 绘制蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',3);
    component.append(cns);

    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    var draw = function(per){
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.moveTo(r, r);

        if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI*per);
        }else{
            ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
        }
        ctx.fill();
        ctx.stroke();
    }

    component.on('onLoad',function(){
        var s = 0;
        for(var i = 0; i < 100; i++){
            setTimeout(function(){
                s = s + 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave',function(){
        var s = 1;
        for(var i = 0; i < 100; i++){
            setTimeout(function(){
                s = s - 0.01;
                draw(s);
            }, i*10);
        }
    });

    return component;
}