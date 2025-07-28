const widget_container = document.getElementById("widget-container");
const stores = document.getElementsByClassName("store");
const score_element = document.getElementById("score");
let score = 5;
let super_pipe_count = 0;
let clang_count = 0;
let pipe_count = 0;
function changeScore(amount) {
    score += amount;
    score_element.innerHTML = "Score: " + score;
    // Update the stores to block buying expensive boxes
    for (let store of stores) {
        let clang_cost = 5;
        let pipe_cost = 15;
        let super_pipe_cost = 150;
        if (clang_count > 0) {
            clang_cost = 5 * clang_count;

        }
        if (pipe_count > 0) {
            pipe_cost = 15 * pipe_count;

        }
        if (super_pipe_count > 0) {
            super_pipe_cost = 150 * super_pipe_count;

        }
        
        console.log(clang_cost + " clang cost")
        console.log(pipe_cost + " pipe cost")
        console.log(super_pipe_cost + " super pipe cost")
        document.getElementById("clang_cost_text").innerHTML = clang_cost+" points";
    document.getElementById("pipe_cost_text").innerHTML = pipe_cost+" points";
    document.getElementById("super_pipe_cost_text").innerHTML = super_pipe_cost+" points";
    let a = super_pipe_count * 100;
    if(super_pipe_count==0){
        a = 100;
    }
    else{
        a = super_pipe_count * 100 + 100;
    }
    document.getElementById("super_pipe_output_amnt").innerHTML = "+"+a+" auto";
        if (score < clang_cost) {
            document.getElementById('clang').setAttribute("broke", "");
        } else {
            document.getElementById("clang").removeAttribute("broke");
        }
        if (score < pipe_cost) {
            document.getElementById("pipe").setAttribute("broke", "");
        } else {
            document.getElementById("pipe").removeAttribute("broke");
        }
        if (score < super_pipe_cost) {
            document.getElementById("Super-pipe").setAttribute("broke", "");
            
        } else {
            document.getElementById("Super-pipe").removeAttribute("broke");
            
        }
    }
    
}
changeScore(0);

function buy(store) {
    
    let clang_cost = 5;
    let pipe_cost = 15;
    let super_pipe_cost = 150;
    if (clang_count > 0) {
        clang_cost = 5 * clang_count;

    }
    if (pipe_count > 0) {
        pipe_cost = 15 * pipe_count;

    }
    if (super_pipe_count > 0) {
        super_pipe_cost = 150 * super_pipe_count;
        
    }
    // if clang already exists
    if (store.getAttribute("name") === "clang") {
        if (score < clang_cost) {
            return;
        }
        clang_count++;
        document.getElementById("clang_cost_text").innerHTML = clang_cost+" points";
        changeScore(-clang_cost);
    }
    // if pipe already exists
     if (score < pipe_cost && store.getAttribute("name") === "pipe") {
        console.log("DO NOT");
        return;}
        else{ if (store.getAttribute("name") === "pipe") {
      
        
        pipe_count++;
        document.getElementById("pipe_cost_text").innerHTML = pipe_cost+" points";
        changeScore(-pipe_cost);
    }}
    // If Super-pipe already exists
    const superpipe = document.querySelector("#widget-container #super-pipe")?.parentElement;
    if(store.getAttribute("name") === "Super-pipe" && superpipe && score < super_pipe_cost){
        console.log("DO NOT super")
        return;

    }
    
    if (store.getAttribute("name") === "Super-pipe" && superpipe) {
       
        if(score < super_pipe_cost || store.hasAttribute("broke")){
            console.log("awful")
            return;
        }else if(score>=super_pipe_cost){
        super_pipe_count++;
        superpipe.setAttribute("reap", (parseInt(superpipe.getAttribute("reap")) + 100));
        document.body.style = "--pipe-count: " + super_pipe_count + ";"
        document.getElementById("super_pipe_cost_text").innerHTML = super_pipe_cost+" points";
        changeScore(-super_pipe_cost);
        
        return;}
    }
    
   
    
    const widget = store.firstElementChild.cloneNode(true);
    widget.onclick = () => {
        harvest(widget);
    }
    widget_container.appendChild(widget);

    if (widget.getAttribute("auto") == 'true') {
        widget.setAttribute("harvesting", "");
        setup_end_harvest(widget);
    }
}
function checkCost(){
    if(score>=150){
        buy(event.currentTarget);
    }
    else if(score<150){
        document.getElementById("Super-pipe").setAttribute("broke", "");
        return;

    }
}
function setup_end_harvest(widget) {
    setTimeout(() => {
        // Remove the harvesting flag
        widget.removeAttribute("harvesting");
        // If automatic, start again
        if (widget.getAttribute("auto") == 'true') {
            harvest(widget);
        }
    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}
function harvest(widget) {
    // Only run if currently not harvesting
    if (widget.hasAttribute("harvesting")) return;
    // Set harvesting flag
    widget.setAttribute("harvesting", "");

    // If manual, collect points now
    changeScore(parseInt(widget.getAttribute("reap")));
    showPoint(widget);

    setup_end_harvest(widget);
}
function showPoint(widget) {
    let number = document.createElement("span");
    number.className = "point";
    number.innerHTML = "+" + widget.getAttribute("reap");
    number.onanimationend = () => {
        widget.removeChild(number);
    }
    widget.appendChild(number);
}
changeScore(0);