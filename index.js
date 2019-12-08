const inquirer = require("inquirer")
const randomWords = require("random-words")
const Word = require("./Word")
const colors = require("colors")

const mainMenu = () => {
  console.log("\n***************".green)
  console.log("Guess the word!".toUpperCase().green)
  console.log("***************".green)

  let newWord = new Word(randomWords(1)[0])
  //console.log(newWord);
  let rightORwrong = false

  const display = () => {
    console.log("\nRemaining Turns: ".green, newWord.guessesRemaining)
    console.log("Guessed Letters: ".green, newWord.wordBank.join(", "))
    console.log("\nWord: ".blue, newWord.display(), "\n")
  }

  const validations = val => {
    if (/[a-z]/gi.test(val) === false || val.length !== 1) {
      console.log("\n\nThat input is not valid, try a letter.\n".red)
    } else if (newWord.wordBank.indexOf(val.toLowerCase()) !== -1) {
      console.log("\n\nYou already guessed that. Try another letter.\n".red)
    } else {
      return true
    }
  }

  const win = () => {
    display()
    console.log("\n***You win!***\n".rainbow)
    playAgain()
  }

  const loss = () => {
    display()
    console.log(
      "\nYou Lose! Answer: ".yellow,
      newWord.word.toUpperCase().bgYellow.black,
      "\n"
    )
    playAgain()
  }

  const playAgain = () => {
    inquirer
      .prompt({
        type: "confirm",
        name: "choice",
        message: "Would you like to play again?"
      })
      .then(function(res) {
        if (res.choice) {
          mainMenu()
        } else {
          quitGame()
        }
      })
  }

  const quitGame = () => {
    console.log("\nGoodbye!")
    process.exit()
  }

  const letterChoice = () => {
    inquirer
      .prompt({
        type: "input",
        name: "choice",
        message: "Guess another letter!",
        validate: function(val) {
          return validations(val)
        }
      })
      .then(function(res) {
        let choice = res.choice.toLowerCase()
        newWord.wordBank.push(choice)
        rightORwrong = newWord.verify(choice)

        if (!rightORwrong) {
          newWord.guessesRemaining--
        }
        if (newWord.guessesRemaining === 0) {
          loss()
        } else if (!newWord.display().includes("_")) {
          win()
        } else {
          display()
          letterChoice()
        }
      })
  }

  display()
  letterChoice()
}

mainMenu()
