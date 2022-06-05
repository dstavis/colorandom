class Color {
  constructor() {
    this.hexcode = this.#randomHexCode();
    this.locked = false;
    this.id = Color.colorsMadeSoFar + 1;
    Color.colorsMadeSoFar++;
  }

  static colorsMadeSoFar = 0;

  #randomHexCode() {
    var validCharacters = "ABCDEF0123456789".split("");

    var output = ["#"];

    for(var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * validCharacters.length);
      output.push(validCharacters[randomIndex]);
    }

    return output.join("");
  }

}

class Palette {
  constructor() {
    this.colors = this.#addDefaultColors();
    this.id = Palette.palettesMadeSoFar + 1;
    Palette.palettesMadeSoFar++;
  }

  static palettesMadeSoFar = 0;

  #addDefaultColors() {
    var output = [];
    for(var i = 0; i < 5; i++) {
      output.push(new Color());
    }
    return output;
  }

  toggleColorLocked(colorId) {
    for(var i = 0; i < this.colors.length; i++) {
      if(this.colors[i].id === colorId) {
        this.colors[i].locked = !this.colors[i].locked;
      }
    }
  }

  replaceUnlockedColors(){
    for(var i = 0; i < this.colors.length; i++) {
      if(!this.colors[i].locked) {
        this.colors.splice(i, 1, new Color());
      }
    }
  }

}

var newPaletteButton = document.querySelector("#new-palette-button");
var savePaletteButton = document.querySelector("#save-palette-button");
var paletteContainer = document.querySelector(".palette-container");
var savedPaletteContainer = document.querySelector(".saved-palette-container")

window.addEventListener("load", loadPalette);
newPaletteButton.addEventListener("click", loadPalette);
savePaletteButton.addEventListener("click", savePalette);
paletteContainer.addEventListener("click", lockUnlockColor);
savedPaletteContainer.addEventListener("click", deleteSavedPalette);

var currentPalette = new Palette();
var savedPalettes = []

function loadPalette(event) {
  if(event.type === "click") {
    currentPalette.replaceUnlockedColors();
  }
  displayPalette();
}

function displayPalette() {
  paletteContainer.innerHTML = "";
  var iconType;
  for (i = 0; i < currentPalette.colors.length; i++) {
    if(currentPalette.colors[i].locked === false) {
      iconType = "fa-lock-open";
    } else {
      iconType = "fa-lock";
    }
    paletteContainer.innerHTML +=
    `<article class="color-container" draggable="true" ondragstart="dragstartHandler(event)" ondragover="dragoverHandler(event)" data-id="${currentPalette.colors[i].id}">
      <div class="color-box" ondrop="dropHandler(event)" style="background:${currentPalette.colors[i].hexcode};"></div>
      <span>
        <p class="hexcode">${currentPalette.colors[i].hexcode}</p>
        <i role="button" class="fa-solid ${iconType}" data-id="${currentPalette.colors[i].id}"></i>
      </span>
    </article>`;
  }
}

function dragstartHandler(event) {
  event.dataTransfer.setData('color-box', event.target.getAttribute("data-id"));
  event.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function dropHandler(event) {
  event.preventDefault();
  var dragId = parseInt(event.dataTransfer.getData('color-box'));
  var dropId = parseInt(event.target.parentNode.dataset.id);
  var dragColor;
  var dropColor;
  var dragIndex;
  var dropIndex;
    for (var i = 0; i < currentPalette.colors.length; i++) {
      if(currentPalette.colors[i].id === dragId){
        dragColor = currentPalette.colors[i];
        dragIndex = i;
      }
      if(currentPalette.colors[i].id === dropId){
        dropColor = currentPalette.colors[i];
        dropIndex = i;
      }
    }
    currentPalette.colors[dropIndex] = dragColor;
    currentPalette.colors[dragIndex] = dropColor;

    displayPalette();
}

function lockUnlockColor(event) {
  if(event.target.classList.contains("fa-lock-open")) {
    currentPalette.toggleColorLocked(parseInt(event.target.getAttribute("data-id")));
    lockIcon(event);
  } else if (event.target.classList.contains("fa-lock")) {
    currentPalette.toggleColorLocked(parseInt(event.target.getAttribute("data-id")));
    unlockIcon(event);
  }
}

function lockIcon(event) {
  event.target.classList.remove("fa-lock-open");
  event.target.classList.add("fa-lock");
}

function unlockIcon(event) {
  event.target.classList.remove("fa-lock");
  event.target.classList.add("fa-lock-open");
}

function savePalette() {
  savedPalettes.push(currentPalette);
  displaySavedPalettes();
  currentPalette = new Palette();
  displayPalette();
}

function displaySavedPalettes() {
  savedPaletteContainer.innerHTML = "";
  for(var i = 0; i < savedPalettes.length; i++) {
  savedPaletteContainer.innerHTML +=
    `<article class="saved-palette" data-id="${savedPalettes[i].id}">
        <div class="saved-color-box-mask">
          <div class="saved-color-box" style="background:${savedPalettes[i].colors[0].hexcode};"></div>
          <div class="saved-color-box" style="background:${savedPalettes[i].colors[1].hexcode};"></div>
          <div class="saved-color-box" style="background:${savedPalettes[i].colors[2].hexcode};"></div>
          <div class="saved-color-box" style="background:${savedPalettes[i].colors[3].hexcode};"></div>
          <div class="saved-color-box" style="background:${savedPalettes[i].colors[4].hexcode};"></div>
        </div>
        <i role="button" class="fa-solid fa-trash-can" data-id="${savedPalettes[i].id}"></i>
      </article>`;
  }
}

function deleteSavedPalette(event) {
  if(event.target.classList.contains("fa-trash-can")) {
    for(var i = 0; i < savedPalettes.length; i++) {
      if(savedPalettes[i].id === parseInt(event.target.getAttribute("data-id"))) {
        savedPalettes.splice(i, 1);
      }
    }
    displaySavedPalettes();
  }
}
