/*雷达图组件对象*/ 
var H5ComponentRadar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    // 绘制网格线 --背景层
    var w = cfg.width;
    var h = cfg.height;
    var r = w/2;
    var step = cfg.data.length;

    // 加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    
    // 计算一个圆周上的坐标（计算多边形顶点坐标）
    //已知：圆心坐标（a,b）、半径r、角度deg
    //rad = (2 * Math.PI / 360) * (360 / step) * i;
    //x = a + Math.sin( rad ) * r;
    //y = b + Math.cos( rad ) * r;
    
    // 绘制网格线
    var isBlue = false;
    for(var s = 10; s >0; s--){
        ctx.beginPath();
        for(var i = 0; i < step; i++){
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin( rad ) * r * (s/10);
            var y = r + Math.cos( rad ) * r * (s/10);

            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = ( isBlue = !isBlue ) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
    }

    // 绘制伞骨线
    ctx.beginPath();
    for(var i = 0; i < step; i++){
        var rad = (2*Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin( rad ) * r;
        var y = r + Math.cos( rad ) * r;

        ctx.moveTo(r, r);
        ctx.lineTo(x, y);

        // 绘制项目文字
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        if(x > r){
            text.css('left',x/2+5);
        }
        else{
            text.css('right',(w-x)/2+5);
        }
        if(y > r){
            text.css('top',y/2+5);
        }
        else{
            text.css('bottom',(h-y)/2+5);
        }

        component.append(text);
    }
    ctx.stroke();


    // 新建画布--数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.fillStyle = '#f00';

    var draw = function(per){
        ctx.clearRect(0, 0, w, h);

        // 输出数据的折线
        ctx.beginPath();
        for(i in cfg.data){
            var rate = cfg.data[i][1] * per;
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate;

            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#cc5858';
        ctx.stroke();

        // 输出数据点
        ctx.fillStyle = '#ff7676';
        for(i in cfg.data){
            var rate = cfg.data[i][1] * per;
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate;

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
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