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
  for (let i = 0; i < amount; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "grid-cell");
    gridContainer.append(div);
  }
  // Computing number of rows and columns needed
  gridContainer.style.gridTemplateColumns = `repeat(${Math.ceil(
    containerWidth / brushSize
  )}, ${brushSize}px)`;

  gridContainer.style.gridTemplateRows = `repeat(${Math.ceil(
    containerHeight / brushSize
  )}, ${brushSize}px)`;
}

createGrid();

// Function to select brush size
function selectBrush(e) {
  let smallBrush = 10;
  let mediumBrush = 20;
  let largeBrush = 30;

  let brushSize = e.target.classList.value;
  if (brushSize) hideMenu(e);
  if (brushSize === "small-brush") createGrid(smallBrush);
  else if (brushSize === "medium-brush") return createGrid(mediumBrush);
  else return createGrid(largeBrush);
}

// Function to start painting when clicked
function paint(choice) {
  gridContainer.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("grid-cell") && clicked) {
      e.target.style.backgroundColor = colorSelector(choice);
    }
  });
}
paint(document.querySelector(".color").value);

// Function to output color
function colorSelector(color) {
  if (color === "rainbow")
    return `rgb(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()})`;
  else return document.querySelector(".color").value;
}

function generateRandomColor() {
  return Math.trunc(Math.random() * 255 + 1);
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
  else paint("userColor");
});

const slider = document.querySelector(".slider");
const eraser = document.querySelector(".eraser-size");
slider.addEventListener("mousemove", (e) => {
  let eraserSize = document.querySelector(".slider").value;
  eraser.style.width = `${eraserSize}px`;
  eraser.style.height = `${eraserSize}px`;
});

// function eraser(e) {

// }
