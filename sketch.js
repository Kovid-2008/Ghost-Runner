var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "PLAY";
var PLAY; 
var END;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300,20,20);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost=createSprite(300,300,10,10);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.35;
  


}

function draw(){
   background(0);
  if (gameState === "PLAY") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    obstacles();
    
    
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
      climbersGroup.collide(ghost);
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "END"
    }
    
    drawSprites();
    
  }
  
  if (gameState === "END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
 
}



function obstacles(){
  if(frameCount % 150 === 0){
    var door = createSprite(600,0,10,10);
    ghost.depth=door.depth+1;
    var climber = createSprite(600,50,10,10);
    var invisibleBlock = createSprite(600,55,100,1);
    
    climber.x=Math.round(random(100,500));
    door.x=climber.x;
    invisibleBlock.x=door.x;
    
    climber.velocityY=2;
    door.velocityY=2;
    invisibleBlock.velocityY=2;
    
    door.addImage("door",doorImg);
    climber.addImage("climber",climberImg);
    invisibleBlock.visible=false;
    
    door.lifetime=1000;
    climber.lifetime=1000;
    invisibleBlock.lifetime=1000;
  
  
  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
  
  }

  
}

