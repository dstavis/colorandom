class Color {
  constructor() {
    this.hexcode = this.#randomHexCode();
    this.locked = false;
    this.id = Color.colorsMadeSoFar + 1;
    Color.colorsMadeSoFar++
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

var newPaletteButton = document.querySelector("#new-palette-button")
var savePaletteButton = document.querySelector("#save-palette-button")
var paletteContainer = document.querySelector(".palette-container")
var colorTemplate = document.querySelector("#color-template")

window.addEventListener("load", loadNewPalette)
// newPaletteButton.addEventListener("click", showNewPalette)
// savePaletteButton.addEventListener("click", saveNewPalette)


function loadNewPalette() {
  var originalPalette = new Palette();
  var templateContent = colorTemplate.content.children[0];
  for(var i = 0; i < originalPalette.colors.length; i++) {
    templateContent.setAttribute("data-id", originalPalette.colors[i].id)
    templateContent.children[0].style.background = originalPalette.colors[i].hexcode;
    templateContent.children[1].children[0].innerText = originalPalette.colors[i].hexcode
    paletteContainer.innerHTML += paletteContainer.append("templateContent")
  }
}
