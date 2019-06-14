window.onload = function(){
 var obj=document.getElementById("photos");
circleaddEventListener();
imgaddEventListener();
paraellipsis();               //段落设置50个字符限制
obj.style.animation="imgplay 3s ease-out infinite";
obj.addEventListener("webkitAnimationIteration",imgplayorderset);    //迭代结束一次，点亮下一张图片，重新设置图片位置
}

function circleaddEventListener(){
 
var  a1=document.getElementById("a1"),
     a2=document.getElementById("a2"),
     a3=document.getElementById("a3"),
     a4=document.getElementById("a4"),
     a5=document.getElementById("a5");

a1.addEventListener("touchstart",a1mouseover);
a1.addEventListener("touchend",a1mouseout);
a2.addEventListener("touchstart",a2mouseover);
a2.addEventListener("touchend",a2mouseout);
a3.addEventListener("touchstart",a3mouseover);
a3.addEventListener("touchend",a3mouseout);
a4.addEventListener("touchstart",a4mouseover);
a4.addEventListener("touchend",a4mouseout);
a5.addEventListener("touchstart",a5mouseover);
a5.addEventListener("touchend",a5mouseout);
}

function circleremoveEventListener(){
 
var  a1=document.getElementById("a1"),
     a2=document.getElementById("a2"),
     a3=document.getElementById("a3"),
     a4=document.getElementById("a4"),
     a5=document.getElementById("a5");

a1.removeEventListener("touchstart",a1mouseover);
a1.removeEventListener("touchend",a1mouseout);
a2.removeEventListener("touchstart",a2mouseover);
a2.removeEventListener("touchend",a2mouseout);
a3.removeEventListener("touchstart",a3mouseover);
a3.removeEventListener("touchend",a3mouseout);
a4.removeEventListener("touchstart",a4mouseover);
a4.removeEventListener("touchend",a4mouseout);
a5.removeEventListener("touchstart",a5mouseover);
a5.removeEventListener("touchend",a5mouseout);
}

function imgaddEventListener(){

var obj=document.getElementById("photos");
  
obj.addEventListener("touchstart",touchfuc,false);
obj.addEventListener("touchmove",touchfuc,false);
obj.addEventListener("touchend",touchfuc,false);

}

function imgremoveEventListener(){

var obj=document.getElementById("photos");
  
obj.removeEventListener("touchstart",touchfuc,false);
obj.removeEventListener("touchmove",touchfuc,false);
obj.removeEventListener("touchend",touchfuc,false);

}



var hrefbase="http://github.com/huting2019/myweb/raw/master/myweb/",
    src=[hrefbase+"轮播/1.jpg",hrefbase+"轮播/2.jpg",hrefbase+"轮播/3.jpg",hrefbase+"轮播/4.jpg" ,hrefbase+"轮播/5.jpg"],index=1,index_light=0,indexnow=1,
    startx,imgx,slidedis;
