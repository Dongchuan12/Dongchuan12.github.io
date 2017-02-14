$(function(){
    $('#main_box').fullpage({
        sectionsColor:['#1bbc9b','#1889C5','#7BAABE','#91B493'],
        anchors:['page1','page2','page3','page4'],
        menu:"#menu",
        afterRender:function(){
            $('.section1 h1, .section1 p').hide();
            $('.section1 h1, .section1 p').fadeIn(2000);
        },
        afterLoad:function(anchorLink, index){
            if(index == 2){
                $('.section2').find('h1').fadeIn(2000);
                $('.personal_detail').animate({marginLeft:'20%'},1000);
                $('.personal_skills').animate({marginLeft:'50%'},1000);
            }
            if(index == 3){
                $('.section3 h1').fadeIn(2000);
                $('.inter').fadeIn(2000);
            }
            if(index == 4){
                $('.section4 h1').fadeIn(2000);
                $('.section4 h3').delay(1000).animate({marginTop:'50px'},1000);
            }
        },
        onLeave:function(index,direction){
            if(index == 2){
                $('.section2').find('h1').fadeOut(2000);
                $('.personal_detail').animate({marginLeft:'-100%'},1000);
                $('.personal_skills').animate({marginLeft:'150%'},1000);
            }
            if(index == 3){
                $('.section3 h1').fadeOut(2000);
                $('.inter').fadeOut(2000);
            }
            if(index == 4){
                $('.section4 h1').fadeOut(2000);
                $('.section4 h3').delay(1000).animate({marginTop:'100%'},1000);
            }
        }
    });
})