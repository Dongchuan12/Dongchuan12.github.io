/*柱图组件对象*/
var H5ComponentBar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg);

    $.each(cfg.data,function(idx,item){
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');

        var bg = $('<div class="bg">');

        var width = (item[1]*100)+'%';
        name.text(item[0]);
        per.text(width);
        rate.width(width);
        if(item[2]){
            bg.css('backgroundColor',item[2]);
        };

        rate.append(bg);
        line.append(name).append(rate).append(per);
        component.append(line);
    })

    return component;
}