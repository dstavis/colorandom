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

    return output.join('');
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

window.addEventListener("load", displayPalette);
newPaletteButton.addEventListener("click", displayPalette);
paletteContainer.addEventListener("click", lockUnlockColor);

var currentPalette = new Palette();

function displayPalette(event) {
  paletteContainer.innerHTML = "";

  if(event.type === "click") {
    currentPalette.replaceUnlockedColors();
  }

  for(i = 0; i < currentPalette.colors.length; i++) {
    if(currentPalette.colors[i].locked === false) {
    paletteContainer.innerHTML +=
    `<article class="color-container" data-id="${currentPalette.colors[i].id}">
      <div class="color-box color1" style="background:${currentPalette.colors[i].hexcode};"></div>
      <span>
        <p class="hexcode">${currentPalette.colors[i].hexcode}</p>
        <i class="fa-solid fa-lock-open" data-id="${currentPalette.colors[i].id}"></i>
      </span>
    </article>`;
  } if(currentPalette.colors[i].locked === true) {
    paletteContainer.innerHTML +=
    `<article class="color-container" data-id="${currentPalette.colors[i].id}">
      <div class="color-box color1" style="background:${currentPalette.colors[i].hexcode};"></div>
      <span>
        <p class="hexcode">${currentPalette.colors[i].hexcode}</p>
        <i class="fa-solid fa-lock" data-id="${currentPalette.colors[i].id}"></i>
      </span>
    </article>`;
    }
  }
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
