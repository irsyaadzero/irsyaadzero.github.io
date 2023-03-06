// ========== Var ==========
const inpArea = document.querySelector(".row1");
const listRow2 = document.querySelectorAll(".row2>span");
const listRow3 = document.querySelectorAll(".row3>span");
const listRow4 = document.querySelectorAll(".row4>span");
const listRow5 = document.querySelectorAll(".row5>span");
const listRow6 = document.querySelectorAll(".row6>span");
const charRow2 = ["clr", "*", "/", "del"];
const charRow3 = ["7", "8", "9", "%"];
const charRow4 = ["4", "5", "6", "-"];
const charRow5 = ["1", "2", "3", "+"];
const charRow6 = ["0", "()", ".", "="];
const listOper = ["*", "/", "%", "-", "+"];

// ========== Function ==========
// Input Operator
function funcOperator(inp){
    // Var
    let inpBefore = inpArea.value.slice(-1);
    let inpBefore2 = inpArea.value.slice(-2, -1);
    let inpArLeng = inpArea.value.length;

    if (listOper.includes(inp)){
        if (inpArea.value == ""){
            if (inp == "-"){
                inpArea.value += inp;
            }
        }else if(inpArea.value != ""){
            if (inp == "-"){                                                // ===== for -
                if (isNaN(Number(inpBefore)) == false){                     // before is Number
                    inpArea.value += inp;
                }else if (listOper.includes(inpBefore)){                    // before in listOper
                    inpArea.value = inpArea.value.slice(0,-1);
                    inpArea.value += inp;
                }else if (inpBefore == "(" || inpBefore == ")"){            // before is "(" or ")"
                    inpArea.value += inp;
                }else if (inpBefore == "."){                                // before is "."
                    inpArea.value += inp;
                }
            }else if (inp != "-"){                                          // ===== for *, /, %, +
                if (isNaN(Number(inpBefore)) == false){                     // before is Number
                    inpArea.value += inp;
                }else if (listOper.includes(inpBefore) && inpArLeng > 1){   // before in listOper & Length > 1
                    if (inpBefore2 != "(" ){                                // before ke-2 not "("
                        inpArea.value = inpArea.value.slice(0,-1);
                        inpArea.value += inp;
                    }
                }else if (inpBefore == ")"){                                // before is ")"
                    inpArea.value += inp;
                }else if (inpBefore == "."){                                // before is "."
                    inpArea.value += inp;
                }
            }
        }
    }
}
// Input "."
function funcDot(inp){
    // Var
    let inpBefore = inpArea.value.slice(-1);
    let inpArLeng = inpArea.value.length;

    if (inp == "."){
        if (inpArea.value == ""){
            inpArea.value += "0.";
        }else if (inpArea.value != ""){
            if (isNaN(Number(inpBefore)) == false){     // before is Number
                for (let i = 2; i <= inpArLeng+1; i++) {
                    if (i > inpArLeng){                                                 // in end loop & before all == number
                        inpArea.value += inp;
                    }else if (isNaN(Number(inpArea.value.slice(-i, -i+1) )) == false){  // before i == number
                        continue;
                    }else if (listOper.includes(inpArea.value.slice(-i, -i+1) )){       // before i == operator
                        inpArea.value += inp;
                        break;
                    }else if (inpArea.value.slice(-i, -i+1) == "("){                    // before i == "("
                        inpArea.value += inp;
                        break;
                    }else{
                        break;
                    }
                }
            }else if (listOper.includes(inpBefore)){    // before in listOper
                inpArea.value += "0.";
            }else if (inpBefore == ")"){                // before is ")"
                inpArea.value += "*0.";
            }else if (inpBefore == "("){                // before is "("
                inpArea.value += "0.";
            }else{}
        }
    }
}
// Input "()"
function funcBracket(inp){
    // Var
    let inpBefore = inpArea.value.slice(-1);
    let inpArLeng = inpArea.value.length;

    if (inp == "()"){
        if (inpArea.value == ""){
            inpArea.value += "(";
        }else if (inpArea.value != ""){
            if (isNaN(Number(inpBefore)) == false|| inpBefore == ")"){     // before is Number or ")"
                let TtlOpen = 0;    // mean "("
                let TtlClose = 0;   // mean ")"
                // Check total "(" & ")"
                if (inpBefore == ")"){TtlClose += 1;}
                for (let i = 2; i <= inpArLeng+1; i++) {
                    if (inpArea.value.slice(-i, -i+1) == "("){
                        TtlOpen +=1;
                    }else if (inpArea.value.slice(-i,-i+1) == ")"){
                        TtlClose +=1;
                    }
                }
                // Condition
                if (TtlOpen == TtlClose){
                    inpArea.value += "*(";
                }else if (TtlOpen > TtlClose){
                    inpArea.value += ")";
                }
            }else if (listOper.includes(inpBefore)){                        // before in listOper
                inpArea.value += "(";
            }else if (inpBefore == "."){                                    // before is "."
                inpArea.value += "*(";
            }else if (inpBefore == "("){                                    // before is "("
                inpArea.value += "(";
            }
        }
    }
}
// Call Func
function funcVal(usrinp){
    let inpBefore = inpArea.value.slice(-1);

    // Input Number
    if (isNaN(Number(usrinp)) == false && inpBefore != ")"){
        inpArea.value += usrinp;
    }
    // Input Clr, Del, =
    if (usrinp == "clr"){
        inpArea.value = "";
    }else if (usrinp == "del"){
        inpArea.value = inpArea.value.slice(0,-1);
    }else if (usrinp == "="){
        if (eval(inpArea.value) != undefined){
            inpArea.value = eval(inpArea.value);
        }
    }
    // Call Func
    funcOperator(usrinp);
    funcDot(usrinp);
    funcBracket(usrinp);

    // Size Char in Screen
    if (inpArea.value.length >= 14 && inpArea.value.length < 22){
        inpArea.classList.remove("fn48");
        inpArea.classList.remove("fn24");
        inpArea.classList.add("fn32");
    }else if (inpArea.value.length >= 22){
        inpArea.classList.remove("fn48");
        inpArea.classList.remove("fn32");
        inpArea.classList.add("fn24");
    }else if (inpArea.value.length < 14){
        inpArea.classList.remove("fn32");
        inpArea.classList.remove("fn24");
        inpArea.classList.add("fn48");
    }
}


// ========== OnClick --> Call Func ==========
for (let i = 0; i < listRow2.length; i ++) {
    listRow2[i].addEventListener("click", Event => {funcVal(charRow2[i])} );
    listRow3[i].addEventListener("click", Event => {funcVal(charRow3[i])} );
    listRow4[i].addEventListener("click", Event => {funcVal(charRow4[i])} );
    listRow5[i].addEventListener("click", Event => {funcVal(charRow5[i])} );
    listRow6[i].addEventListener("click", Event => {funcVal(charRow6[i])} );
}