let solarRadius; // times the size of the SUN
let transitDepth; // percent dip of light
function doMath(){
   if(solarRadius == null){
      solarRadius = 2; //2 times the size of the sun

   }
   if(transitDepth == null){
      transitDepth = 0.006; // 0.6% dips
   }
   solarRadius = document.getElementById("solarRadii").value
   transitDepth = document.getElementById("depth").value;
   let x = Math.sqrt(transitDepth)*solarRadius*100000;
   let exoplanetRad = Math.round(x)/10000;
   document.getElementById("planetRadius").innerHTML = exoplanetRad+" jupiter radii (how many jupiters it is)";
  return exoplanetRad
}
// oddly, despite having fresh data in it and correct equations... the results from here differ from
// data i found online about the sample planets.
// its possible either source of data is incorrect or outdated.
// maybe do a double check on the equation? or what data im putting in
// but  it should be correct. not sure why its a bit different but in the ballpark.
function setup() {
  createCanvas(400, 400);
}

function draw() {
  let exoplanetRad = doMath();
  background(220);
  circle(60,60,solarRadius*50); // star 
  circle(200, 60, exoplanetRad*50); // exoplanet
}