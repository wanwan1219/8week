/**
 * Created by 000 on 2017/9/15.
 */
(function(){
    window.onload=function(){
        function cla(e){
            return document.getElementsByClassName(e)
        }
        var ban=cla("banner")[0],
            ul=ban.children[0],
            ulLis=ul.children,
            len=ulLis.length,
            h=ulLis[0].children[0].offsetHeight,
            w=ulLis[0].children[0].offsetWidth,
            index= 1,start= 0,end= 0,move= 0,cha= 0,step= 0,fa=true;
        var timer=setInterval(next,1500);
        ban.style.height=h+"px";
        ul.style.height=h+"px";
        ban.addEventListener("touchstart",function(e){
            start= e.touches[0].pageX;
            clearInterval(timer);
        });
        ban.addEventListener("touchend",function(e){
            end= e.changedTouches[0].pageX;
            cha=end-start;
            if(cha>1/3*w&&fa==true){
                fa=false;
                prev();
            }else if(cha<-1/3*w&&fa==true){
                fa=false;
                next();
            }else{
                ul.style.transition="left .5s linear 0s";
                ul.style.left=-index*w+"px";
            }
            timer=setInterval(next,1500)
        });
        ban.addEventListener("touchmove",function(e){
            move= e.touches[0].pageX;
            step=move-start;
            ul.style.left=-index*w+step+"px";
        });
        ul.addEventListener("transitionend",function(){
            if(index<=0){
                index=len-2;
            }
            if(index>=len-1){
                index=1;
            }
            ul.style.transition="none";
            ul.style.left=-index*w+"px";
            fa=true;
        });
        function prev(){
            index--;
            ul.style.transition="left .5s linear 0s";
            ul.style.left=-index*w+"px";
        }
        function next(){
            index++;
            ul.style.transition="left .5s linear 0s";
            ul.style.left=-index*w+"px";
        }
    }
})();
(function(){
    function id(a){
        return document.getElementById(a);
    }
    function cla(e){
        return document.getElementsByClassName(e)
    }
    var hour=id("time_h"),
        minute=id("time_m"),
        second=id('time_s');
    var start= 0,move= 0,step=0;
    show_time();
    function show_time(){
        var time_start = new Date().getTime(); //设定当前时间
        var time_end =  new Date("2017/09/18 24:00:00").getTime(); //设定目标时间
        // 计算时间差
        var time_distance = time_end - time_start;
        // 时
        var int_hour = Math.floor(time_distance/3600000);
        time_distance -= int_hour * 3600000;
        // 分
        var int_minute = Math.floor(time_distance/60000);
        time_distance -= int_minute * 60000;
        // 秒
        var int_second = Math.floor(time_distance/1000);
        // 时分秒为单数时、前面加零
        if(int_hour < 10){
            int_hour = "0" + int_hour;
        }
        if(int_minute < 10){
            int_minute = "0" + int_minute;
        }
        if(int_second < 10){
            int_second = "0" + int_second;
        }
        // 显示时间
        hour.value = int_hour;
        minute.value = int_minute;
        second.value = int_second;
        // 设置定时器
        setTimeout(show_time,1000);
    }
    var gb=cla("grab_bottom")[0];
    gb.children[0].addEventListener("touchstart",function(e){
        start= e.touches[0].pageX;
    });
    var left= 0,wid1= 0,wid2= 0,wid= 0,a=0;
    gb.children[0].addEventListener("touchmove",function(e){
        move= e.touches[0].pageX;
        step=move-start;
        console.log(step);
        //var left=window.getComputedStyle(gb.children[0],null).left;
        /*获取css中的left值*/
        gb.children[0].style.left=a+step+"px";
    });
    gb.children[0].addEventListener("touchend",function(){
        left=gb.children[0].style.left;
        wid1=window.getComputedStyle(gb.children[0],null).width;
        wid2=window.getComputedStyle(gb,null).width;
        wid=parseInt(wid1)-parseInt(wid2);
        a=parseInt(left);
        /*用a来控制left值*/
        console.log(a);
        //console.log(wid);
        if(a>0){
            a=0;
            gb.children[0].style.left=a+"px"
        }
        if(a<-wid){
            a=-wid;
            gb.children[0].style.left=a+"px"
        }
        gb.children[0].style.left=a+"px";
    })
})();