// ===== Get Element
// Menu
const btnLvl_3 = document.querySelectorAll(".menu .box-lvl")[0];
const btnLvl_4 = document.querySelectorAll(".menu .box-lvl")[1];
const btnLvl_5 = document.querySelectorAll(".menu .box-lvl")[2];
const btn_Play = document.querySelector(".menu .play");
// Status
const stsText = document.querySelector(".status .sts-text");
const btn_PlayAgain = document.querySelectorAll(".status .btn button")[0];
const btn_X = document.querySelectorAll(".status .btn button")[1];
// Other Var
let btnSort;       // button sort board
let scrnBrd;            // Screen board play "3x3"|"4x4"|"5x5"
let list_BrdBox;        // list board box 1-8 | 1-15 | 1-24
let list_idxSpan = [];      // position of box/span in board [x,y]. idx 0 = box 0. Array in Array
let mirror_idxSpan = [];    // mirror of list_idxSpan in string
let move;
let blue1 = "#1ae7ff";
let blue2 = "#00c8f0";

// ===== Button
window.onload = () => {
    // Menu
    btnLvl_3.addEventListener("click", () => {SetLvl("3x3")});
    btnLvl_4.addEventListener("click", () => {SetLvl("4x4")});
    btnLvl_5.addEventListener("click", () => {SetLvl("5x5")});
    btn_Play.addEventListener("click", () => {
        SetScrn(scrnBrd); 
        RandomBrd(); 
        SetBrdBtn();});
    // Status
    btn_PlayAgain.addEventListener("click", () => {
        list_idxSpan = [];
        mirror_idxSpan = [];
        RandomBrd();
        SetScrn(scrnBrd);});
    btn_X.addEventListener("click", () => {SetScrn(scrnBrd)});
} 

