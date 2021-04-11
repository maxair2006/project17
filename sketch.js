var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, jungleImage, invisibleGround;
var sTime=0;
var score=0;
var gameOverImg;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage =loadImage("jungle.png");
  gameOverImg = loadImage("gOver.png");
}



function setup() {
  createCanvas(400, 400);
  ground=createSprite(350, 200, 900, 10);
  ground.addImage(jungleImage);
  ground.scale=0.75;
  ground.velocityX=-4;
  
  monkey=createSprite(80, 325, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  //monkey.debug=true;
  
  invisibleGround = createSprite(200,335,400,10);
  invisibleGround.visible = false;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup =createGroup();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score, 300, 50);
    
  stroke("black");
  textSize(20);
  fill("black");
  text("survival Time:"+sTime, 100, 50);
  
}


function draw() {
  background("lightblue");
  if(gameState===PLAY){
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
  
    if(ground.x<20){
        ground.x = 300;
    }
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup[0].destroy();
      score=score+2;
      
    }
    
    food();
    obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=monkey.scale-0.045;
      obstacleGroup.destroyEach();
    } 
    if(monkey.scale<0.05){
      gameState=END;
    }
    console.log(monkey.scale);
    sTime=Math.ceil(frameCount/frameRate());
    
    if(score===50){
      gameState=WIN;
    }
    
  }
  
  if(gameState===END){
     background("white");
     var GO = createSprite(200, 200, 20, 20);
     GO.addImage(gameOverImg);
     GO.scale=0.5;
     monkey.destroy();
     obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     ground.velocityX=0;
     ground.destroy();
    
    stroke("red");
    textSize(20);
    fill("red");
    text("Score:"+score, 300, 280);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time:"+sTime, 50, 280);
  }
  monkey.collide(invisibleGround);
  
  drawSprites();

}
if (gameState===WIN){
  background("black")
  fill("white");
  stroke("yellow");
  textSize(40);
  text("YOU WIN!", 150, 200)
}
function food(){
  if(frameCount%80===0){
    var banana = createSprite(400, 200, 10, 10);
    banana.y=Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=Math.round(random(-2,-8));
    banana.lifetime=450;
    //banana.debug=true;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%300===0){
    var rock = createSprite(410, 305, 20, 20);
    rock.addImage(obstacleImage);
    rock.velocityX=ground.velocityX;
    rock.scale=0.2; 
    rock.lifetime=450;
    monkey.collide(rock);
    //rock.debug=true;
    rock.setCollider("circle", 0, 0, 225);
    obstacleGroup.add(rock);
  }
}