//滑动距离left+动画中断时的播放距离margin-left=实际距离；
function touchfuc(event){

var touch = event.targetTouches[0],
    obj=document.getElementById("photos"),keyrules,anistartstate,l=obj.clientWidth/src.length,animationfir,animationed;

switch(event.type){

case "touchstart":
slidedis=0;              //按下的时候没有滑动，滑动距离为0
obj.style.animationPlayState="paused";
startx=touch.pageX;       //触摸手指的屏幕x坐标
imgx=obj.offsetLeft;      //动画中断时的播放距离margin-left

break;

case "touchmove":

if (event.targetTouches.length == 1) {
event.preventDefault();  
slidedis=touch.pageX-startx;
if(slidedis<0)    //判断左滑还是右滑
{
    if(-slidedis<imgx+4*l)       //左滑没有到底
       obj.style.left=slidedis+ 'px';          //滑动距离left
    else
      obj.style.left=-imgx-4*l+ 'px';    //强制实际距离不超过两张图片的宽度
}
else
{
    if(slidedis<-imgx)      //右滑没有到底
       obj.style.left=slidedis+ 'px';
    else
       obj.style.left=-imgx+ 'px';     //强制实际距离不超过两张图片的宽度

}

} 
break;

case "touchend":
keyrules=document.styleSheets[1];
if(slidedis<0)    //判断左滑还是右滑
{
     animationfir=obj.offsetLeft-slidedis;          //设置动画播放开始marginLeft部分的距离
     switch(sliderightjudge(obj.offsetLeft,l)){

    case 0:
     animationed=-3*l-slidedis;          //设置动画播放终了marginLeft部分的距离
     break;
    case 1:
     animationed=-4*l-slidedis;          //设置动画播放终了marginLeft部分的距离
 
     }
      index=(indexnow+sliderightjudge(obj.offsetLeft,l))%src.length;
   
  if(-slidedis<imgx+4*l)       //左滑没有到底
   {   
      anistartstate="@-webkit-keyframes touchslide{0%{margin-left:"+animationfir+"px}   "+"100%{margin-left:"+animationed+"px;}}";
      keyrules.insertRule(anistartstate,0);
      imgremoveEventListener();               //图片滑动动画禁止操作图片和播放圈
      circleremoveEventListener();
      obj.style.animation="touchslide 0.5s ease-out forwards";
      obj.addEventListener("animationend",animationendset,false);
    }
   else                       //左滑到底不设置动画，防止抖动
     {                
             obj.style.left=0;
             imgplayorderset();
             obj.style.animation="imgplay 3s ease-out infinite";  
      } 
    
}
else
{
    animationfir=obj.offsetLeft-slidedis;          //设置动画播放开始marginLeft部分的距离    
    switch(sliderightjudge(obj.offsetLeft,l)){

    case 2:
     animationed=-slidedis;          //设置动画播放终了marginLeft部分的距离
     break;
    case 3:
     animationed=-l-slidedis;          //设置动画播放终了marginLeft部分的距离
     break;
    case 4:
     animationed=-2*l-slidedis;          //设置动画播放终了marginLeft部分的距离
 
     }
      index=(indexnow+sliderightjudge(obj.offsetLeft,l))%src.length;
     
      
      if(animationfir==animationed)                 //右滑到底不设置动画，防止抖动
          {
             obj.style.left=0;
             imgplayorderset();
             obj.style.animation="imgplay 3s ease-out infinite";
             
          }
      else
            { 
              anistartstate="@-webkit-keyframes touchslide{0%{margin-left:"+animationfir+"px}   "+"100%{margin-left:"+animationed+"px;}}";
              keyrules.insertRule(anistartstate,0);
              imgremoveEventListener();               //图片滑动动画禁止操作图片和播放圈
              circleremoveEventListener();
              obj.style.animation="touchslide 0.5s ease-out forwards"; 
              obj.addEventListener("animationend",animationendset,false);
             }
     
}



}

}

function  sliderightjudge(x,l){

if(x>-l&&x<=0)
  return 2;
if(x>-2*l&&x<=-l)
return 3;
if(x>=-3*l&&x<=-2*l)
  if(slidedis<0)
     return 0;
  else
     return 4;
if(x>=-4*l&&x<-3*l)
return 1;

}




function animationendset(){

var obj=document.getElementById("photos");
obj.removeEventListener("animationend",animationendset,false);
document.styleSheets[1].deleteRule(0);
obj.style.left=0;
imgplayorderset();
obj.style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}

function paraellipsis(){


var  arr=document.getElementsByClassName('para_ellipsis');
 
for (var i=0;i<arr.length;i++)
{
         var x=document.createElement("a");
         x.href='"http://skc.xmu.edu.cn/" target="_blank"';
         x.innerHTML="[详细]"; 

       var len=arr[i].textContent.length;  
       
       if(len>50){
           var str="";
           str=arr[i].textContent.substring(0,50)+"......";  
           arr[i].textContent=str;                 
       }
      arr[i].appendChild(x); 
 }

}



function imgplayorderset(){
 var x,circle_focus;
 if(index_light==0)
     {
       for(var i=0,j;i<src.length;i++)
        {                        
            x=(index+i+src.length-2)%src.length;
            j=i+1;
            document.getElementById("img"+j).src=src[x];   
            document.getElementsByClassName('circle')[i].style.backgroundColor="#f00"; 
           
        }           
       index=index+1;
       circle_focus=document.getElementById("a"+index);
       circle_focus.style.backgroundColor="green";
       indexnow=index;
       index=index%(src.length);         
     }
 else
     {
        for(var i=0;i<src.length;i++)
           document.getElementsByClassName('circle')[i].style.backgroundColor="#f00"; 
      circle_focus=document.getElementById("a"+index_light);
      circle_focus.style.backgroundColor="green";
      if(indexnow==index_light)
      {
          document.getElementById("img"+3).src=src[index_light-1];
          document.getElementById("img"+4).src=src[index];
       }
      else
          if(indexnow<index_light)
             { document.getElementById("img"+3).src=src[indexnow-1];
               document.getElementById("img"+4).src=src[index_light-1];}
          else
            { document.getElementById("img"+3).src=src[index_light-1];
               document.getElementById("img"+4).src=src[indexnow-1];}
       
      }
     
  
}



