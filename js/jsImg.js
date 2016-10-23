/**
 * Created by Fyus on 16/10/23.
 */
$(function(){
    //可视位置
    function getClient(){
        var l, t, w, h;
        l = document.documentElement.scrollLeft || document.body.scrollLeft;
        t = document.documentElement.scrollTop || document.body.scrollTop;
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
        return { left: l, top: t, width: w, height: h };
    }
    // 返回待加载资源位置
    function getSubClient(p){
        var i, w, h;
        w = p.width();
        h = p.height();
        i = p.offset();

        return { left: i.left, top: i.top, width: w, height: h };
    }
    // 判断两个矩形是否相交,返回一个布尔值
    function intens(rec1, rec2){
        var lc1, lc2, tc1, tc2, w1, h1;
        lc1 = rec1.left + rec1.width / 2;
        lc2 = rec2.left + rec2.width / 2;
        tc1 = rec1.top + rec1.height / 2 ;
        tc2 = rec2.top + rec2.height / 2 ;
        w1 = (rec1.width + rec2.width) / 2 ;
        h1 = (rec1.height + rec2.height) / 2;

        return (Math.abs(lc1 - lc2) < w1) && (Math.abs(tc1 - tc2) < h1) ;
    }

    // 比较某个子区域是否呈现在浏览器区域
    function jiance(arr, prec1, callback){

        var prec2;
        for(var i = arr.length - 1; i >= 0; i--){
            if(arr[i]){
                var isrc = arr[i].attr("original");

                prec2 = getSubClient(arr[i]);
                if (intens(prec1, prec2)) {
                    callback(arr[i]);
                    // 加载资源后，删除监测
                    arr[i].attr("src",function(){
                            return isrc}
                    ).fadeIn(300);
                    delete arr[i];
                }
            }
        }
    }

    var arrImg = new Array();
    $(" img").each(function(i){
        arrImg[i]= $(" img").eq(i);
    });
    // 检测目标对象是否出现在客户区
    function autocheck(){
        var prec1 = getClient();
        jiance(arrImg, prec1, function(obj){
            // 加载资源...

        })
    }
    autocheck();
    window.onscroll = function(){
        autocheck();

    };
    window.onresize = function(){
        autocheck();
    };

    //主要点击事件  上
    $(".neiron-li").click(
        function(){
            autocheck();
        }
    );
    //左
    $(".neiron-lc li").click(
        function(){
            autocheck();
        }
    );

    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img);//将回调函数的this替换为Image对象
        };
    }
})
