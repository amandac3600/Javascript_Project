const Player = require("./player.js");
const Border = require("./border.js");
const Mouse = require("./mouse.js");
const Sound = require("./sound.js");

let gameLoop;

window.onload = function() {
  let startScreen = document.getElementById("startscreen");
  let startButton = document.getElementById("start-button");
  function hide() {
    startScreen.style.display = "none";
    startScreen.setAttribute("id", "hidden");
  }

  // game loop
  startButton.addEventListener("click", hide);
  startButton.addEventListener("click", startGame);

  let hiddenStart = document.getElementById("hidden");
  if (!hiddenStart) {
    hideStartScreen();
  }

  // toggle mute and unmute
  let volume = document.getElementById("volume");
  volume.addEventListener("click", toggleSound);
  
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let img = document.getElementById("image");

  let player = new Player(100, 300);

  // sounds and music
  let backgroundSound = new Sound("./sounds/background.mp3");
  let catSound = new Sound("./sounds/cat_pain.wav");
  let waterSound = new Sound("./sounds/water.wav");
  let mouseSound = new Sound("./sounds/mouse.mp3");
  mouseSound.sound.volume = 0.2;
  let eatingSound = new Sound("./sounds/eating.wav");
  eatingSound.sound.volume = 0.5;

  if (localStorage.getItem("sound") === "muted") {
    volume.className = "fas fa-volume-mute";
  } else {
    volume.className = "fas fa-volume-up";
    document.body.addEventListener('click', playSoundOnInteraction, { once: true });
  }
  
  function startGame () {
    gameLoop = setInterval(step, 30);  //30 fps
    player.setupInputs();
    backgroundSound.playing = false;
    catSound.playing = false;
  }

  let borders = [];
  borders.push(new Border(0, 620, 600, 25, "log"));
  borders.push(new Border(620, 520, 100, 25, "log"));
  borders.push(new Border(750, 420, 250, 25, "log"));
  borders.push(new Border(880, 320, 150, 25, "log"));
  borders.push(new Border(1200, 300, 150, 25, "log"));
  borders.push(new Border(1370, 220, 250, 25, "log")); 
  borders.push(new Border(1800, 620, 150, 25, "log")); 
  borders.push(new Border(2050, 540, 200, 25, "log")); 
  borders.push(new Border(2300, 640, 150, 25, "log"));
  borders.push(new Border(2350, 480, 150, 25, "log")); 
  borders.push(new Border(2600, 380, 200, 25, "log"));
  borders.push(new Border(2900, 280, 150, 25, "log"));
  borders.push(new Border(2550, 660, 150, 25, "log"));
  borders.push(new Border(2700, 600, 300, 25, "log")); 
  borders.push(new Border(3050, 500, 150, 25, "log"));
  borders.push(new Border(3250, 400, 240, 25, "log")); //
  borders.push(new Border(3600, 650, 500, 25, "log"));
  borders.push(new Border(-1278, 680, 1282, 100, "water"));
  borders.push(new Border(0, 680, 1282, 100, "water"));
  borders.push(new Border(1278, 680, 1282, 100, "water"));
  borders.push(new Border(2558, 680, 1282, 100, "water"));
  borders.push(new Border(3838, 680, 1282, 100, "water"));
  player.borders = borders;


  let mice = [];
  let mouse1 = new Mouse(550, 595);   // (x - 50, y, - 25)
  let mouse2 = new Mouse(930, 395);
  let mouse3 = new Mouse(1570, 195);
  let mouse4 = new Mouse(2200, 515);
  let mouse5 = new Mouse(2950, 575);
  let mouse6 = new Mouse(3490, 375);
  mice.push(mouse1);
  mice.push(mouse2);
  mice.push(mouse3);
  mice.push(mouse4);
  mice.push(mouse5);
  mice.push(mouse6);

  let fish = new Border(3700, 620, 100, 40, "fish");
  borders.push(fish);

  function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // clear the canvas before redrawing

    // draw background
    ctx.drawImage(img, -1280, 0);
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(img, 1280, 0);
    ctx.drawImage(img, 2560, 0);
    ctx.drawImage(img, 3840, 0);


    if (player.xvel > 0) {
      if (player.x < 3300 && player.x > 500) {
        ctx.translate(-player.xvel - 5, 0);
      }
    } else if (player.xvel < 0) {
      if (player.x > 500 && player.x < 3300) {
        ctx.translate(-player.xvel + 5, 0);
      }
    }
    player.draw(ctx);   //redraw the player at the new pos

    borders.forEach(border => {
      border.draw(ctx);
    })
    mice.forEach(mouse => {
      mouse.draw(ctx);
    })

    fish.draw(ctx);
  }

  function step() {  // main step function for things other than the player (like the mice)    
    player.step();

    // mouse movement
    if (mouse1.x <= 10) {
      mouse1.xvel = 4;
    } else if (mouse1.x >= 530) {
      mouse1.xvel = -4;
    }
    mouse1.step(mouse1.xvel);

    if (mouse2.x <= 735) {
      mouse2.xvel = 4;
    } else if (mouse2.x >= 930) {
      mouse2.xvel = -4;
    }
    mouse2.step(mouse2.xvel);

    if (mouse3.x <= 1360) {
      mouse3.xvel = 4;
    } else if (mouse3.x >= 1560) {
      mouse3.xvel = -4;
    }
    mouse3.step(mouse3.xvel);

    if (mouse4.x <= 2030) {
      mouse4.xvel = 3;
    } else if (mouse4.x >= 2190) {
      mouse4.xvel = -3;
    }
    mouse4.step(mouse4.xvel);

    if (mouse5.x <= 2700) {
      mouse5.xvel = 4;
    } else if (mouse5.x >= 2940) {
      mouse5.xvel = -4;
    }
    mouse5.step(mouse5.xvel);

    if (mouse6.x <= 3240) {
      mouse6.xvel = 4;
    } else if (mouse6.x >= 3430) {
      mouse6.xvel = -4;
    }
    mouse6.step(mouse6.xvel);


    let horizontalRect = {
      x: player.x + player.xvel,
      y: player.y,
      width: player.width,
      height: player.height
    }
    // vert collision rect
    let verticalRect = {
      x: player.x,
      y: player.y + player.yvel,
      width: player.width,
      height: player.height
    }

    draw();     // redraw canvas once everything has been updated

    if (player.x < 0) {
      player.x = 0;
    }

    borders.forEach (border => {
      let borderRect = {
        x: border.x,
        y: border.y,
        width: border.width,
        height: border.height
      }
      // check collision with logs
      if(checkCollision(horizontalRect, borderRect) && border.type === "log") {
        if (player.x + player.width > borderRect.x && player.y + player.height < borderRect.y) {
          player.x = player.x;
          player.yvel = 0;
        }
      }

      if(checkCollision(verticalRect, borderRect) && border.type === "log") {
        // left of log
        if (player.y - player.height + 220 < borderRect.y && player.x + player.width - 50 > borderRect.x && player.x + player.width / 2 < borderRect.x + borderRect.width / 2) {
          player.y = borderRect.y - player.height + 5;
          player.yvel = 0;
        } 
        // right of log
        if (player.y - player.height + 220 < borderRect.y && player.x + player.width - 80 < borderRect.x + borderRect.width && player.x + player.width / 2 > borderRect.x + borderRect.width / 2) {
          player.y = borderRect.y - player.height + 5;
          player.yvel = 0;
        } 
      }

      // check collision with water
      if(checkCollision(verticalRect, borderRect) && border.type === "water") {
        if (player.y + player.height - 10 > borderRect.y) {
          displayGameOver();
          gameOver();
          let vol = document.getElementById("volume");
          if (vol.className === "fas fa-volume-up") {
            catSound.play();
            waterSound.sound.volume = 0.3;
            waterSound.play();
          }
        } 
      } 

      // check collision with fish
      if(checkCollision(horizontalRect, borderRect) && border.type === "fish") {
        if (player.x + player.width - 50 > borderRect.x && player.y + player.height + 20 < borderRect.y) {
          player.x = player.x;
          gameOver();
          displayVictoryMsg();
          let vol = document.getElementById("volume");
          if (vol.className === "fas fa-volume-up") {
            eatingSound.play();
          }
        }
      }

      if(checkCollision(verticalRect, borderRect) && border.type === "fish") {
        if (player.y + player.height > borderRect.y && player.x + player.width - 50 > borderRect.x ) {
          gameOver();
          displayVictoryMsg();
          let vol = document.getElementById("volume");
          if (vol.className === "fas fa-volume-up") {
            eatingSound.play();
          }
        } 
      }  
    });

    // check collision with mice
    mice.forEach (mouse => {
      let mouseRect = {
        x: mouse.x,
        y: mouse.y,
        width: mouse.width,
        height: mouse.height
      }

      // mouse on right of cat
      if(checkCollision(horizontalRect, mouseRect) && mouse.x > horizontalRect.x) {
        if (player.x + 70 > mouseRect.x ) {
          displayGameOver();
          gameOver();
          let vol = document.getElementById("volume");
          if (vol.className === "fas fa-volume-up") {
            catSound.play();
            mouseSound.play();
          }
        }

      // mouse on left of cat
        if (player.x < mouseRect.x && mouse.x + mouse.width < horizontalRect.x) {
          displayGameOver();
          gameOver();
          let vol = document.getElementById("volume");
          if (vol.className === "fas fa-volume-up") {
            catSound.play();
            mouseSound.play();
          }
        }
      }
    });
  }

  function checkCollision(player, r2) {
    let crash = true;
    if (player.x >= r2.x + r2.width) {
      crash = false;
    } else if (player.x + player.width <= r2.x) {
      crash = false;
    } else if (player.y >= r2.y + r2.height) {
      crash = false;
    } else if (player.y + player.height <= r2.y) {
      crash = false;
    } 
    return crash;
  }

  function gameOver() {
    backgroundSound.stop();
    clearInterval(gameLoop);
  }

  function hideStartScreen() {
    // let startScreen = document.getElementById('startscreen');
    // startScreen.style.display = "none";
  }

  function displayGameOver() {
    let message = document.getElementById("game-over");
    message.style.display = "flex";
  }

  function displayVictoryMsg() {
    let message = document.getElementById("win-msg");
    message.style.display = "flex";
  }

  function toggleSound () {
    let vol = document.getElementById("volume");
    if (vol.className === "fas fa-volume-mute") {
      backgroundSound.play();
      vol.className = "fas fa-volume-up";
      localStorage.setItem("sound", "unmuted");
    } else {
      backgroundSound.stop();
      vol.className = "fas fa-volume-mute";
      localStorage.setItem("sound", "muted");
    }
  }

  function playSoundOnInteraction() {
    let vol = document.getElementById("volume");
    if (vol.className === "fas fa-volume-up") {
      backgroundSound.play();
    }
  }
}

