
let angle = 0;
function onframe(){
    angle+=1;
    let angle2 = angle * 1.5;
   
   
   
   document.body.style = "background-color:hsl(" + angle + "deg,100%,50%);--rotation" + angle2 + "deg";

    requestAnimationFrame(onframe);
   
}
onframe();