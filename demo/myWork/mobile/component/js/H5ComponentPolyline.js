/*折线图组件对象*/ 
var H5ComponentPolyline = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    var w = cfg.width;
    var h = cfg.height;

    // 创建背景层画布
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    window.ctx = ctx;
    // 添加网格线
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#333';

    var step = 10;
    // 水平网格线
    for( i=0; i < step+1; i++ ){
        var y = h/step * i;
        ctx.moveTo(0,y);
        ctx.lineTo(w, y);
    }
    // 垂直网格线 根据项目个数来分
    var step = cfg.data.length + 1;
    var text_w = w/step >> 0;
    for( i = 0; i < step + 1; i++){
        var x = w/step * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x,h);

        if( cfg.data[i] ){
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2).css('left',(x - text_w/2)/2 + text_w/2);

            component.append(text);
        }
    }
    ctx.stroke();

    // 新建数据层画布
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var draw = function(per){

        // 清空画布
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff5858';

        var x = 0;
        var y = 0;


        // 画点
        var row_w = ( w / (cfg.data.length + 1));
        for( i in cfg.data ){
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - h * item[1] *per;
            ctx.moveTo(x, y);
            ctx.arc(x,y,5,0,2*Math.PI);
        }
        // 连线
        // 移动画笔到第一个数据点的位置
        ctx.moveTo(row_w, h-(h*cfg.data[0][1] * per));
        for( i in cfg.data ){
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - h * item[1] * per;
            ctx.lineTo(x,y);
        }
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0)";

        // 画阴影
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle = 'rgba(255,136,125,0.4)';
        ctx.fill();

        // 写数据
        for( i in cfg.data ){
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - h * item[1] * per;

            ctx.fillStyle = item[2] ? item[2] : '#595959';

            ctx.fillText( ( (item[1]*100) >>0 )+'%', x-10, y-10);
        }
        ctx.stroke();
    }    


    component.on('onLoad',function(){
        var s = 0;
        for( i=0; i < 100; i++){
            setTimeout(function(){
                s = s + 0.01;
                draw(s);
            }, i*10 + 500);
        }
    });
    component.on('onLeave',function(){
        var s = 1;
        for( i=0; i < 100; i++){
            setTimeout(function(){
                s = s - 0.01;
                draw(s);
            }, i*10);
        }
    });
    
    return component;
}