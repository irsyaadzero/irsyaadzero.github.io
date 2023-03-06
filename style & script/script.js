// ===== Get Element
const BoxImg = document.querySelector(".content"),
Count_Img = BoxImg.getAttribute("count"),   // Set Total IMG in HTML
Folder_Img = BoxImg.getAttribute("fimg"),   // Set Folder IMG in HTML
Folder_Link = BoxImg.getAttribute("flink"); // Set Folder Link in HTML

const list_SpanText = 
    ["Calculator", "TicTacToe", "Sliding Puzzle"];
    // [0, 1, 2, 3, 4,
    //  5, 6, 7, 8, 9,
    //  10, 11, 12, 13, XX]

// ===== Auto Set how many "BoxImg" required
for (let i = Number(Count_Img); i > 0; i--) { //Start with Max, end 1
    // <a href="./link/XX.html" class="box">
    const aElmt = document.createElement("a");  
    aElmt.setAttribute("href", `${Folder_Link}${i}/index.html`);      
    aElmt.setAttribute("class", "box"); 
    // <img src="./image/XX.png" alt="Image XX.png">
    const imgElmt = document.createElement("img");
    imgElmt.setAttribute("src", `${Folder_Img}${i}.png`);
    imgElmt.setAttribute("alt", `Image ${i}.png`);
    // <span class="text"">
    const spanElmt = document.createElement("span");
    spanElmt.setAttribute("class", "text");
    spanElmt.textContent = `${list_SpanText[i-1]}`;

    // Append Child to Parent
    aElmt.append(imgElmt);
    aElmt.append(spanElmt);
    BoxImg.append(aElmt);
}

