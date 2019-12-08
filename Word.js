const Letter = require("./Letter")

const Word = function(randomword) {
  this.wordArray = randomword.split("").map(letter => {
    return new Letter(letter)
  })
  this.word = randomword
  this.guessesRemaining = 10
  this.wordBank = []

  this.display = function() {
    let displayWord = ""
    this.wordArray.map(letter => {
      displayWord += letter.show(letter.char)
    })

    return displayWord.split("").join(" ")
  }

  this.verify = function(str) {
    let foundYorN = false
    this.wordArray.map(letter => {
      if (letter.guess(str)) {
        foundYorN = true
      }
    })
    return foundYorN
  }
}

module.exports = Word
