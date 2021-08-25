const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite
const Composites = Matter.Composites
const Constraint = Matter.Constraint
let engine
let world

var rope, obstacle, ball, link, ground, obstacles, box,Rwall, Lwall, win
obstacles = []
win = 0

function setup() {
  createCanvas(600,600);
  engine = Engine.create();
  world = engine.world;

  rope = new Rope(5,{x:300,y:-50});
  ball = new Ball(300,0,30)
  ground = new Obstacle(300,600,1000,2)
  Rwall = new Obstacle(600,300,2,1002)
  Rwall = new Obstacle(0,300,2,1002)

  Composite.add(rope.body,ball);

  link = new Link(rope, ball.body)

  button = createButton("Click to release")
  button.position(325,20)
  button.size(50,50);
  button.mouseClicked(drop);

  button = createButton("Click to blow")
  button.position(475,160)
  button.size(50,50);
  button.mouseClicked(airBlow);

  var x = random(0,600)

 box = new Obstacle(x,475,50,50)

}

function draw() 
{
  background(200);
  Engine.update(engine);
  rope.show()
  ball.show()
  ground.show()
  if (win == 1) {
    text("You Win",295,315)
  }
  else if (ball.body.position.y>550) {
    text("You Lose",295,315)

  }

  if (frameCount % 60 == 0) {
    var x = random(0,600)
    obstacle = new Obstacle(x,300,25,10)
    console.log(x)
    obstacles.push(obstacle)
  }
  for (var i = 0; i < obstacles.length; i++){
    obstacles[i].show()
  }
  box.show()
  if (collide(ball.body,box.body) == true){
    win = 1
  }
}

function drop()
{
  rope.break();
  link.detach();
  link = null; 
}
function airBlow() {
  Matter.Body.applyForce(ball.body,{x:0,y:0},{x:-0.05, y:0})
}

function collide(body,body2)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,body2.position.x,body2.position.y);
          if(d<=68)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

