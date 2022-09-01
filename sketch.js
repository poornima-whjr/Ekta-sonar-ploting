var START = 2;
var PLAY = 1;
var END = 0;

var submarine;
var submarineImg;
var sea;
var invBg;
var gameState = 2;
var obstacleGroup;
var start, startImg;
var play, playImg;
var gameOver, gameOverImg;

var sonar, theme;
var jumpSound;

var diverImg, whaleImg;
var score = 0;


var wall;
var sonarimg, sonarobj

function preload() {
  submarineImg = loadImage("images/sub.png")
  seaImg = loadImage("images/bg.png");
  diverImg = loadImage("images/obs2.png");
  whaleImg = loadImage("images/obs1.png");
  startImg = loadImage("images/1120358.jpg");
  playImg = loadImage("images/Play.png");
  gameOverImg = loadImage("images/over.png")
  sonar = loadSound("sounds/sonar.mp3");
  theme = loadSound("sounds/theme.mp3")
  jumpSound = loadSound("sounds/jump.mp3")
  sonarimg = loadAnimation("images/sonar/1.gif",
    "images/sonar/3.gif",
    "images/sonar/5.gif",
    "images/sonar/7.gif",
    "images/sonar/9.gif",
    "images/sonar/11.gif",
    "images/sonar/13.gif",
    "images/sonar/15.gif",
    "images/sonar/17.gif",
    "images/sonar/19.gif",
    "images/sonar/21.gif",
    "images/sonar/23.gif",
    "images/sonar/25.gif",
    "images/sonar/27.gif",
    "images/sonar/29.gif",
    "images/sonar/31.gif",
    "images/sonar/33.gif",
    "images/sonar/35.gif",
    "images/sonar/37.gif",
    "images/sonar/39.gif",
    "images/sonar/41.gif",
    "images/sonar/43.gif",
    "images/sonar/45.gif",
    "images/sonar/47.gif",
    "images/sonar/49.gif",
    "images/sonar/51.gif",
    "images/sonar/53.gif",
    "images/sonar/55.gif",
    "images/sonar/57.gif",
    "images/sonar/59.gif",
    "images/sonar/61.gif",
    "images/sonar/63.gif",
    "images/sonar/65.gif",
    "images/sonar/67.gif",
    "images/sonar/69.gif",
    "images/sonar/71.gif",
    "images/sonar/73.gif",
    "images/sonar/75.gif",
    "images/sonar/77.gif",
    "images/sonar/79.gif",
    "images/sonar/81.gif",
    "images/sonar/83.gif",
    "images/sonar/85.gif",
    "images/sonar/87.gif",
    "images/sonar/89.gif",
    "images/sonar/91.gif",
    "images/sonar/93.gif",
    "images/sonar/95.gif",
    "images/sonar/97.gif",
    "images/sonar/99.gif",
    "images/sonar/101.gif",
    "images/sonar/103.gif",
    "images/sonar/105.gif",
    "images/sonar/107.gif",
    "images/sonar/109.gif",
    "images/sonar/111.gif",
    "images/sonar/113.gif",
    "images/sonar/115.gif",
    "images/sonar/117.gif"
  )

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sea = createSprite(500, windowHeight / 2, 10, 10);
  sea.addImage(seaImg);
  start = createSprite(windowWidth / 2, windowHeight / 1.9, 20, 20);
  start.addImage(startImg);

  gameOver = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  gameOver.addImage(gameOverImg);

  play = createSprite(windowWidth / 2, windowHeight / 1.25, 20, 20);
  play.addImage(playImg);
  play.scale = 0.5;

  submarine = createSprite(windowWidth / 6, windowHeight / 2, 5, 5);
  submarine.addImage(submarineImg);

  submarine.scale = 1.5;
  invBg = createSprite(windowWidth / 2, windowHeight, windowWidth, 20);

  wall = createSprite(-350, height / 2, 100, height + 100)

  obstacleGroup = new Group();

  theme.setVolume(0.1);

  sonarobj = createSprite(width - 150, 100)
  sonarobj.addAnimation("spinning", sonarimg)
  sonarobj.scale = 0.5
  sonarobj.visible = false

  submarine.setCollider("rectangle", 0, 20, 300, 70)
  submarine.debug = false;
}

function draw() {



  if (gameState === START) {
    start.visible = true;
    play.visible = true;
    submarine.visible = false;
    sea.visible = false;
    gameOver.visible = false;
    submarine.y = windowHeight / 2;
    if (mousePressedOver(play)) {
      theme.loop()
      gameState = PLAY;
      sonarobj.visible = true
    }
  }


  if (gameState === PLAY) {
    start.visible = false;
    play.visible = false;
    submarine.visible = true;
    sea.visible = true;

    sea.velocityX = -20;

    if (sea.x < 0) {

      sea.x = sea.width / 2;
    }


    if (keyWentDown("up")) {
      submarine.velocityY = -10;
    }
    if (keyWentUp("up")) {
      submarine.velocityY = 0;

    }
    if (keyWentUp("down")) {
      submarine.velocityY = 0;
    }
    if (keyWentDown("down")) {
      submarine.velocityY = 10;
    }
    invBg.visible = false;

    obstacles();


    obstacleGroup.overlap(wall, increaseScore)


    if (submarine.isTouching(obstacleGroup)) {
      theme.stop()
      gameState = END;
      sonarobj.visible=false
    }


  }


  if (gameState === END) {
    sea.velocityX = 0;
    obstacleGroup.destroyEach();
    gameOver.visible = true;
    submarine.velocityY = 0;
    if (mousePressedOver(gameOver)) {
      reset();
    }

  }
  drawSprites();

  for (var i = 0; i < obstacleGroup.length; i++) {

    var xpos = (width - 150) + ((obstacleGroup.get(i).x - submarine.x) / width * 50)
    var ypos = 100 + (obstacleGroup.get(i).y - submarine.y) / height * 100
    console.log(xpos)
    push()
    strokeWeight(7)
    stroke("red")
    if (ypos < 180 && ypos > 20) {
      point(xpos, ypos)
    }
    pop()

  }

  fill("white");
  textSize(20);
  text("Score= " + score, 30, 20);

  //image(sonarimg, width-250,50,200,150)

}

function increaseScore(obs) {
  score = score + 10
  obs.remove()
  //sonar.stop()
  jumpSound.play()
}

function obstacles() {

  if (World.frameCount % 120 === 0) {
    var obstacle = createSprite(width, 200, 20, 20);
    obstacle.y = Math.round(random(100, height - 100));
    //create switch statement
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(whaleImg);
        obstacle.setCollider("rectangle", 0, 0, 650, 200)
        break;
      case 2: obstacle.addImage(diverImg);
        break;
      default: break;


    }

    obstacle.velocityX = -(20 + (score / 2));
    obstacle.scale = 0.5;
    obstacle.depth = submarine.depth + 1;
    obstacleGroup.add(obstacle);
    obstacle.debug = false;
  }
}

function reset() {
  gameState = START;
  score = 0;

}