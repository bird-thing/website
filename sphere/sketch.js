let img;
function preload(){
  img = loadImage('https://tse1.mm.bing.net/th/id/OIP.01En0aLvIFIdw6vwyZIrowHaEK?rs=1&pid=ImgDetMain&o=7&rm=3');
}
function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
clear()
  // panorama(img);
   // directionalLight(240, 255, 255, 1, 1, 0);
  imageLight(img);
   noStroke();
  specularMaterial(50);
  shininess(200);
  metalness(50);
  orbitControl();
  // box();
  sphere(100)
}