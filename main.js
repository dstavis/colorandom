class Color{
  constructor(){
    this.hexcode = this.randomHexCode();
    this.locked = false;
    this.id = Date.now().toString();
  }

  randomHexCode(){
    var validCharacters = "ABCDEF0123456789".split("");

    var output = ["#"]

    for(var i = 0; i < 6; i++){
      var randomIndex = Math.floor(Math.random() * validCharacters.length )
      output.push(validCharacters[randomIndex])
    }

    return output.join('')
  }
}
