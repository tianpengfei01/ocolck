// JavaScript Document
/* jshint expr: true */
/*jshint esversion: 6 */
/*MIT License*/

var charArray = [];
var text = "Is everybody in? Is everybody in? Is everybody in? The ceremony is about to begin." +
  " The entertainment for this evening is not new, you've seen this entertainment through and through," +
  " you have seen your birth, your life, your death ...you may recall all the rest. ― Jim Morrison, An American Prayer";
var NumberOfChars = text.length;
var canvas = document.getElementById("cnv"),
  ctx = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth - 20,
  height = canvas.height = window.innerHeight - 20;
var centerX = width / 2;
var centerY = height / 2;
var circvarab = [];
var angvarab = [];
var ile = 180 * 1.5;
var speed = 3.14 / ile,
  angle = 0;
var x, y;
var addToCounter = 0;
var hoursDotsTab = [];
document.body.style.background = 'black';
ctx.fillStyle = 'gold';

function circle() {
  angle = 0;
  circvarab = [];
  width = canvas.width = window.innerWidth - 20,
    height = canvas.height = window.innerHeight - 20;
  centerX = width / 2;
  centerY = height / 2;
  for (var i = 0; i < 360 * 1.5; i += 1) {
    var CPosition = {
      x: 0,
      y: 0
    };
    var x = centerX + Math.cos(angle) * 160;
    var y = centerY + Math.sin(angle) * 160;
    angle -= speed;
    CPosition.x = x;
    CPosition.y = y;
    circvarab.push(CPosition);
    /////////////////?
    angvarab.push(angle);
  }
  hoursDotsTab = [];
  for (var i = 12; i > 0; i--) {
    var angleHours = 360 / 12; ///godziny	
    angleHours *= (Math.PI / 180) * (i - 15);
    var xHoursDots = centerX + Math.cos(angleHours) * 150;
    var yHoursDots = centerY + Math.sin(angleHours) * 150;
    hoursDotsTab.push({
      x: xHoursDots,
      y: yHoursDots
    });
  }
}

function init() {
  addToCounter = 0;
  charArray = [];
  for (var i = 0; i < NumberOfChars; i += 1) {
    var charObjekt = {
      znak: "",
      x: 0,
      y: 0,
      font: 652,
      color: "yellow",
      licznik: 5,
      visible: false,
      indeksiak: 0,
      bloker: false,
      anglevarter: 0
    };
    charObjekt.znak = text[i];
    charObjekt.x = circvarab[0].x;
    charObjekt.y = circvarab[0].y;
    charObjekt.licznik += addToCounter;
    addToCounter += 18;
    charArray.push(charObjekt);
  }
  window.addEventListener("resize", function() {
    circle();
  });
}

function printvarter(znak, xAngle, yAngle, angle) {
  //////////////scroll no.1	
  ctx.save();
  ctx.translate(xAngle, yAngle); //translacja do srodka znaku krok 1
  ctx.rotate(angle + (90 * Math.PI / 180)); ///zwyczajny po kole
  ctx.fillStyle = 'yellow';
  ctx.fillText(znak, -20, -10);
  ctx.restore();
  ///////////scroll no.2
  ctx.save();
  ctx.translate(xAngle, yAngle);
  ctx.rotate(-angle * angle / 2); ///dziwaczny
  ctx.fillStyle = 'blue';
  ctx.fillText(znak, 70, 80);
  ctx.restore();
}

////////////////////////////

