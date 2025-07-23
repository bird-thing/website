
let angle = 0;
function onframe(){
    angle+=1;
    let angle2 = angle * 1.5;
   
   
   
   document.body.style = "background-color:hsl(" + angle + "deg,100%,50%);--rotation:" + angle2;
   
    requestAnimationFrame(onframe);
   
}
onframe();
// if this stops working im going to explode. i had so many stupid issues with this script in specific.
// dont touch it. do not touch it unless the world will end if you dont touch it. 
// this script is awful and tweaking it at all breaks it.
// ... im also not actually using it anywhere on my website but if i need it and its broken i will be GRHADSHAFHSADFHD