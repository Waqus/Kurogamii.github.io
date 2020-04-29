// var lol = 0;
// setInterval(function() {   
//   lol++;
//   document.body.style.transform = "rotate(" + lol + "deg)";
//   document.body.style.transform = "skewX(" + lol + "deg)";
//   var random = Math.floor((Math.random() * 999999) + 100000);
//   document.body.style.backgroundColor = "#" + random;
// }, 3)
var speedValue = 1;
var spacePressed = false;
var myGamePiece;
var stonesCount = 15;
var stoneSound;
var stonesAdd = 1;
var stonesUpgrade = 1;
var speedUpgrade = 1;
var stopCooldown = false;
function startGame() 
{
    myGameArea.start();
    myGamePiece = new component(70,70,"krening.png",0,0, "image")
    stoneSound = new sound("stone.wav");
    stopSound = new sound("krening.wav");
    document.getElementById("startButton").remove();
    stoneSound.play();
}

function component(width, height, color, x, y, type) 
{
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function()
    {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height);
    } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }

    this.newPos = function() 
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function upgradeStones()
{
  if(stonesCount >= stonesPrice)
  {
    stonesCount -= stonesPrice;
    stonesAdd += 1;
    stonesUpgrade += 1;
    stoneSound.play();
  }
}
function upgradeSpeed()
{
  if(stonesCount >= speedPrice)
  {
    stonesCount -= speedPrice;
    speedValue += 1;
    speedUpgrade += 1;
    stoneSound.play();
    myGamePiece.x = 0;
    myGamePiece.y = 0;

  }
}
function updateDisplay()
{
  document.getElementById("stonesId").innerHTML = "Kamienie: " + stonesCount + "(+" + stonesUpgrade + ")";
  document.getElementById("speedId").innerHTML = "Prędkość: " + speedUpgrade;
}
setInterval(updateDisplay,1);
var myGameArea = 
  {
    canvas : document.createElement("canvas"),
    start : function() 
    {
      this.canvas.width = 800;
      this.canvas.height = 800;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea,1);
    },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  function sound(src) 
  {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function()
  {
    this.sound.play();
  }
  this.stop = function()
  {
    this.sound.pause();
  }
  }
  function updateGameArea() 
  {
    stonesDisplay = document.getElementById("stonesId").innerHTML;

    speedStop = 0;
    //console.log(myGamePiece.x + " " + myGamePiece.y);
    myGameArea.clear();
    if(myGamePiece.x <= 0 && myGamePiece.y <= 0)
    {
        myGamePiece.x = 1;
        myGamePiece.y = 0;
        stonesCount += stonesAdd;
        xSpeed = speedValue;
        ySpeed = speedStop;
        //stoneSound.play();
    }
    if(myGamePiece.x + myGamePiece.width >= myGameArea.canvas.width && myGamePiece.y <= 0)
    {
        myGamePiece.x = myGameArea.canvas.width - myGamePiece.width;
        myGamePiece.y = 1;
        xSpeed = speedStop;
        ySpeed = speedValue;
    }
    if(myGamePiece.x + myGamePiece.width >= myGameArea.canvas.width && myGamePiece.y + myGamePiece.height >= myGameArea.canvas.height)
    {
      myGamePiece.x = myGameArea.canvas.width - myGamePiece.width;
      myGamePiece.y = myGameArea.canvas.width - myGamePiece.height;
      xSpeed = -speedValue
      ySpeed = speedStop;
    }
    if(myGamePiece.x <= 0 && myGamePiece.y + myGamePiece.height >= myGameArea.canvas.height)
    {
      myGamePiece.x = 0;
      myGamePiece.y = myGameArea.canvas.width - myGamePiece.height;
      xSpeed = speedStop;
      ySpeed = -speedValue;
    }
    
    document.body.onkeyup = function(e)
    {
      if(e.keyCode == 222)
      {
        stonesCount += 1000;
      }
      if(e.keyCode == 32)
      {
        if(!spacePressed)
        {
          tempX = xSpeed;
          tempY = ySpeed;
          xSpeed = 0;
          ySpeed = 0;
          spacePressed = true;
          stopSound.play();
          stopCooldown = true;
          setTimeout(function () 
          { 
            xSpeed = tempX;
            ySpeed = tempY;
            spacePressed = false;
          }, 2949)
        }
        // else if(!stopCooldown)
        // {
        //   xSpeed = tempX;
        //   ySpeed = tempY;
        //   spacePressed = false;
        // }
       
      }
      

  }
    stonesPrice = stonesUpgrade * 15;
    speedPrice = speedUpgrade * 8;
    myGamePiece.x += xSpeed;
    myGamePiece.y += ySpeed;
    myGamePiece.update();
    document.getElementById("stonesPrice").innerHTML = "Cena: " + stonesUpgrade * 15;
    document.getElementById("speedPrice").innerHTML = "Cena: " + speedUpgrade * 8;
    
  }
