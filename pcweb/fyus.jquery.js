(function($){
    /** hover延时 */
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer,
            outTimer;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    };

    /** 单次延时css动画 */
    $.fn.addAnimationOnce = function(targetClass,options){
        var defaults = {
            delayTime: 0,
            delayEvent: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var animationTimer,
            that;

        var animation = function(){
            $(that).addClass(sets.className);

            if(document.getElementById($("."+targetClass).attr("id")).nodeType == 1) {
                document.getElementById($("."+targetClass).attr("id")).addEventListener("webkitAnimationEnd", function () { //动画结束时事件
                    $("."+targetClass).removeClass(targetClass);
                }, false);
                document.getElementById($("."+targetClass).attr("id")).addEventListener("animationend", function () { //动画结束时事件
                    $("."+targetClass).removeClass(targetClass);
                }, false);
            }
            sets.delayEvent();
        };

        return $(this).each(function(){

            if(typeof targetClass === "string"){
                that = this;
                clearTimeout(animationTimer);
                animationTimer = setTimeout(animation, sets.delayTime);
            }
        });
    };

    /** 添加抛物线动画 */
    $.fn.addParabola = function(targetID,options){
        var defaults = {
            speed: 166.67, // 每帧移动的像素大小，每帧（对于大部分显示屏）大约16~17毫秒
            curvature: 0.002,  // 实际指焦点到准线的距离，你可以抽象成曲率，这里模拟扔物体的抛物线，因此是开口向下的
            progress: function(){
                $.noop();
            },
            complete: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var a = sets.curvature,
            b = 0,
            c = 0;

        var target = $(targetID);
        var that,thatImg;

        var moveStyle = "margin",
            testDiv = document.createElement("div");
        if ("oninput" in testDiv) {

            ["", "ms", "webkit"].forEach(
                function(prefix) {
                    var transform = prefix + (prefix? "T": "t") + "ransform";
                    if (transform in testDiv.style) {
                        moveStyle = transform;
                    }
                }
            );
        }
        // 标志量
        var flagMove = true;

        // 目标位置
        var targetXY = {};
        // 当前位置
        var currentXY = {};


        var d=new Date();
        var thatImgClassName = "thatImg-"+d.getTime();

        // 产生
        var position = function() {
            if (flagMove == false) return this;

            target.append(thatImg);

            targetXY = {
                x: target.offset().left,
                y: target.offset().top
            };
            currentXY = {
                x: $(that).offset().left-target.offset().left,
                y: $(that).offset().top-target.offset().top

            };

            if (moveStyle == "margin") {
                target.find("img").last().css({marginLeft:currentXY.x+"px",marginTop:currentXY.y+"px"});
            } else {
                target.find("img").last().css(moveStyle,"translate("+currentXY.x+"px,"+currentXY.y+"px)");
            }

            b = (currentXY.y - a * currentXY.x * currentXY.x) / currentXY.x;
            move();
            return this;
        };
        // 运动
        var move = function() {
            // 如果曲线运动还没有结束，不再执行新的运动
            if (flagMove == false) return this;

            var startx = currentXY.x,
                scaleXY = 1,
                opacityXY = 1,
                radiusXY = 0,
                rate = currentXY.x > 0? -1: 1;

            var step = function() {
                // 切线 y'=2ax+b
                var tangentY = 2 * a * startx + b; // = y / x
                // y*y + x*x = speed
                // (tangentY * x)^2 + x*x = speed
                //x = Math.sqr(speed / (tangentY * tangentY + 1));

                startx = startx + rate * Math.sqrt(sets.speed / (tangentY * tangentY + 1));
                var thatImgClass = "."+thatImgClassName;

                if(scaleXY<0.3){
                    opacityXY = startx*0.8/currentXY.x;
                }else if(scaleXY<0.7){
                    opacityXY = startx*1.4/currentXY.x;
                }else{
                    opacityXY = 1;
                    radiusXY = 100*(1-startx/currentXY.x)/0.3;
                }

                if(scaleXY>0.3){
                    scaleXY = startx/currentXY.x;
                }

                // 防止过界
                if ((rate == 1 && startx > 0) || (rate == -1 && startx < 0)) {
                    startx = 0;
                }
                var x = startx,
                    y = a * x * x + b * x;

                // x, y目前是坐标，需要转换成定位的像素值
                if (moveStyle == "margin") {
                    target.find(thatImgClass).css({marginLeft:x+"px",marginTop:y+"px"});
                } else {
                    target.find(thatImgClass).css(moveStyle,"translate("+x+"px,"+y+"px) scale("+scaleXY+","+scaleXY+")").css({"opacity":opacityXY,"border-radius":radiusXY});
                }

                if (startx !== 0) {
                    window.requestAnimationFrame(step);
                    sets.progress();
                } else {
                    flagMove = true;
                    target.find(thatImgClass).remove();
                    sets.complete();
                }

            };
            window.requestAnimationFrame(step);
            flagMove = false;
            return this;
        };

        return $(this).each(function() {
            //console.log($(this).attr("src"));

            if($(this).is("img")){
                that = this;
                thatImg = $(this).clone().prop("class",thatImgClassName);
                position();

            }else{
                console.log("请使用img");
            }

        });
    }

})(jQuery);
