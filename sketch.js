//Create variables here
var dog,happyDog,dogImg,happyDogImg;
var database;
var foodS,foodStock;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  dog = createSprite(250,280,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  database = firebase.database()
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  foodS = new Food(20)
}


function draw() {  
background(46,139,87);
fill("white");
textSize(15)
text("NOTE: Press UP_ARROW Key To Feed Bolt Milk",100,20);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS.foodStock);
  dog.addImage(happyDogImg);
}
  drawSprites();
  //add styles here

}

function readStock(data){

foodS.foodStock = data.val();
}

function writeStock(x){
  x = x-1

  
  database.ref('/').set({
    Food:x,
    lastFed: hour()
  })
}



