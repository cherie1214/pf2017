$(function(){
    new WOW().init();

    $('.menu').mouseenter(function(){
        $('.gnb').addClass('on');
        if($('.gnb').hasClass('on')){
            $('.menu-btn').children('span').animate({width: "100%"},100);
        }
    });

    $('.menu').mouseleave(function(){
        $('.gnb').removeClass('on');
        if(!$('.gnb').hasClass('on')){
            $('.menu-btn').children('span.middle').animate({width: "80%"},100);
            $('.menu-btn').children('span.bottom').animate({width: "60%"},100);
        }
        $('.gnb a').siblings().removeClass('on');
    });

    $('.gnb a').mouseenter(function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
})
