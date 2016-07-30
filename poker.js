$(function() {
    /*$('.animation')
    .delay(2000)
    .animate({width:400},1000)
    .delay(1000)
    .queue(function(){
      $(this).css({'backgroundColor':'green'}).dequeue();
    })
    .delay(1000)
    .animate({height:500},2000)

for (var i = 0; i < 100; i++) {
var b=Math.floor(Math.random()*20+100);
var w=Math.floor(Math.random()*3+5);
var left=Math.floor(Math.random()*$(document).width());
var top=Math.floor(Math.random()*$(document).height());
$('<div>')
.addClass('zidan')
.width(w)
.height(w)
.css({'backgroundColor':'rgba(50,255,'+b+',0.4)'})
.appendTo('body')
.delay(i*20)
.animate({left:left,top:top});  
};*/
     var tishi = $('.zuozi .tishi');
    var xiezi = $('.tishi .title')
    var chahao = $('.chahao')
    var queren = $('.queren')
    var delay = function() {
        tishi.css({
            'display': 'none'
        }).animate({
            opacity: 0
        })
    }
    chahao.on('click', function() {
        delay()
    })
    queren.on('click', function() {
        delay()
    })
    var warn = function() {
        tishi.css({
            'display': 'block'
        }).animate({
            opacity: 1
        })
        setTimeout(delay, 3000)
    }
    //计时器
    var $jishi = $('.time .font');
    var time = 0;
    var min = 0;
    var second = 0;
    var state;
    function jishi() {
        if (state == "over") {
            time = 0;
            min = 0;
            second = 0;
            $jishi.html("00:00");
        }
        time += 1;
        second = time % 60;
        if (time % 60 == 0) {
            min = parseInt(min);
            min += 1;
            min = (min < 10) ? '0' + min : min;
        }
        second = (second < 10) ? '0' + second : second;
        $jishi.html(min + ':' + second);
        state = "play"
    }
    var t = setInterval(jishi, 1000)
    clearInterval(t);
    // 得分
    var defen = 0;
    var $fenshu = $('.score .font');
    var fenshu = function(val) {
        $fenshu.html(val)
    }
    var star = function() {
        state = "over";
        var poker = [];
        var biao = {};
        var color = ['c', 'h', 'd', 's'];
        while (poker.length < 52) {
            /*var number=['A','2','3','4','5','6','7','8','9','T','J','Q','K'];*/
            var c = color[Math.floor(Math.random() * 4)];
            var n = Math.ceil(Math.random() * 13);
            // var item={color:c,number:n};
            if (!biao[c + '-' + n]) {
                poker.push({
                    color: c,
                    number: n
                });
                biao[c + '-' + n] = true;
            }
            ;
        }
        /*var fangpai=function(){
        $(poker).each(function(i,v){
            $('<div>').addClass('pai'+v.color).text(v.number).delay(30*i).animate({opacity:1},400).appendTo(zhuozi)
        })
    }*/
        // console.table(poker);
        var dict = {
            1: 'A',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: 'T',
            11: 'J',
            12: 'Q',
            13: 'K'
        };
        // var index=-1;
        var items = [];
        for (var i = 0, index = 0; i < 7; i++) {
            for (var j = 0; j < (i + 1); j++) {
                index += 1;
                items = poker[index];
                // d+=60;
                $('<div>').addClass('pai shang').delay(index * 100).css({
                    backgroundImage: 'url(img/' + dict[poker[index].number] + poker[index].color + '.jpg)'
                }).attr('id', i + '-' + j).data('number', items.number).animate({
                    top: 50 * i,
                    left: (6 - i) * 50 + j * 100,
                    opacity: 1
                }).appendTo('.zhuozi')
            }
            ;
        }
        ;//管理剩余的牌
        for (; index < poker.length; index++) {
            $('<div>').addClass('pai zuo').data('number', poker[index].number).delay(index * 100).css({
                backgroundImage: 'url(img/' + dict[poker[index].number] + poker[index].color + '.jpg)'
            }).animate({
                top: 460,
                left: 150,
                opacity: 1
            }).appendTo('.zhuozi')
        }
        ;//判断是否有牌
        var zhe = function(el) {
            var x = Number($(el).attr('id').split('-')[0]);
            var y = Number($(el).attr('id').split('-')[1]);
            return $('#' + (x + 1) + '-' + y).length || $('#' + (x + 1) + '-' + (y + 1)).length;
        }
        var shangyizhang = null ;
        $('.zhuozi .pai').on('click', function() {
            var arr1=[];
            var over=0;
            $('.shang').each(function(i,ele){
                if(!zhe(ele)){
                    arr1.push($(ele).data('number'));
                }
            });
            for(var i=0;i<arr1.length;i++){
                if(arr1[i]===13){
                    over+=1;
                }
                for(var j;j<arr1.length;j++){
                    if(arr1[i]+arr1[j]===13){
                        over+=0.5
                    }
                }
            }
            $('.zuo,.you').each(function(e,elem){
                if($(elem).data('number')===13){
                    over+=1;
                }
                for(var j=0;j<arr1.length;j++){
                    if(arr1[j]+$(elem).data('number')===13){
                        over+=1;
                    }
                }
            })
            if(over==0){
                xiezi.html("游戏结束")
                warn();
                againgame();
                clearInterval(t);
            }
            $('.zongpeidui .font').html(over);
            if ($(this).hasClass('shang') && zhe(this)) {
                return;
            } else {
                var pei = 0;
                var mm = $(this)
                // 判断  能够配比的数目
                $('.shang').each(function(i, ele) {
                    if (!zhe($('.shang')[i]) && ($(ele).data('number') + mm.data('number') === 13)) {
                        pei += 1;
                    }
                })
                $('.zuo,.you').each(function(e, elem) {
                    if ($(elem).data('number') + mm.data('number') === 13) {
                        pei += 1;
                    }
                })
                $('.kepeidui .font').html(pei);
                $(this).toggleClass('chulie');
                if ($(this).hasClass('chulie')) {
                    $(this).animate({
                        top: '-=30'
                    })
                } else {
                    $(this).animate({
                        top: '+=30'
                    })
                }

                 if ($(this).data('number') === 13) {
                defen+=10;
                fenshu(defen);
                $(this).animate({
                    top: 0,
                    left: 600,
                    opacity: 0
                }).queue(function() {
                    $(this).remove();
                })
                return;
            }
            if (!shangyizhang) {
                shangyizhang = $(this);
            } else {
                //点第二张牌
                if (shangyizhang.data('number') + $(this).data('number') === 13) {
                    defen+=20;
                    fenshu(defen);
                    $('.zhuozi .chulie').delay(400).animate({
                        top: 0,
                        left: 600,
                        opacity: 0,
                    }).queue(function() {
                        $(this).remove();
                    })
                } else {
                    $('.zhuozi .chulie').removeClass('chulie').animate({
                        top: '+=30'
                    })
                }
                shangyizhang = null ;
              }

            }
           
            
            //点第一张
            
        })
        //点击往右移动
        var zIndex = 0;
        $('.zhuozi .move-right').on('click', function() {
            zIndex += 1;
            $('.zhuozi .pai.zuo').eq(-1).removeClass('zuo').addClass('you').animate({
                top: 460,
                left: 460
            }).css({
                zIndex: zIndex
            })
        })
        //点击往左移动
        var cishu = 0;
        $('.zhuozi .move-left').on('click', function() {
            if ($('.zhuozi .zuo').length) {
                xiezi.html("不能点击，请等待左边牌发完！！")
               warn();
                return;
            }else{

                if (cishu > 3) {
                    xiezi.html("已超过三次，不能换牌了！！")
                   warn();
                    return;
                }else{
                    cishu+=1;
                    $('.zhuozi .you').each(function(i, el) {
                        $(this).delay(i * 30).animate({
                            top: 460,
                            left: 150
                        }).css({
                            'zIndex': 0
                        }).removeClass('you').addClass('zuo')
                    })
                }
            }
        })
    }
    //开始游戏
   
    $('.meau .startgame').on('click', function() {
        
            star()
            t = setInterval(jishi, 1000)
        
        // star();
    })
    var againgame=function(){
        $('.zhuozi .pai').remove();
    }
    $('.meau .againgame').on('click',function(){
        againgame();
        clearInterval(t);
        $jishi.html("00:00");
        $fenshu.html("0");
        t=setInterval(jishi,1000);
        star();
    })
    var dik=0;
    $('.introduce').on('click',function(){
        dik+=1;
        if(dik%2==0){

      $('.jieshao').css({'display':'block'}).show(2000);
        }else{
            $('.jieshao').hide(2000);
        }

    })
    $('.closew').on('click',function(){
    alert('你即将离开游戏！！！')
    window.close();
  })
 

})
