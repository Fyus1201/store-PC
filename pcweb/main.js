/**
 * Created by Fyus on 16/9/15.
 */

(function (window, jQuery) {

    //监听浏览器位置
    var topis = 0;
    var scrollFunc = function (e) {
        var direct = 0;
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                //alert("滑轮向上滚动");
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                //alert("滑轮向下滚动");
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0) { //当滑轮向上滚动时
                //alert("滑轮向上滚动");
            }
            if (e.detail< 0) { //当滑轮向下滚动时
                //alert("滑轮向下滚动");
            }
        }

        var winPos = $(window).scrollTop(),       //获取滚动条到顶部的垂直高度
            height = $(window).height();         //获得可视浏览器的高度

        //console.log(winPos,$("body").height());
        if(winPos > 1000){
            if(!topis){
                $("#top-input").animate({top: 0 + "px",opacity:1}, 250);
                topis = 1;
            }
        }else{
            if(topis){
                $("#top-input").animate({top: -50 + "px",opacity:0}, 150);
                topis = 0;
            }
        }
    };
    //给页面绑定滑轮滚动事件  firefox
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    //滚动滑轮触发scrollFunc方法  其他
    window.onmousewheel = document.onmousewheel = scrollFunc;


    //搜索栏 第一焦点
    $(".input-t input").focus(function(){
        this.value="";
        $(this).css({color:"#000"});
    }).blur(function(){
        this.value= "搜索生鲜食品/零食/店铺";
        $(this).css({color:"rgb(102, 102, 102)"});
    });

    //倒计时 时间
    var date = {
        randomdate:0,
        len:20,
        time1:$(".time-1 li"),
        time2:$(".time-2 li"),
        time3:$(".time-3 li"),
        time4:$(".time-4 li"),
        time5:$(".time-5 li"),
        time6:$(".time-6 li"),
        time: function() {
            var self = this;
            var timeindex1 = 0,
                timeindex2 = 0,
                timeindex3 = 0,
                timeindex4 = 0,
                timeindex5 = 0,
                timeindex6 = 0;
            if(!self.randomdate){
                self.randomdate = parseInt(Math.random()*24*60*60);

                timeindex1 = parseInt(self.randomdate/36000);
                timeindex2 = parseInt(self.randomdate%36000/3600);
                timeindex3 = parseInt(self.randomdate%3600/600);
                timeindex4 = parseInt(self.randomdate%600/60);
                timeindex5 = parseInt(self.randomdate%60/10);
                timeindex6 = self.randomdate%10;
            }else{
                timeindex1 = parseInt(self.randomdate/36000);
                timeindex2 = parseInt(self.randomdate%36000/3600);
                timeindex3 = parseInt(self.randomdate%3600/600);
                timeindex4 = parseInt(self.randomdate%600/60);
                timeindex5 = parseInt(self.randomdate%60/10);
                timeindex6 = self.randomdate%10;
            }
            self.time1.animate({top: -timeindex1 * self.len + "px"}, 100, function(){});
            self.time2.animate({top: -timeindex2 * self.len + "px"}, 100, function(){});
            self.time3.animate({top: -timeindex3 * self.len + "px"}, 100, function(){});
            self.time4.animate({top: -timeindex4 * self.len + "px"}, 100, function(){});
            self.time5.animate({top: -timeindex5 * self.len + "px"}, 100, function(){});
            self.time6.animate({top: -timeindex6 * self.len + "px"}, 100, function(){});
            self.randomdate--;
        }

    };
    //计时
    slide = setInterval(function() {
        date.time();
    }, 1000);


    //最上图片滚动
    var slidertop = {
        index: 0,
        len: 800,
        el: $(".content-tul"),
        qiu:$(".xiaoyuan li"),
        cbackground:$(".content-m"),
        slide: function() {
            var self = this;
            var left = ++self.index * 800;
            self.el.stop(true,true);
            self.el.animate({left: -left + "px"}, 550, function() {
                if (self.index >= 4) {
                    self.index = 0;
                    self.el.css("left", 0);
                }
                self.qiu.removeClass("xiaoyuan1");
                $(self.qiu[self.index]).addClass("xiaoyuan1");

                switch(self.index){
                    case 0:
                        self.cbackground.css({"background-color":"#3e0009"});
                        break;
                    case 1:
                        self.cbackground.css({"background-color":"#c40564"});
                        break;
                    case 2:
                        self.cbackground.css({"background-color":"#fff"});
                        break;
                    case 3:
                        self.cbackground.css({"background-color":"#98bf21"});
                        break;
                }
            });
        }
    };
    //最下图片滚动
    var sliderdow = {
        date:0,
        index: 0,
        indexn:0,
        len: 655,
        el: $(".map-rt"),
        eli:$(".jiaoli"),
        qiu:$(".qiu li"),
        slide: function(){
            var self = this;
            self.date++;
            var left = ++self.index * 655;
            self.el.stop(true,true);
            self.el.animate({left: -left + "px"}, 550, function() {
                if (self.index >= 3) {
                    self.index = 0;
                    self.el.css("left", 0);
                }
                self.qiu.removeClass("qiu1");
                $(self.qiu[self.index]).addClass("qiu1");
            });

            self.eli.stop(true,true);
            if(self.index != self.indexn){
                self.eli.animate({opacity:0}, 250, function(){
                    switch(self.index){
                        case 0:
                            self.eli.html("3折").animate({opacity:1}, 250);
                            self.indexn = 0;
                            break;
                        case 1:
                            self.eli.html("抢购").animate({opacity:1}, 250);
                            self.indexn = 1;
                            break;
                        case 2:
                            self.eli.html("限时").animate({opacity:1}, 250);
                            self.indexn = 2;
                            break;
                        case 3:
                            self.eli.html("3折").animate({opacity:1}, 250);
                            self.indexn = 3;
                            break;
                    }
                });
            }

        }
    };

    //上转轮动画
    var slideh = setInterval(function() {
        slidertop.slide();
    }, 5000);
    //下转轮动画
    var slidef = setInterval(function() {
        sliderdow.slide();
    }, 4000);

    //停留事件
    (function(){

        //最上分类
        $(".content-lc").hover(
            function(){
                $(this).find(".mean").show();
                var rul = $(".content-rul li");
                rul.stop();
                timerul1 = setTimeout(rulShow1($(this).index()), 10);
                timerul2 = setTimeout(rulShow2($(this).index()), 5);
            },
            function (){
                $(this).find(".mean").hide();

                clearTimeout(timerul1);
                clearTimeout(timerul2);
                //stopAll,goToEnd
                $(".content-rul li").stop(true,true);
                timerul1 = setTimeout(rulShow1($(this).index()), 10);
                timerul2 = setTimeout(rulShow2($(this).index()), 5);
            }
        );
        var rulShow1 = function(index){
            var rul = $(".content-rul li");
            $(rul).not($(rul[index])).animate({opacity:0},500);
        };
        var rulShow2 = function(index){
            var rul = $(".content-rul li");
            $(rul[index]).animate({opacity:1},500);
        };

        //停留 停止滚动
        $(".content-tul").hover(
            function () {
                slideh = clearInterval(slideh);
                slideh = false;
            },
            function () {
                if(!slideh){
                    slideh = setInterval(function() {
                        slidertop.slide();
                    }, 5000);
                }
            }
        );
        $(".xiaoyuan").hover(
            function () {
                slideh = clearInterval(slideh);
                slideh = false;
            },
            function () {
                if(!slideh){
                    slideh = setInterval(function() {
                        slidertop.slide();
                    }, 5000);
                }
            }
        );
        $(".map-r").hover(
            function () {
                slidef = clearInterval(slidef);
                slidef = false;
            },
            function () {
                if(!slidef){
                    slidef = setInterval(function() {
                        sliderdow.slide();
                    }, 4000);
                }
            }
        );
        $(".qiu0").hover(
            function () {
                slidef = clearInterval(slidef);
                slidef = false;
            },
            function () {
                if(!slidef){
                    slidef = setInterval(function() {
                        sliderdow.slide();
                    }, 4000);
                }
            }
        );

        //显示价格
        $(".map-rm").hoverDelay({
            hoverDuring : 250,
            outDuring :  0,
            hoverEvent : function(){
                $(".jiage").animate({left: 190 + "px",opacity:1}, 250);
            },
            outEvent : function(){
                $(".jiage").animate({left: 656 + "px",opacity:0}, 150);
            }
        });



        //显示选中框
        $(".cu-itemli").hover(
            function(){
                $(this).css({zIndex: "100"});
            },
            function(){
                $(this).css({zIndex:""});
            }
        );
        $(".neiron-li").hover(
            function(){
                $(this).css({zIndex: "100"});
            },
            function(){
                $(this).css({zIndex:""});
            }
        );

        //手机web
        $(".r-i2").hover(
            function(){
                $(".phoneweb").show();
            },
            function(){
                $(".phoneweb").hide();
            }
        )
    })();

    //点击事件
    (function(){

        //选择上滚动
        $(".xiaoyuan li").click(
            function(){
                slidertop.index = $(this).index()-1;
                slidertop.slide();
            }
        );
        //选择下滚动
        $(".qiu li").click(
            function(){
                sliderdow.index = $(this).index()-1;
                sliderdow.slide();
            }
        );

        //商品分类
        var content = $(".content-lc");
        $(content[0]).find("a").click(
            function(){
                var newtop = 1560;
                $({top: $(window).scrollTop()}).animate(
                    {top: newtop},
                    {
                        duration: 700,
                        step: function() {
                            $(window).scrollTop(this.top);
                        }
                    }
                );
            }
        );
        $(content[1]).find("a").click(
            function(){
                var newtop = 2020;
                $({top: $(window).scrollTop()}).animate(
                    {top: newtop},
                    {
                        duration: 700,
                        step: function() {
                            $(window).scrollTop(this.top);
                        }
                    }
                );
            }
        );
        $(content[2]).find("a").click(
            function(){
                var newtop = 2480;
                $({top: $(window).scrollTop()}).animate(
                    {top: newtop},
                    {
                        duration: 700,
                        step: function(){
                            $(window).scrollTop(this.top);
                        }
                    }
                );
            }
        );
        $(content[3]).find("a").click(
            function(){
                var newtop = 1560;
                $({top: $(window).scrollTop()}).animate(
                    {top: newtop},
                    {
                        duration: 700,
                        step: function(){
                            $(window).scrollTop(this.top);
                        }
                    }
                );
            }
        );
        $(content[4]).find("a").click(
            function(){
                var newtop = 2920;
                $({top: $(window).scrollTop()}).animate(
                    {top: newtop},
                    {
                        duration: 700,
                        step: function() {
                            $(window).scrollTop(this.top);
                        }
                    }
                );
            }
        );

        //购物车
        $(".map-mai").click(
            function(){
                clickMai.jiaru()
            }
        );
        $(".map-cang").click(
            function(){
                clickMai.jiaru()
            }
        );
        var clickMai = (function(){
                var cont = 0;

                var jiaru = function(){
                    if(cont === 0){
                        cont++;
                        $(".mapImg").addParabola(".r-i0",{
                            complete:function(){
                                $(".ri0p").addAnimationOnce("rishuliang",{
                                    className:"rishuliang",
                                    delayTime:0,
                                    delayEvent:function(){
                                        $(".ri0p").show(400).text(cont)
                                    }
                                });
                            }
                        });
                    }else{
                        cont++;
                        $(".mapImg").addParabola(".r-i0",{
                            complete:function(){
                                $(".ri0p").addAnimationOnce("rishuliang",{
                                    className:"rishuliang",
                                    delayTime:0,
                                    delayEvent:function(){
                                        $(".ri0p").text(cont)
                                    }
                                });
                            }
                        });
                    }
                };

                var reCont = function(){
                    return cont;
                };
                return {
                    jiaru : jiaru,
                    reCont : reCont
                }
            }
        )();

        //主要点击事件  上
        $(".neiron-li").click(
            function(){
                clickNeiron.target = $(this);
                clickNeiron.click();
            }
        );
        //左
        $(".neiron-lc li").click(
            function(){
                clickNeiron.target = $(this);
                clickNeiron.click();
            }
        );
        var clickNeiron = {
            target:"",
            backleft:102,
            click:function(){
                var self = this;
                var target = self.target;
                var selfparents = target.parents(".neiron");
                var targetMain = $($(".neiron")[selfparents.index()-3]).find(".neiron-lul");
                $(targetMain.find("li")[target.index()]).show();
                targetMain.find("li").not($(targetMain.find("li")[target.index()])).hide();

                var targetTitle = $($(".neiron")[selfparents.index()-3]).find(".neiron-ul");

                targetTitle.find(".back").animate({left: target.index()*self.backleft+9 + "px"}, 250,function(){
                    targetTitle.find(".neiron-li").not($(targetTitle.find(".neiron-li")[target.index()])).removeClass("selectedNeiron");
                    $(targetTitle.find(".neiron-li")[target.index()]).addClass("selectedNeiron");
                });
            }
        };
    })();
})(window, jQuery);

