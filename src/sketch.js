const SCENE_WIDTH = 900;
const SCENE_HEIGHT = 650;


let ground;


function setup() {
  createCanvas(SCENE_WIDTH, SCENE_HEIGHT);
  background(220);
  ground = new Ground({width: SCENE_WIDTH, height: SCENE_HEIGHT-150, sceneWidth: SCENE_WIDTH, sceneHeight: SCENE_HEIGHT});
  ground.show();
}

function draw() {
}
