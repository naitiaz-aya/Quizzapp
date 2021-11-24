const question = document.querySelector('#question');
const choices = Array.from( document.querySelectorAll('.choice-text') );
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true 
let score = 0
let questionCounter =0 
let availableQuestions = []

let questions = [
   {
      id:1,
      question:"Number(\"1\") - 1 == 0; \rWhat is the result?",
      choice:"True",
      choice:"False",
      choice:"NaN",
      choice:"TypeError",
      answe:"1"
   },
   {
      id:2,
      question:"What is the result? \r(true + false) > 2 + true;",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"2"
   },
   {
      id:3,
      question:"What is the result?\r\"1\" - - \"1\";",
      choice1:"0",
      choice2:"2",
      choice3:"11",
      choic:"\"11\"",
      answer:"2"
   },
   {
      id:4,
      question:"What is the result? \r new String(\"This is a string\") instanceof String;        ",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"1"
   },
   {
      id:5,
      question:"What is the result? \r[] + [] + 'foo'.split('');        ",
      choice1:"\"f,o,o\"",
      choice2:"TypeError",
      choice3:"[\"f\",\"o\",\"o\"]",
      choice4:"[][][\"f\",\"o\",\"o\"]",
      answer:"1"
   },
   {
      id:6,
      question:"What is the result? \r[] + [] + 'foo'.split('');",
      choice1:"\"f, o, o\"",
      choice2:"TypeError",
      choice3:"[\"f\", \"o\", \"o\"]",
      choice4:"[][][\"f\", \"o\", \"o\"]",
      answer:"2"
   },
   {
      id:7,
      question:"What is the result? \rnew Array(5).toString();",
      choice1:"\",,,,\"",
      choice2:"[]",
      choice3:"\"[]\"",
      choice4:"(empty)",
      answer:"1"
   },
   {
     id:8,
      question:"What is the result? \r String('Hello') === 'Hello';",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"1"
   },
   {
      id:9,
      question:"What is the result? \r \"This is a string\" instanceof String;",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"3"
   },
   {
     id:10,
      question:"What is the result console.log(myArr); ? \rvar myArr = ['foo', 'bar', 'baz']; \rmyArr.length = 0; \r myArr.push('bin');",
      choice1:"['foo', 'bar', 'baz']",
      choice2:"['foo', 'bar', 'baz', 'bin']",
      choice3:"['bin', 'foo', 'bar', 'baz']",
      choice4:"['bin']",
      answer:"4"
   },
   {
     id:11,
      question:"What is the result? \rString('Hello') === 'Hello';",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"1"
   },
   {
     id:12,
      question:"What is the result? \r10 > 9 > 8 === true;",
      choice1:"True",
      choice2:"False",
      choice3:"Error",
      choice4:"Other",
      answer:"2"
   },
   {
      id:13,
      question:"What is the result? \rNaN === NaN;",
      choice1:"true",
      choice2:"false",
      choice3:"TypeError",
      choice4:"NaN",
      answer:"2"
   }
]
  const SCORE_POINTS = 10
  const MAX_QUESTIONS = 4

  startGame = () => {
    questionCounter = 0 
    score = 0 
    availableQuestions = [...questions]
    nextQuestion ()
  }

  nextQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
      localStorage.setItem('mostRecentScore', score)
      return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = 'Question ' + questionCounter
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
      const number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
  }

  choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if(!acceptingAnswers) return;

      acceptingAnswers = false 
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']

      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      if(classToApply === 'correct'){
        incrementScore(SCORE_POINTS)
      }
      selectedChoice.parentElement.classList.add(classToApply)
      
      setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply)
        nextQuestion()
      },500)
    })

  })

  incrementScore = num =>{
    score += num
    scoreText.innerText = score
  }
  startGame()



  