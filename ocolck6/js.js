// JavaScript Document
//取得畫布
var c = document.getElementById("myCanvas");
//取得繪圖區域
var ctx = c.getContext("2d"); 
//取得螢幕尺寸，設定畫布跟變數
var ww=c.width=$(window).outerWidth();
var wh=c.height=$(window).outerHeight();
//設定中心點
var center={x: ww/2,y: wh/2};
//因為上下顛倒的關係，scaleY給-1

function getWindowSize(){
  //設定大小
  ww=c.width=$(window).outerWidth();
  wh=c.height=$(window).outerHeight();
  
  //重新設定中心點
  center={x: ww/2,y: wh/2};
  
  //將畫布的零點偏移到中心
  ctx.restore();
  ctx.translate(center.x,center.y);
}

//設定當網頁尺寸變動的時候要重新抓跟設定大小、中心
$(window).resize(getWindowSize);
getWindowSize();

var time =0;
setInterval(draw,10);

function draw(){
  //背景

  ctx.fillStyle = "#111";
  ctx.beginPath();
  //起點/長/寬
  ctx.rect(-2000,-2000,4000,4000);
  ctx.fill();
  
  //坐標軸
  ctx.strokeStyle="rgba(255,255,255,0.1)";
  ctx.lineWidth=1;
  //x
  ctx.moveTo(-ww/2,0);
  ctx.lineTo(ww/2,0);
  //y
  ctx.moveTo(0,-wh/2);
  ctx.lineTo(0,wh/2);
  ctx.stroke();

  //------------------------------
  //繪製變動弧線
  //設定半徑
  var r=200;
  //將角度轉換為弧度
  var deg_to_pi=Math.PI/180;
  
  //重新開始繪製
  ctx.beginPath();
  ctx.lineWidth=1;
  for(var i=0;i<=200;i++){
    //設定變動的半徑跟角度
    // var var_r = r;
    var var_r = r + Math.sin(Math.PI*2*i/10+time/20)*2;
    var deg = (i/200)*360 * deg_to_pi;
    //連線
    ctx.lineTo(
      var_r * Math.cos(deg),
      var_r * Math.sin(deg)
    );
  }
  //設定顏色跟繪製
  ctx.strokeStyle="#FFF";
  ctx.stroke();
  
  //--- 刻度
  var deg2 = 30*deg_to_pi ; 
  var r2 = 220 ;
  var r4 = 20 ; 
  var r3 = r2+r4 ;
  var count = 240 ; 
    for(var i=0;i<=count;i++){
       if (i%10 == 0){
         r3 =r2+30;
       }else{
         r3=r2+20
       }
   var v3 = r2 + (i%60==0 ? 80:0);
      
      var deg = i/count*360*deg_to_pi;
         ctx.lineWidth=1;
         ctx.beginPath();
      
           ctx.moveTo(
      r2 * Math.cos(deg),
      r2* Math.sin(deg)
    );
        ctx.lineTo(
      r3 * Math.cos(deg),
      r3 * Math.sin(deg)

    );
  
    ctx.strokeStyle="#FFF";
    ctx.stroke();
    }
  
 
  
   for(var i=0;i<=60;i++){
      var deg = i/60*360*deg_to_pi;
         ctx.lineWidth=1;
         ctx.beginPath();
      
           ctx.moveTo(
      350* Math.cos(deg),
      350* Math.sin(deg)
    );
        ctx.lineTo(
     360 * Math.cos(deg),
     360 * Math.sin(deg)

    );
  
    ctx.strokeStyle="#9FF781";
    ctx.stroke();
   }

  var now = new Date ; 
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hour = now.getHours();
  var deg_sec = (-6*sec+90)*deg_to_pi;
  var deg_min = (-6*min+90)*deg_to_pi;
  var deg_hur = (-30*(hour+min/60)+90)*deg_to_pi;
  pointer (250,deg_sec,1);
  pointer (200,deg_min,1);
  pointer (150,deg_hur,4);
  
  
  function pointer (r,deg,linewidth){
      ctx.beginPath();
    ctx.lineWidth=linewidth;
    ctx.strokeStyle="rgba(255,255,255,0.5)";
    
    ctx.moveTo(
  0,0
    );
        ctx.lineTo(
     r * Math.cos(deg),
     r * Math.sin(deg)

    );
 ctx.stroke();
    
  }
  
  

  
   $('.time').text("+00:"+hour+":"+min+":"+sec)
  time+=1;
}