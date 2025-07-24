// BACKUP OF GAME.JS IN CASE THINGS GO DOWNHILL AS WE MODIFY IT FOR FUN BECAUSE THIS WAS FRUSTRATING
// TO FIX IN SO MANY PLACES I WILL GO INSANE IF I HAVE TO REDO ALL THAT
// ESPECIALLY THE STUPID SELECT MOVE PURPLE MAUVE MERGING INTO AN UNHOLY
// PURPLEM AND THAT WAS AWFUL AND I FIXED IT SO IT BETTER STAY FIXED IN THIS BACKUP
// IM ACTUALLY BACKING IT UP ON TO A LOCAL THING AND THEN EMAILING IT TO MYSELF
// actually probably not i dont feel like doing that much


let points = 0; // added points because its a game and winning is cool
// thinking about how to implement the other boards, see further comments and notes
const BOARDS = [
    {
        cells: [
            ["E", "L", "W", "Y", "C"],
            ["Y", "L", "O", "A", "N"],
            ["U", "B", "L", "E", "E"],
            ["E", "L", "P", "M", "V"], 
            ["P", "U", "R", "A", "U"]], 
        words: ["CYAN", "YELLOW", "PURPLE", "MAUVE", "BLUE"]
    }, // i really hope this wasnt written by ai originally...
    {
        cells: [
            ["E", "K", "O", "A", "P"],
            ["A", "W", "L", "I", "R"],
            ["N", "S", "F", "A", "T"],
            ["L", "E", "E", "R", "A"],
            ["A", "G", "G", "U", "J"]],
        words: ["TAPIR", "EAGLE", "JAGUAR", "SNAKE", "WOLF"]
    },
    {
        cells: [
            ["H", "C", "N", "A", "N"],
            ["Y", "R", "A", "A", "A"],
            ["R", "E", "A", "Y", "B"],
            ["F", "P", "P", "E", "R"],
            ["I", "G", "A", "P", "A"]],
        words: ["CHERRY", "PAPAYA", "BANANA", "PEAR", "FIG"] //mango not being in here is a crime
    },
]
function make_cell_list() {
    let cells = Array.from(document.getElementById("cell-holder").children) //cell yeah
    let cell_board = [];
    for (let index = 0; index < 5; index++) {
        cell_board.push(cells.slice(index * 5, index * 5 + 5))

    }
    return cell_board;
}
const CELLS = make_cell_list();
//console.log(CELLS); |||||||||||||| just had this here to like check it worked and stuff

function setup_game(board) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            CELLS[y][x].innerHTML = board[y][x]
        }
    }
}

setup_game(BOARDS[0].cells);
document.getElementById("words").innerHTML = "Words to spell: " + BOARDS[0].words.join(", ");

/* if (document.getElementById('board0').checked) {

    setup_game(BOARDS[0].cells);
    document.getElementById("words").innerHTML = "Words to spell: " + BOARDS[0].words.join(", ");
}
if (document.getElementById('board1').checked) {

    setup_game(BOARDS[1].cells);
    document.getElementById("words").innerHTML = "Words to spell: " + BOARDS[1].words.join(", ");
}
if (document.getElementById('board2').checked) {

    setup_game(BOARDS[2].cells);
    document.getElementById("words").innerHTML = "Words to spell: " + BOARDS[2].words.join(", ");
}*/
// format this better, refactor so it can be concise and then add
// probably will use a for loop of some sort to quickly check what was selected
// not sure how i can make it constantly check without lagging things out or causing bugs
// for now it works for board 1 (techincally board[0]) and you would have to brute force it for other boards
// maybe a non-radio input but i LIKE radio buttons in this context. textbox would be annoying.

let selected_x = -1;
let selected_y = -1;
function select(x, y) {
    let cell = CELLS[y][x];
    if(cell.innerHTML.length>0){
        if(selected_x>=0&&selected_y>=0){
            CELLS[selected_y][selected_x].classList.remove("selected"); //this works. if it stops working so help me
                                                                        // i will crash out. because js is awful and makes up bugs
        }
        selected_x = x;
        selected_y = y;
        cell.classList.add("selected");
    }
}
function unselect(x, y) { // homebrewed, didnt feel like copying what was on the screen. might be why things break. 
    let cell = CELLS[y][x]; // but thats a small price to pay for sticking it to the man or something
    if(cell.classList.contains("selected")){ // works really well and makes me happy
        selected_x = -1;
        selected_y = -1;
        cell.classList.remove("selected");
    }
}
function can_move(x, y) {
    let is_next_to = Math.abs(selected_x - x) + Math.abs(selected_y - y) == 1;
    for(let z=0; z<=4; z++){
        if(CELLS[y][x].innerHTML == BOARDS[0].words[z])
        {
            unselect(selected_x, selected_y);
            unselect(x, y);
            // console.log(CELLS[y][x].innerHTML+" cells");
            // console.log(BOARDS[0].words[z]+" boards words"); these should work so i commented out the console logging
            // but if it stops working uncomment the console logging to bugfix
            is_next_to = 1;
            // in order to prevent fusion of completed words, i made it so it unselects but it runs into an error. it works
            //but not exactly how i planned. its also fudging an is_next_to. 
            // ill fix this later maybe. but it works for now.
            // not sure how im gonna handle incorrect words and if they can be undone
        }}
    
    return selected_x>=0&&selected_y>=0 && is_next_to && CELLS[y][x].innerHTML.length > 0;
}

function move(x, y) {
    CELLS[y][x].innerHTML = CELLS[selected_y][selected_x].innerHTML+ CELLS[y][x].innerHTML;
    CELLS[selected_y][selected_x].innerHTML = "";
    select(x,y);
    for(let z=0; z<=4; z++){
    if(CELLS[y][x].innerHTML == BOARDS[0].words[z])
    {
        unselect(x,y);
      //  console.log(BOARDS[0].words[0])  -----------------.
        if(points<5){              //                        |______ these console logs could be next to each other but theyre not
        points++;                 //                         /              because i feel like it
   // console.log(points) __________________________________/
}
         if (points>=5){
            alert("you won!"); //works! as of 2:30pm on 7/23/2025
        }
    }}
}


function on_click(x, y) {
    for(let z=0; z<=4; z++){
        if(CELLS[y][x].innerHTML == BOARDS[0].words[z])
        {
            unselect(selected_x, selected_y);
            unselect(x, y);
            console.log(CELLS[y][x].innerHTML+" cells");
            console.log(BOARDS[0].words[z]+" boards words"); // i dont know if this is necessary but it helps the
            // whole problem with word amalgamations i THINK and i dont want to take it out
            // also if this breaks slightly it might make all the letters disappear. dont ask me why, i dont know.
        }}
    if (selected_x == x && selected_y == y) {
        unselect(x, y);
    } else if (can_move(x, y)) {
        move(x, y);
    } else {
        select(x, y);
    }
    
}