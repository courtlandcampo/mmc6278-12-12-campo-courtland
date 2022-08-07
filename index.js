const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

const remainingGuessesEl = document.getElementById('remaining-guesses')
const incorrectGuessesEl = document.getElementById('incorrect-letters')
const wordToGuess = document.getElementById('word-to-guess')


class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.word.indexOf(letter) > -1){
      var answerArray = []
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] == letter){ 
          answerArray.push(letter)
        } else { 
          answerArray.push(this.displayWord[i])
        }
      }

      this.displayWord = answerArray.join("")
      this.correctLetters.push(letter)

    } else { 
      this.remainingGuesses--
      this.incorrectLetters.push(letter)
    }
  }

  // implement the updateScreen function:
   updateScreen() {
    remainingGuessesEl.textContent = this.remainingGuesses

    incorrectGuessesEl.textContent = this.incorrectLetters
    
    wordToGuess.textContent = this.displayWord
   }

  // implement the isGameOver function:
  isGameOver() {}

  // implement the getWinOrLoss function:
  getWinOrLoss() {}
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()