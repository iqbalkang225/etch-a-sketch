"use strict";

const gridContainer = document.querySelector(".grid-container");
const toolboxContainer = document.querySelector(".toolbox-container");
const brushesContainer = document.querySelector(".brushes-container");
const closeBtn = document.querySelector(".close");

let containerWidth = gridContainer.clientWidth + 10;
let containerHeight = gridContainer.clientHeight + 10;
let clicked = false;

// Function to create Paintable Grid
function createGrid(brushSize = 10) {
  // Variable to compute number of grid cells needed
  let amount = Math.ceil(
    (containerWidth / brushSize) * (containerHeight / brushSize)
  );
  // Creating individual grid cell and appending to grid container
  for (let i = 0; i < 1100; i++) {
    let div = document.createElement("div");
    div.style.border = "1px solid red";
    div.setAttribute("class", "grid-cell");
    gridContainer.append(div);
  }
  // Computing number of rows and columns needed
  gridContainer.style.gridTemplateColumns = `repeat(30,1fr)`;

  gridContainer.style.gridTemplateRows = `repeat(35,1fr)`;
}

createGrid();

// Function to select brush size
function selectBrush(e) {
  let brushSize = e.target.classList.value;
  console.log(brushSize);
  if (brushSize) hideMenu(e);
  if (brushSize === "small-brush") paint("rainbow", "small-brush");
  else if (brushSize === "medium-brush") paint("rainbow", "medium-brush");
  else return paint("rainbow", "large-brush");
}

// Function to reset grid
function clearGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((cell) => (cell.style.backgroundColor = "black"));
}

// Function to display Menu
function displayMenu(e) {
  e.target.nextElementSibling.style.display = "grid";
}

// Function to hide Menu
function hideMenu(e) {
  e.target.parentElement.style.display = "none";
}

// Event listener for Brush size selection, using event Delegation
const innerBrushes = document.querySelectorAll(".brushes-container svg");

innerBrushes.forEach((brush) => {
  // Clearing Grid after brush selection
  brush.addEventListener("click", (e) => {
    innerBrushes.forEach((brush) => {
      clearGrid();
    });
    selectBrush(e);
    // paint("userchoice");
  });
});

gridContainer.addEventListener("mousedown", () => {
  clicked = true;
});

gridContainer.addEventListener("mouseup", () => {
  clicked = false;
});

// Event listener to close menus
closeBtn.addEventListener("click", (e) => {
  hideMenu(e);
});

// Function to start painting when clicked
function paint(choice, size) {
  gridContainer.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("grid-cell") && clicked) {
      if (size === "small-brush") {
        e.target.style.backgroundColor = colorSelector(choice);
      } else if (size === "medium-brush") {
        e.target.nextElementSibling.style.backgroundColor =
          colorSelector(choice);
      }
    }
  });
}
paint(document.querySelector(".color").value);

// Function to output color
function colorSelector(color) {
  if (color === "rainbow")
    return `rgb(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()})`;
  else if (color === "black") return "black";
  else return document.querySelector(".color").value;
}

function generateRandomColor() {
  return Math.trunc(Math.random() * 255 + 1);
}

// Event handler for selecting tool from toolbox
toolboxContainer.addEventListener("click", (e) => {
  let clicked = e.target.classList[1];

  // Hiding submenus upon clicking toolbox icons
  document.querySelectorAll(".submenu").forEach((menu) => {
    if (clicked && clicked !== "submenu") menu.style.display = "none";
  });

  if (clicked === "brush") displayMenu(e);
  else if (clicked === "eraser") displayMenu(e);
  else if (clicked === "clear") clearGrid();
  else if (clicked === "rainbow") paint("rainbow");
  // else paint("userchoice");
});

const slider = document.querySelector(".slider");
slider.addEventListener("mousemove", eraserSize);

function eraserSize(e) {
  const eraserEl = document.querySelector(".eraser-size");
  let eraserSize = Number(document.querySelector(".slider").value);
  eraserEl.style.width = `${eraserSize}px`;
  eraserEl.style.height = `${eraserSize}px`;
  eraser(eraserSize);
}

function eraser(size) {
  slider.addEventListener("click", (e) => {
    paint("black");
    hideMenu(e);
  });
}

// function eraser(size) {
//   gridContainer.addEventListener("mouseover", (e) => {
//     if (e.target.classList.contains("grid-cell") && clicked) {
//       if (size === 50) {
//         console.log("fdsh");
//         e.target.style.backgroundColor = colorSelector("black");
//         // e.target.nextElementSibling.style.backgroundColor =
//         //   colorSelector("black");
//       }
//     }
//   });
// }

let userchoice = document.querySelector(".color");
userchoice.addEventListener("input", (e) => {
  console.log(userchoice.value);
  paint(userchoice.value);
});
