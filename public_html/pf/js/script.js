$(function(){
    // wow event
    new WOW().init();



    function skillsEvent(){
        var skillsHeight = $('.skills').height()
        $('.skills').css({
            marginTop : - skillsHeight / 2
        })
    }

    skillsEvent();

    window.onresize = function() {
        skillsEvent();
    };
        // menu event
    $('.menu').mouseenter(function(){
        $('.gnb').addClass('on');
        if($('.gnb').hasClass('on')){
            $('.menu-btn').children('span').animate({width: "100%"},100);
        }
    });
    $('.menu').mouseleave(function(){
        $('.gnb').removeClass('on');
        if(!$('.gnb').hasClass('on')){
            $('.menu-btn').children('span.menu_btn_middle').animate({width: "80%"},100);
            $('.menu-btn').children('span.menu_btn_bottom').animate({width: "60%"},100);
        }
        $('.gnb a').siblings().removeClass('on');
    });
    $('.gnb a').mouseenter(function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    // mousewheel scroll event
    var pages = [];
    var cScrollTop = 0;
    var index = 0;
    var check = 0;

    function movement(delta,time){
        //이벤트 조건에 따른 에니메이션
        if(delta > 0 ){
            console.log('올리기');

            $('body, html').animate({
                scrollTop : pages[index-1]
            },time,'swing');
            check = 1;
            setTimeout(function(){
                playWheel();
                check = 0;
            },time)
        }else if(delta < 0 ){
            console.log('내리기');
            $('body, html').animate({
                scrollTop : pages[index+1]
            },time,'swing');
            check = 1;
            setTimeout(function(){
                check = 0;
                playWheel();
            },time)
        }
    }
    function blockWheel(){
        jQuery(window).on("mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll", function(e) {
            e.preventDefault();
            return;
        });
        jQuery(window).on("keydown.disableScroll", function(e) {
            var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
            for (var i = 0; i < eventKeyArray.length; i++) {
                if (e.keyCode === eventKeyArray [i]) {
                    e.preventDefault();
                    return;
                }
            }
        });
    }
    function playWheel(){
        jQuery(window).off(".disableScroll");
    }

    $('.pages').each(function(i,e){
        pages.push($(e).offset().top);
    });

    $(window).scroll(function(){
        cScrollTop = $(window).scrollTop();
    });

    $("html, body").on('mousewheel DOMMouseScroll', function(e) {
        // console.log(cScrollTop , pages);
        //index 구하기
        if(cScrollTop == pages[0]) index = 0;
        if(cScrollTop == pages[1]) index = 1;

        // console.log(index)

        //이벤트 확인 & 변수 통일
        var E = e.originalEvent;
        delta = 0;
        if (E.detail) {
            delta = E.detail * -40;
        }else{
            delta = E.wheelDelta;
        }

        // console.log(check)
        if(check == 0 && !(index == 1 && delta < 0 )  ){
            movement(delta,700);
            blockWheel();
        }

    });
    $('.gnb a.gnb_works').click(function(e){
        index = 1;
        $('body, html').animate({
            scrollTop : pages[index]
        },700,'swing');
        check = 1;
        setTimeout(function(){
            check = 0;
            playWheel();
        },700)
    })
})
