$(function(){
    $('#main_box').fullpage({
        sectionsColor:['#7bc3d1','#f6f6f6','#7BAABE','#7bc3d1','#91B493'],
        anchors:['page1','page2','page3','page4','page5'],
        menu:"#menu",
        afterRender:function(){
            $('.section1 h1, .section1 p').hide();
            $('.section1 h1, .section1 p').fadeIn(2000);
        },
        afterLoad:function(anchorLink, index){
            if(index == 3){
                $("#html").circleProgress({
                    value:0.9,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });

                $("#css").circleProgress({
                    value:0.85,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });

                $("#js").circleProgress({
                    value:0.8,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });

                $("#jq").circleProgress({
                    value:0.75,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });

                $("#ps").circleProgress({
                    value:0.7,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });

                $("#aj").circleProgress({
                    value:0.65,
                    size:120,
                    startAngle:-0.5 * Math.PI,
                    fill:{
                        gradient:["#000","#444"]
                    }
                });
            }
            if(index == 5){
                $('.section5 h1').fadeIn(2000);
                $('.section5 h3').delay(1000).animate({marginTop:'50px'},1000);
            }
        },
    });
})