// ===== Function
function SetLvl(lvl){   // "3x3"|"4x4"|"5x5"
    scrnBrd = lvl;
    list_BrdBox = document.querySelectorAll(`.board${lvl} .area span`);
    // Set Button Color
    function funcColorSet(clr3, clr4, clr5){
        let list_btn = [btnLvl_3, btnLvl_4, btnLvl_5];
        let list_clr = [clr3, clr4, clr5];
        for (let i = 0; i < list_btn.length; i++) {
            list_btn[i].style.background = list_clr[i];
            list_btn[i].children[0].style.background = list_clr[i];
        }
    }
    // Check lvl
    if (lvl == "3x3"){funcColorSet(blue2, blue1, blue1);
    }else if (lvl == "4x4"){funcColorSet(blue1, blue2, blue1);
    }else if (lvl == "5x5"){funcColorSet(blue1, blue1, blue2); }
}
function SetScrn(screen) {  // "MENU"|"3x3"|"4x4"|"5x5"|"STATUS"
    // Var
    const MENU = document.querySelector(".menu");
    const BOARD3 = document.querySelector(".board3x3");
    const BOARD4 = document.querySelector(".board4x4");
    const BOARD5 = document.querySelector(".board5x5");
    const STATUS = document.querySelector(".status");
    // Screen Play or Hidden
    function funcScreenSet(menu, brd3, brd4, brd5, status){
        let list_scrn = [MENU, BOARD3, BOARD4, BOARD5, STATUS];
        let list_argum = [menu, brd3, brd4, brd5, status];
        // Add Class
        for (let i = 0; i < list_scrn.length; i++) {
            list_scrn[i].classList.add(list_argum[i])
        }
        // Remove Class
        for (let i = 0; i < list_scrn.length; i++) {
            // if argum "play" -> remove "hidden"
            if (list_argum[i] == "play"){ list_scrn[i].classList.remove("hidden")
            // if argum "hidden" -> remove "play"
            }else{ list_scrn[i].classList.remove("play") }
        }
    }
    // Check Argument then Call Func in Top
    if (screen == "MENU"){          // MENU
        funcScreenSet("play", "hidden", "hidden", "hidden", "hidden")
    }else if (screen == "3x3"){   // 3x3
        funcScreenSet("hidden", "play", "hidden", "hidden", "hidden")
    }else if (screen == "4x4"){   // 3x3
        funcScreenSet("hidden", "hidden", "play", "hidden", "hidden")
    }else if (screen == "5x5"){   // 3x3
        funcScreenSet("hidden", "hidden", "hidden", "play", "hidden")
    }else if (screen == "STATUS"){  // STATUS
        funcScreenSet("hidden", "hidden", "hidden", "hidden", "play")
    }
}
function SortBrd(screen) {
    function funcSortSet(move, size) {
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                // set main location in all box
                list_BrdBox[x+(y*size)].style.transform = `translate(${x*move}px, ${y*move}px)`;
                list_idxSpan[x+(y*size)] = [x,y];
                mirror_idxSpan[x+(y*size)] = `${x},${y}`;
            }
        }
    }
    // Check Board Size
    if (screen == "3x3"){ funcSortSet(150, 3);
    }else if (screen == "4x4"){ funcSortSet(112.5, 4);
    }else if (screen == "5x5"){ funcSortSet(90, 5); }
}
function RandomBrd() {
    // move = distance between box | size = size board 3x3/4x4/5x5(val = 3/4/5) |
    function brdRandomSet(move, size, box, boxPos) {
        for (let y = 0; y < size; y++) {        // loop.Y
            for (let x = 0; x < size; x++) {    // loop.X
                if (boxPos == x+(y*size)){      // Check position in board if true
                    list_BrdBox[box].style.transform = `translate(${x*move}px, ${y*move}px)`;   // box ke 0-End
                    list_idxSpan.push([x,y]);                                                   // idx ke 0-End
                    mirror_idxSpan.push(`${x},${y}`);
                }
            }
        }
    }
    // Check
    if (scrnBrd == "3x3"){
        move = 150;
        let arrayBox = [0,1,2,3,4,5,6,7,8]; // length 9
        let boxPos;                  
        for (let box = 0; box < (3*3)-1; box++) {       // loop set all 8 box random position
            while (true){
                boxPos = Math.round(Math.random() * 8); // set boxPos random Num 0-8 | 9 position
                if (arrayBox.includes(boxPos)){         // if boxPos include in array
                    arrayBox.splice(arrayBox.indexOf(boxPos), 1);   // remove Num == boxpos in array (1 data)
                    break;  // Out Loop while
                }else{}     // loop while again
            }
            brdRandomSet(move, 3, box, boxPos);
        }
    }else if (scrnBrd == "4x4"){
        move = 112.5;
        let arrayBox = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; // length 16
        let boxPos;
        for (let box = 0; box < (4*4)-1; box++) {           // loop set all 15 box random position
            while (true){
                boxPos = Math.round(Math.random() * 15);    // set boxPos random Num 0-15 | 16 position
                if (arrayBox.includes(boxPos)){             // if boxPos include in array
                    arrayBox.splice(arrayBox.indexOf(boxPos), 1);   // remove Num == boxpos in array (1 data)
                    break;  // Out Loop while
                }else{}     // loop while again
            }
            brdRandomSet(move, 4, box, boxPos);
        }
    }else if (scrnBrd == "5x5"){
        move = 90;
        let arrayBox = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]; // length 25
        let boxPos;
        for (let box = 0; box < (5*5)-1; box++) {           // loop set all 24 box random position
            while (true){
                boxPos = Math.round(Math.random() * 24);    // set boxPos random Num 0-24 | 25 position
                if (arrayBox.includes(boxPos)){             // if boxPos include in array
                    arrayBox.splice(arrayBox.indexOf(boxPos), 1);   // remove Num == boxpos in array (1 data)
                    break;  // Out Loop while
                }else{}     // loop while again
            }
            brdRandomSet(move, 5, box, boxPos);
        }
    }
}
function SetBrdBtn() {
    // Sort Button
    btnSort = document.querySelector(`.board${scrnBrd} .brd-sort`);
    btnSort.addEventListener("click", () => {SortBrd(scrnBrd)});
    // Board Box Button 0-End
    for (let i = 0; i < ((Number(scrnBrd[0]))**2); i++) {
        list_BrdBox[i].addEventListener("click", () => {GamePlay(i); Win()});
    }
}
function GamePlay(i) {
    let varX = Number(list_idxSpan[i][0]);
    let varY = Number(list_idxSpan[i][1]);
    // Check empty area in (left,right,up,down) (x-1, x+1, y-1, y+1) & Move
    if (mirror_idxSpan.includes(String(varX-1)+","+String(varY)) == false && varX-1 >= 0){
        list_BrdBox[i].style.transform = `translate(${(varX-1)*move}px, ${varY*move}px)`;
        list_idxSpan[i] = [varX-1,varY];
        mirror_idxSpan[i] = `${varX-1},${varY}`;
    }else if (mirror_idxSpan.includes(String(varX+1)+","+String(varY)) == false && varX+1 < Number(scrnBrd[0])){
        list_BrdBox[i].style.transform = `translate(${(varX+1)*move}px, ${varY*move}px)`;
        list_idxSpan[i] = [varX+1,varY];
        mirror_idxSpan[i] = `${varX+1},${varY}`;
    }else if (mirror_idxSpan.includes(String(varX)+","+String(varY-1)) == false && varY-1 >= 0){
        list_BrdBox[i].style.transform = `translate(${varX*move}px, ${(varY-1)*move}px)`;
        list_idxSpan[i] = [varX,varY-1];
        mirror_idxSpan[i] = `${varX},${varY-1}`;
    }else if (mirror_idxSpan.includes(String(varX)+","+String(varY+1)) == false && varY+1 < Number(scrnBrd[0])){
        list_BrdBox[i].style.transform = `translate(${varX*move}px, ${(varY+1)*move}px)`;
        list_idxSpan[i] = [varX,varY+1];
        mirror_idxSpan[i] = `${varX},${varY+1}`;
    }
}
function Win() {
    let out = false;
    for (let y = 0; y < Number(scrnBrd[0]); y++) {      // loop.Y
        if (out == true){break}
        for (let x = 0; x < Number(scrnBrd[0]); x++) {  // loop.X
            if (x+(y*Number(scrnBrd[0])) == (Number(scrnBrd[0])**2)-1){         // if loopEnd (idx 8/15/24)
                stsText.innerHTML = "YOU WIN";
                SetScrn("STATUS");
            }else if (mirror_idxSpan[x+(y*Number(scrnBrd[0]))] == `${x},${y}`){ // loop 0 to End-1 (length 8/15/24)
                continue;
            }else{out = true; break}    // Out Loop
        }
    }
}

// ===== Default Call
SetLvl("3x3");      // "3x3"|"4x4"|"5x5"
SetScrn("MENU");    // "MENU"|"3x3"|"4x4"|"5x5"|"STATUS"

