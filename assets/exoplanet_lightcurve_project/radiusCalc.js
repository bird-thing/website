let solarRadius = 2; //2 times the size of the sun
let transitDepth = 0.006; // 0.6% dips
function doMath(){
   document.getElementById("solarRadii").value = solarRadius;
   document.getElementById("depth").value = transitDepth;
   let x = Math.sqrt(transitDepth)
   let y = x*solarRadius*100;
   let z = Math.round(y)/10; // rounds up and then divides so its like the 1.5 or whatever
   document.getElementById("planetRadius").innerHTML = z;
}