// ===== Get Element =====
// Var Screen
const Menu   = document.querySelector(".menu"),
Board  = document.querySelector(".board"),
Status = document.querySelector(".status");
// Var Menu
const btn_CharX = document.querySelector(".menu .row2 button:nth-child(1)"),
btn_CharO = document.querySelector(".menu .row2 button:nth-child(2)"),
btn_Play  = document.querySelector(".menu .row3 button");
// Var Board
const list_BoardBtn = document.querySelectorAll(".board .board-main div");  // Parent Row -> span(box)
// Var Status
const stsWinLose = document.querySelector(".status .row1 span"),
btn_PlyAgn = document.querySelector(".status .row2 button:nth-child(1)"),
btn_Xcls   = document.querySelector(".status .row2 button:nth-child(2)");

let usrChar;
let comChar;
let turn;
let clr_org1 = "#ffa01a";
let clr_org2 = "#e56a18";
stsWinLose.innerHTML = "";  // Status Win/Lose/Draw

// ===== Button =====
window.onload = () => { // after all loaded
    // Button Menu
    btn_CharX.addEventListener("click", Event => {SetChar("X")} );      // Set usrChar X
    btn_CharO.addEventListener("click", Event => {SetChar("O")} );      // Set usrChar O
    btn_Play.addEventListener("click", Event => {SetScreen("BOARD"); firstPlay();} ); // Play, change Screen -> Board. Random First Player
    // Button Board
    for (let i = 0; i < list_BoardBtn.length; i++) {
        list_BoardBtn[i].children[0].addEventListener("click", Event => {userPlay(0,i, usrChar)} );  // X,Y = (0,i), (0,i), (0,i)
        list_BoardBtn[i].children[1].addEventListener("click", Event => {userPlay(1,i, usrChar)} );  // X,Y = (1,i), (1,i), (1,i)
        list_BoardBtn[i].children[2].addEventListener("click", Event => {userPlay(2,i, usrChar)} );  // X,Y = (2,i), (2,i), (2,i)
    }
    // Button Status
    btn_PlyAgn.addEventListener("click", Event => {Reset()} );          // Reset Game
    btn_Xcls.addEventListener("click", Event => {SetScreen("BOARD")} ); // Look End Condition of Board
}

