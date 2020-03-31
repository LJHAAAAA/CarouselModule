(function(){
    var content = '<div class="slider" id="slider">'+
    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
    '<div class="slide"><img src="img/b1.png" alt=""></div>'+
    '<div class="slide"><img src="img/b2.png" alt=""></div>'+
    '<div class="slide"><img src="img/b3.png" alt=""></div>'+
    '<div class="slide"><img src="img/b4.png" alt=""></div>'+
    '<div class="slide"><img src="img/b5.png" alt=""></div>'+
    '<div class="slide"><img src="img/b1.png" alt=""></div>'+"</div>"+
    '<span id="left"><</span>'+
    '<span id="right">></span>'+
    '<ul class="nav" id="navs">'+
        '<li>1</li>'+
        '<li>2</li>'+
        '<li>3</li>'+
        '<li>4</li>'+
        '<li>5</li>'+
	'</ul>'
    $('#box').append(content);
    var imgs = document.getElementById('slider').children;  //图片数组
        imgNum = imgs.length - 2;                           //图片数量
        navs = document.getElementById('navs').children;    //按钮数组
        navsNum = navs.length;                              //按钮数量
        index = 0;                                          //当前正在轮播的索引
        timer = setInterval(next,2000);                     //定时器
    //向按钮添加样式
    function active(temp){
        for(var i = 0; i < navsNum; i++){
            navs[i].removeAttribute("class","active");
        }
        navs[temp].setAttribute("class","active");
    }
    
    //鼠标移入时左右按钮浮现
    $("#box").hover(function(){
        $("#left").stop().animate({'opacity':0.6});
        $("#right").stop().animate({'opacity':0.6});
        clearInterval(timer);
    },function(){
        $("#left").stop().animate({'opacity':0});
        $("#right").stop().animate({'opacity':0});
        timer = setInterval(next,2000);
    })
    
    //下一页
    function next(){
        if(index == imgNum - 1){
            $('#slider').animate({left:'-=' + 1200},'slow',function(){
                $("#slider").css('left',-1200);
            });
            index = 0;
            active(0);
        }
        else{
            $('#slider').animate({left:'-=' + 1200},'slow');
            active(index + 1);
            index++;
        }
    }

    //上一页
    function prev(){
        if(index == 0){
            $("#slider").animate({left:'+=' + 1200},'slow',function(){
                $("#slider").css('left',-1200*imgNum);
            })
            active(imgNum-1);
            index = imgNum - 1;
        }
        else{
            $('#slider').animate({left:'+=' + 1200},'slow');
            active(index - 1);
            index--;
        }
    }
    
    //各个按钮的点击操作
    for(var i = 0; i < imgNum; i++){
        (function(j){
            navs[j].onclick = function(){
                var temp = j - index;
                if(temp > 0){
                    $('#slider').animate({left:'-=' + 1200*temp},'slow');
                }
                else if(temp < 0){
                    $('#slider').animate({left:'+=' + 1200*-temp},'slow');
                }
                else{
                    return 0
                }
                active(j);
                index = j;
            }
        })(i);
    }

    //左右按钮绑定点击事件
    $("#left").click(prev);
    $("#right").click(next);
    
})();