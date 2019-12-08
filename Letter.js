const Letter = function(char) {
  this.char = char
  this.guessed = false

  this.show = function() {
    if (this.guessed) {
      return this.char
    } else {
      return "_"
    }
  }
  this.guess = function(str) {
    if (this.char === str) {
      this.guessed = true
      return true
    }
  }
}

module.exports = Letter
