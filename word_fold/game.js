let points = 0; // added points because its a game and winning is cool
// thinking about how to implement the other boards, see further comments and notes
let fontsize = 50 // this is the size of font, it will change
const LISTBOARDS = ["board0", "board1", "board2"];
const BOARDS = [
    {
        cells: [
            ["A", "Y", "G", "E", "B"],
            ["L", "E", "G", "A", "K"],
            ["G", "W", "O", "N", "N"],
            ["N", "I", "C", "T", "O"],
            ["F", "A", "L", "A", "L"]],
        words: ["BEAK", "LAYEGG", "FALCON", "TALON", "WING"]
    }, // gabriellas board 
    {
        cells: [
            ["W", "N", "O", "R", "I"],
            ["O", "H", "N", "C", "K"],
            ["L", "C", "K", "E", "T"],
            ["E", "S", "J", "R", "E"],
            ["O", "K", "S", "T", "J"]],
        words: ["TRICK", "JOKES", "JESTER", "CLOWN", "HONK"]
    }, // also gabriellas board, shes really good at making them
    {
        cells: [
            ["A", "P", "I", "L", "B"],
            ["I", "M", "A", "R", "I"],
            ["N", "O", "T", "P", "L"],
            ["R", "B", "A", "A", "E"],
            ["T", "A", "R", "C", "N"]],
        words: ["TRAIN", "CAR", "AIRPLANE", "BOAT", "BLIMP"] // has to add up to 25 letters
    }, // yay it works. i made this one :3

    
    // {
    //     cells:[
    //         ["","","","","",],
    //         ["","","","","",],
    //         ["","","","","",],
    //         ["","","","","",],
    //         ["","","","","",]],
    //     words: ["","","","",""]
    // },
    // template
]
function make_cell_list() { // this makes the array but not with data for each letter yet. just empty.
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
function get_radio() { 
   for(let i = 0; i<BOARDS.length; i++){
    if (document.getElementById(LISTBOARDS[i]).checked) { 

        setup_game(BOARDS[i].cells);
        document.getElementById("words").innerHTML = "Words to spell: " + BOARDS[i].words.join(", ");
    }}
   
}
let selected_x = -1;
let selected_y = -1;
function select(x, y) {
    let cell = CELLS[y][x];
    if (cell.innerHTML.length > 0) {
        if (selected_x >= 0 && selected_y >= 0) {
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
    if (cell.classList.contains("selected")) { // works really well and makes me happy
        selected_x = -1;
        selected_y = -1;
        cell.classList.remove("selected");
    }
}
function can_move(x, y) {
    let is_next_to = Math.abs(selected_x - x) + Math.abs(selected_y - y) == 1;
    for (let z = 0; z <= 4; z++) {
        if (CELLS[y][x].innerHTML == BOARDS[0].words[z] || CELLS[y][x].innerHTML == BOARDS[1].words[z] || CELLS[y][x].innerHTML == BOARDS[2].words[z]) {
            unselect(selected_x, selected_y);
            unselect(x, y);
            is_next_to = 1;
            // console.log(CELLS[y][x].innerHTML+" cells");
            // console.log(BOARDS[0].words[z]+" boards words"); these should work so i commented out the console logging
            // but if it stops working uncomment the console logging to bugfix

            // in order to prevent fusion of completed words, i made it so it unselects but it runs into an error. it works
            //but not exactly how i planned. its also fudging an is_next_to. 
            // ill fix this later maybe. but it works for now.
            // not sure how im gonna handle incorrect words and if they can be undone
        }
    }

    return selected_x >= 0 && selected_y >= 0 && is_next_to && CELLS[y][x].innerHTML.length > 0;
}

function move(x, y) {
    CELLS[y][x].innerHTML = CELLS[selected_y][selected_x].innerHTML + CELLS[y][x].innerHTML;
    CELLS[selected_y][selected_x].innerHTML = "";
    select(x, y);
    for (let z = 0; z <= 4; z++) {
        if (CELLS[y][x].innerHTML == BOARDS[0].words[z] || CELLS[y][x].innerHTML == BOARDS[1].words[z] || CELLS[y][x].innerHTML == BOARDS[2].words[z]) {
            unselect(x, y);
            //  console.log(BOARDS[0].words[0])  -----------------.
            if (points < 5) {              //                        |______ these console logs could be next to each other but theyre not
                points++;                 //                         /              because i feel like it
                // console.log(points) __________________________________/    he he
            }
            if (points >= 5) {
                alert("you won!"); //works! as of 2:30pm on 7/23/2025
                points = 0;
            }
        }
    }
}
function on_click(x, y) {
    for (let z = 0; z <= 4; z++) {
        if (CELLS[y][x].innerHTML == BOARDS[0].words[z] || CELLS[y][x].innerHTML == BOARDS[1].words[z] || CELLS[y][x].innerHTML == BOARDS[2].words[z]) {
            unselect(selected_x, selected_y);
            unselect(x, y);
            console.log(CELLS[y][x].innerHTML + " cells");
            console.log(BOARDS[0].words[z] + " boards words"); // i dont know if this is necessary but it helps the
            // whole problem with word amalgamations i THINK and i dont want to take it out
            // also if this breaks slightly it might make all the letters disappear. dont ask me why, i dont know.
        }
    }
    if (selected_x == x && selected_y == y) {
        unselect(x, y);
    } else if (can_move(x, y)) {
        move(x, y);
    } else {
        select(x, y);
    }

}