//表单弹窗
(function(){
    //登陆
    $(".user a").click(
        function(){
            switch ($(this).index()){
                case 0:
                    denglu();
                    break;
                case 1:
                    denglu();
                    break;
                case 2:
                    denglu();
                    break;
                default:
                    break;
            }
        }
    );

    var denglu = function(){
        $(".box").addClass("box_current");
        $(".user_alert").addClass("user_current");
        document.documentElement.style.overflow='hidden';
        document.body.style.overflow='hidden';//手机版设置这个。

        $("#user").removeClass("input-error").removeClass("input-selectederror");
        $("#password").removeClass("input-error").removeClass("input-selectederror");
        $(".jinggao").text("");

        if(sliderClass.check() === 1){
            sliderClass.again();
        }

        //进入时再添加
        $(document).bind({
                mouseup:
                    function(e){
                        if(e.which === 1){
                            if(sliderClass.rbegin){
                                sliderClass.mouseEnd();
                                console.log(sliderClass.check());
                            }
                        }
                    },
                mousedown:
                    function(e){

                        if(e.target.id === "submit"){

                        }else{
                            if($("#user").hasClass("input-selectederror")){
                                $("#user").removeClass("input-selectederror");
                            }
                            if($("#password").hasClass("input-selectederror")){
                                $("#password").removeClass("input-selectederror");
                            }
                            if($("#slider").hasClass("input-selectederror")){
                                $("#slider").removeClass("input-selectederror");
                            }
                        }
                    }
            }
        );
    };
    //退出
    $(".box").click(
        function(){
            $(".box").removeClass("box_current");
            $(".user_alert").removeClass("user_current");
            document.documentElement.style.overflow='';
            document.body.style.overflow='';

            $(document).unbind();
        }
    );

    //焦点
    $("#user").focus(function(){
        if(!$(this).hasClass("input-error")){
            $(this).addClass("input-selected");
        }
    }).blur(function(){
        $(this).removeClass("input-selected");
        errorClass.isError($("#user"));
    });
    $("#password").focus(function(){
        if(!$(this).hasClass("input-error")){
            $(this).addClass("input-selected");
        }
    }).blur(function(){
        $(this).removeClass("input-selected");
        errorClass.isError($("#password"));
    });

    //滑动条
    $(".handler").mousedown(
        function(e){
            if(e.which === 1){
                var thatX = event.clientX;
                sliderClass.init();
                sliderClass.mouseBegin(thatX);
            }
        }
    );

    var sliderClass = (function(){
        var ok = 0;
        var begin = 0;
        var sliderx;
        var handlerX;

        var init = function(){
            var self = $(".handler");
            var hwidth = self.outerWidth();
            var pwidth = self.parent().width();
            sliderx = pwidth - hwidth;
            handlerX = self.offset().left;

            begin = 1;
        };
        var mouseBegin = function(thatX){
            var self = $(".handler");
            $(document).mousemove(
                function(e){
                    if(ok != 1){
                        if(e.pageX-thatX <= 0){
                            self.offset(
                                function(left,top){
                                    newPos = new Object();
                                    newPos.left = handlerX;
                                    return newPos;
                                }
                            );
                            $(".slider_bg").width(0);
                        }else if(e.pageX-thatX >= sliderx){
                            ok = 1;
                            self.offset(
                                function(left,top){
                                    newPos=new Object();
                                    newPos.left= sliderx+handlerX;
                                    return newPos;
                                }
                            ).removeClass("handler_bg")
                                .addClass("handler_ok_bg");
                            $(".slider_bg").width(sliderx);

                        }else{
                            self.offset(
                                function(left,top){
                                    newPos=new Object();
                                    newPos.left=e.pageX-thatX+handlerX;
                                    return newPos;
                                }
                            );
                            $(".slider_bg").width(e.pageX-thatX);
                        }
                    }
                }
            )
        };
        var  mouseEnd = function(){
            $(document).unbind("mousemove");
            if($(".handler").hasClass("handler_ok_bg")){
                ok = 1;
            }else{
                $(".handler").offset(
                    function(left,top){
                        newPos=new Object();
                        newPos.left=handlerX;
                        return newPos;
                    }
                );
                $(".slider_bg").width(0);
                sliderx = "undefined";
                handlerX = "undefined";
            }
            begin = 0;
        };
        var again = function(){
            if(ok === 1){
                ok = 0;
                $(".handler").offset(
                    function(left,top){
                        newPos=new Object();
                        var self = $(".handler");
                        var hwidth = self.outerWidth();
                        var pwidth = self.parent().width();
                        newPos.left=  self.offset().left + hwidth - pwidth;
                        return newPos;
                    }
                ).removeClass("handler_ok_bg")
                    .addClass("handler_bg");
                $(".slider_bg").width(0);

                $("#user").val("");
                $("#password").val("");
            }
        };
        var isError = function(target){
            if(ok === 1){
                target.removeClass("input-selectederror");
            }else{
                target.addClass("input-selectederror");
            }
        };
        var check = function(){
            return ok;
        };
        var rbegin = function(){
            return begin;
        };
        return {
            check : check,
            init : init,
            mouseBegin : mouseBegin,
            mouseEnd : mouseEnd,
            again : again,
            isError : isError,

            rbegin : rbegin
        }
    })();

    //按钮状态
    $(".submit-button").mousedown(
        function(){
            $(this).removeClass("button-hover");
            $(this).addClass("button-selected");

            var error1 = errorClass.isError($("#password"));
            var error2 = errorClass.isError($("#user"));
            if(error1&&error2){
                errorClass.setError(1);
            }else{
                errorClass.setError(0);
            }

            sliderClass.isError($("#slider"));
        }
    ).hover(
        function(){
            $(this).addClass("button-hover");
        },
        function(){
            $(this).removeClass("button-selected");
            $(this).removeClass("button-hover");
        }
    ).mouseup(
        function(){
            $(this).removeClass("button-selected");
            $(this).addClass("button-hover");

            if(sliderClass.check()&&errorClass.returnError()){
                console.log("登陆");
            }else{
                console.log("错误");
            }
        }
    );

    //错误检测
    var errorClass = (function(){
        var error = 0;

        var isError = function(target){
            if(target.val().length === 0){
                error1(target);
                error2(target);
                target.parent().siblings(".jinggao").text("不能为空");

                return 0;
            }else{
                removeerror1(target);
                removeerror2(target);
                target.parent().siblings(".jinggao").text("");

                return 1;
            }
        };

        var error1 = function(target){
            target.addClass("input-selectederror");
        };
        var error2 = function(target){
            target.addClass("input-error");
        };

        var removeerror1 = function(target){
            target.removeClass("input-selectederror");
        };
        var removeerror2 = function(target){
            target.removeClass("input-error");
        };
        var setError = function(n){
            error = n;
        };
        var returnError = function(){
            return error;
        };

        return {
            isError : isError,
            setError : setError,
            returnError : returnError
        }
    })();

})();