// ===== Function =====
function SetChar(inpChar) {
    usrChar = inpChar;
    if (inpChar == "X"){
        comChar = "O";
        btn_CharX.style.backgroundColor = clr_org2;
        btn_CharO.style.backgroundColor = clr_org1;
    }else if (inpChar == "O"){
        comChar = "X";
        btn_CharO.style.backgroundColor = clr_org2;
        btn_CharX.style.backgroundColor = clr_org1;
    }
}
function SetScreen(screen) {
    if (screen == "MENU"){          // MENU
        Menu.classList.add("play");
        Board.classList.add("hidden");
        Status.classList.add("hidden");
            Menu.classList.remove("hidden");
            Board.classList.remove("play");
            Status.classList.remove("play");
    }else if (screen == "BOARD"){   // BOARD
        Menu.classList.add("hidden");
        Board.classList.add("play");
        Status.classList.add("hidden");
            Menu.classList.remove("play");
            Board.classList.remove("hidden");
            Status.classList.remove("play");
    }else if (screen == "STATUS"){  // STATUS
        Menu.classList.add("hidden");
        Board.classList.add("hidden");
        Status.classList.add("play");
            Menu.classList.remove("play");
            Board.classList.remove("play");
            Status.classList.remove("hidden");
    }
}
function firstPlay() {
    if (Math.round(Math.random()*10) % 2 == 0){turn = "user";}  // usePlay First
    else{turn = "com";                                          // comPlay First
        setTimeout(comPlay, Math.round(Math.random()*10)*100);} // Com Play -> delay 0 to 1 sec
}
function userPlay(locX, locY, char) {
    if (list_BoardBtn[locY].children[locX].innerHTML == "" && turn == "user"){    // User Click in empty Board
        list_BoardBtn[locY].children[locX].innerHTML = char;    // change clicked board to user char
        turn = "com";
        WinLose(usrChar);   // Check Win/Lose/Draw
        if (stsWinLose.innerHTML != ""){SetScreen("STATUS")}        // if Win/Lose/Draw -> Change Screen
        else if (stsWinLose.innerHTML == "" && turn == "com"){
            setTimeout(comPlay, Math.round(Math.random()*10)*100);  // Com Play -> delay 0 to 1 sec
        }
    }
}
function comPlay() {
    let cominp = "none";
    // ===== Check comChar if WIN, Input for Win
    for (let iy = 0; iy < list_BoardBtn.length; iy++) {     // set board location.Y -> 3x loop
        for (let jx = 0; jx < list_BoardBtn.length; jx++) { // set board location.X -> 3x loop
            if (list_BoardBtn[iy].children[jx].innerHTML == "" && cominp == "none"){    // listBoard[Row].children[Col]
                list_BoardBtn[iy].children[jx].innerHTML = comChar; // try add comChar
                WinLose(comChar);   // Check Win?
                if (stsWinLose.innerHTML != ""){    // if Win
                    stsWinLose.innerHTML = "";      // reset win status
                    cominp = "done";                // End
                    break;
                }else if (stsWinLose.innerHTML == ""){              // if No Win
                    list_BoardBtn[iy].children[jx].innerHTML = "";  // reset try add comChar
                    cominp = "none";                                // Continue to down
                }
            }
        }
    }
    // ===== Check comChar if LOSE, Input for Defense
    for (let iy = 0; iy < list_BoardBtn.length; iy++) {     // set board location.Y -> 3x loop
        for (let jx = 0; jx < list_BoardBtn.length; jx++) { // set board location.X -> 3x loop
            if (list_BoardBtn[iy].children[jx].innerHTML == "" && cominp == "none"){    // listBoard[Row].children[Col]
                list_BoardBtn[iy].children[jx].innerHTML = usrChar; // try add usrChar
                WinLose(usrChar);   // Check if user Win = Com Lose
                if (stsWinLose.innerHTML != ""){                        // if Com Lose
                    list_BoardBtn[iy].children[jx].innerHTML = comChar; // change try add usrChar to comChar
                    stsWinLose.innerHTML = "";                          // reset win status
                    cominp = "done";                                    // End
                    break;
                }else if (stsWinLose.innerHTML == ""){              // if Com No Lose
                    list_BoardBtn[iy].children[jx].innerHTML = "";  // reset try add usrChar
                    cominp = "none"                                 // Continue to down
                }
            }
        }
    }
    // ===== No Win/Lose, Input Random
    while (cominp == "none"){
        let randX = Math.floor(Math.random()*3);    // set random Num 0 to 2
        let randY = Math.floor(Math.random()*3);    // set random Num 0 to 2
        if (list_BoardBtn[randY].children[randX].innerHTML == ""){
            list_BoardBtn[randY].children[randX].innerHTML = comChar;
            cominp = "done";    // End
        }
    }
    // ===== if Win/Lose/Draw -> Change Screen -> delay 0.4sec
    setTimeout(() => {      
        WinLose(comChar);   // Check Win/Lose/Draw
        if (stsWinLose.innerHTML != ""){
            SetScreen("STATUS");
        }else{turn = "user";}
    }, 400);
}
function WinLose(char) {
    // Func Status
    function funcStatus(char) {
        if (char == usrChar){                   // Set User Win / Com Lose
            stsWinLose.innerHTML = "YOU WIN";
        }else if (char == comChar){             // Set User Lose / Com Win
            stsWinLose.innerHTML = "YOU LOSE";
        }else{                                  // Check if Board Full -> Draw
            for (let i = 0; i < list_BoardBtn.length+1; i++) {  // length = 3+1
                if (i == list_BoardBtn.length){     // true in EndLoop
                    stsWinLose.innerHTML = "DRAW";
                }else if (list_BoardBtn[i].children[0].innerHTML == "" 
                    || list_BoardBtn[i].children[1].innerHTML == "" 
                    || list_BoardBtn[i].children[2].innerHTML == ""){break;}    // true if one/more Board.Child empty
            }
        }
    }

    // ===== Check =====
    for (let i = 0; i < list_BoardBtn.length; i++) {
        if (list_BoardBtn[i].children[0].innerHTML == char 
            && list_BoardBtn[i].children[1].innerHTML == char  
            && list_BoardBtn[i].children[2].innerHTML == char){funcStatus(char);    // Check Win/Lose X
        }else if (list_BoardBtn[0].children[i].innerHTML == char 
            && list_BoardBtn[1].children[i].innerHTML == char 
            && list_BoardBtn[2].children[i].innerHTML == char){funcStatus(char);    // Check Win/Lose Y
        }
    }
    if (list_BoardBtn[0].children[0].innerHTML == char 
        && list_BoardBtn[1].children[1].innerHTML == char 
        && list_BoardBtn[2].children[2].innerHTML == char){funcStatus(char);        // Check Win/Lose Cross 1
    }else if (list_BoardBtn[2].children[0].innerHTML == char 
        && list_BoardBtn[1].children[1].innerHTML == char 
        && list_BoardBtn[0].children[2].innerHTML == char){funcStatus(char);        // Check Win/Lose Cross 2
    }else {funcStatus("")}      // Not Win/Lose
}
function Reset() {
    stsWinLose.innerHTML = "";                          // reset status
    for (let i = 0; i < list_BoardBtn.length; i++) {    // reset Board
        list_BoardBtn[i].children[0].innerHTML = "";
        list_BoardBtn[i].children[1].innerHTML = "";
        list_BoardBtn[i].children[2].innerHTML = "";
    }
    turn = "user";          // reset first turn
    SetScreen("BOARD");     // Set Screen Board
}


// ===== Call Main Func =====
SetChar("X");       // Default User Character (X | O)
SetScreen("MENU");  // Default First Screen (MENU | BOARD | STATUS)