function a1mouseover(){
var  a1=document.getElementById("a1");
imgremoveEventListener();               //圈按下播放动画时禁止操作图片和播放圈
circleremoveEventListener();
a1.addEventListener("touchend",a1mouseout);    //监听放开的动作
document.getElementById("photos").style.animationPlayState="paused";
index_light=1;
imgplayorderset();
if(indexnow<index_light)
   document.getElementById("photos").style.animation="imgsss 0.2s ease-out forwards";
else
   document.getElementById("photos").style.animation="imgslideright 0.2s ease-out forwards";

}
function a1mouseout(){
var  a1=document.getElementById("a1");
a1.removeEventListener("touchend",a1mouseout);    //删除监听
index=0;
index_light=0;
imgplayorderset();
document.getElementById("photos").style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}



function a2mouseover(){
var  a2=document.getElementById("a2");
imgremoveEventListener();               //圈按下播放动画时禁止操作图片和播放圈
circleremoveEventListener();
a2.addEventListener("touchend",a2mouseout);    //监听放开的动作

document.getElementById("photos").style.animationPlayState="paused";
index_light=2;
imgplayorderset();
if(indexnow<index_light)
   document.getElementById("photos").style.animation="imgsss 0.2s ease-out forwards";
else
   document.getElementById("photos").style.animation="imgslideright 0.2s ease-out forwards";

}
function a2mouseout(){
var  a2=document.getElementById("a2");
a2.removeEventListener("touchend",a2mouseout);    //删除监听
index=1;
index_light=0;
imgplayorderset();
document.getElementById("photos").style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}


function a3mouseover(){

var  a3=document.getElementById("a3");
imgremoveEventListener();               //圈按下播放动画时禁止操作图片和播放圈
circleremoveEventListener();
a3.addEventListener("touchend",a3mouseout);    //监听放开的动作
document.getElementById("photos").style.animationPlayState="paused";
index_light=3;
imgplayorderset();
if(indexnow<index_light)
   document.getElementById("photos").style.animation="imgsss 0.2s ease-out forwards";
else
   document.getElementById("photos").style.animation="imgslideright 0.2s ease-out forwards";
}
function a3mouseout(){
var  a3=document.getElementById("a3");
a3.removeEventListener("touchend",a3mouseout);    //删除监听
index=2;
index_light=0;
imgplayorderset();
document.getElementById("photos").style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}


function a4mouseover(){

var  a4=document.getElementById("a4");
imgremoveEventListener();               //圈按下播放动画时禁止操作图片和播放圈
circleremoveEventListener();
a4.addEventListener("touchend",a4mouseout);    //监听放开的动作
document.getElementById("photos").style.animationPlayState="paused";
index_light=4;
imgplayorderset();
if(indexnow<index_light)
   document.getElementById("photos").style.animation="imgsss 0.2s ease-out forwards";
else
   document.getElementById("photos").style.animation="imgslideright 0.2s ease-out forwards";
}
function a4mouseout(){
var  a4=document.getElementById("a4");
a4.removeEventListener("touchend",a4mouseout);    //删除监听
index=3;
index_light=0;
imgplayorderset();
document.getElementById("photos").style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}


function a5mouseover(){
var  a5=document.getElementById("a5");
imgremoveEventListener();               //圈按下播放动画时禁止操作图片和播放圈
circleremoveEventListener();
a5.addEventListener("touchend",a5mouseout);    //监听放开的动作
document.getElementById("photos").style.animationPlayState="paused";
index_light=5;
imgplayorderset();
if(indexnow<index_light)
   document.getElementById("photos").style.animation="imgsss 0.2s ease-out forwards";
else
   document.getElementById("photos").style.animation="imgslideright 0.2s ease-out forwards";
}
function a5mouseout(){
var  a5=document.getElementById("a5");
a5.removeEventListener("touchend",a5mouseout);    //删除监听
index=4;
index_light=0;
imgplayorderset();
document.getElementById("photos").style.animation="imgplay 3s ease-out infinite";
imgaddEventListener();
circleaddEventListener();            //恢复图片和圈的操作
}