function getAngle(seconds, minutes, hours, milliseconds) {
  var degree = Math.PI / 180;
  /////////seconds
  var angleSeconds = 360 / 60; ///sekundy
  angleSeconds *= (degree) * (seconds - 15);
  /////////minutes
  var angleMinutes = 360 / 60; ///minuty
  angleMinutes *= (degree) * (minutes - 15);
  /////////hours
  var angleHours = 360 / 12; ///godziny
  angleHours *= (degree) * (hours - 15);
  /////////seconds
  angleSeconds += (360 / 60) / 1000 * milliseconds * degree;
  var xSeconds = centerX + Math.cos(angleSeconds) * (150 - 4);
  var ySeconds = centerY + Math.sin(angleSeconds) * (150 - 4);
  /////////minutes
  angleMinutes += (360 / 60) / 60 * seconds * degree; ///powolny przesuw minut wraz ze wzrostem wartosci sekund (w 1 minucie)
  var xMinutes = centerX + Math.cos(angleMinutes) * (120 - 2);
  var yMinutes = centerY + Math.sin(angleMinutes) * (120 - 2);
  /////////hours
  angleHours += (360 / 12) / 60 * minutes * degree; ///////--||-- (w 1 godzinie)
  var xHours = centerX + Math.cos(angleHours) * (90 - 4);
  var yHours = centerY + Math.sin(angleHours) * (90 - 4);
  ////////

  return {
    xSeconds: xSeconds,
    ySeconds: ySeconds,
    xMinutes: xMinutes,
    yMinutes: yMinutes,
    xHours: xHours,
    yHours: yHours
  };
}

function drawClock() {
  var Czas = new Date();
  var hours = Czas.getHours();
  var minutes = Czas.getMinutes();
  var seconds = Czas.getSeconds();
  var milliseconds = Czas.getMilliseconds();
  var xyTime = getAngle(seconds, minutes, hours, milliseconds);
  //////////tarcza
  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = '#111111';
  ctx.arc(centerX, centerY, 160, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
  //////////clock dots
  for (var i = 0; i < hoursDotsTab.length; i++) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#000077';
    ctx.arc(hoursDotsTab[i].x, hoursDotsTab[i].y, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }
  ////////////Text on clock
  ctx.save();
  ctx.font = "30px Courier";
  ctx.fillStyle = '#111177';
  ctx.fillText('\u00A92016', centerX - 1.5 * 30, centerY - 1.5 * 30);
  ctx.font = "20px Courier";
  ctx.fillText('PioQ', centerX - 1 * 20, centerY + 2.5 * 30);
  ctx.restore();
  ////////////hours	
  ctx.save();
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.strokeStyle = '#0000cc';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(xyTime.xHours, xyTime.yHours);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ///////////circle
  ctx.save();
  ctx.fillStyle = '#0000cc';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 18, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
  ////////////
  ////////////minutes
  ctx.save();
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.strokeStyle = '#0000aa';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(xyTime.xMinutes, xyTime.yMinutes);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ///////////circle
  ctx.save();
  ctx.fillStyle = '#0000aa';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
  ////////////
  ////////////seconds
  ctx.save();
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = '#000099';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(xyTime.xSeconds, xyTime.ySeconds);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ////////////
  ///////////circle
  ctx.save();
  ctx.fillStyle = '#000099';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
  ////////////////////////////////////////////////////////////
}

function render() {

  drawClock();

  for (var i = 0; i < charArray.length; i += 1) {

    if (charArray[i].licznik < 5 && charArray[i].bloker === false) {
      charArray[i].visible = true;
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    if (charArray[i].visible === true) {
      charArray[i].indeksiak += 1;
      if (charArray[i].indeksiak < circvarab.length - 1) {

        x = circvarab[charArray[i].indeksiak].x;
        y = circvarab[charArray[i].indeksiak].y;

        if (x >= circvarab[15].x && y < centerY) {
          charArray[i].font *= 0.8;
          ctx.font = (charArray[i].font) + "px Courier";
        } else if (x >= circvarab[15].x && y >= centerY) {
          charArray[i].font *= 0.8;
          ctx.font = (charArray[i].font) + "px Courier";
        } else {
          charArray[i].font = 40;
          ctx.font = "40px Courier";
        }

        charArray[i].anglevarter = angvarab[charArray[i].indeksiak];
        printvarter(charArray[i].znak, x, y, charArray[i].anglevarter);
      }
    }
    if (circvarab[charArray[text.length - 1].indeksiak].x == circvarab[circvarab.length - 1].x) {
      console.log("init");
      init();
    }
    if (circvarab[charArray[i].indeksiak] == circvarab[circvarab.length - 1]) { //.x
      charArray[i].visible = false;
      charArray[i].bloker = true;
      charArray[i].indeksiak = 0;
    }
    charArray[i].licznik -= 1;
  }
}

function scroll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render();
  requestAnimationFrame(scroll);
}

circle();
init();
scroll();