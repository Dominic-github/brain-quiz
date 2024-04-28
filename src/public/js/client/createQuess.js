let createQuizBtn = document.querySelector('.btn-create-quiz')
let divGroupInput = document.querySelectorAll('.div-group .div-group-input')

let topic = getCookie('topicCreateQuess')
let numQuess = getCookie('numberCreateQuess')
let userId = getCookie('user').id

let mainContent = document.querySelector('.main-content')

for (let i = 1; i <= numQuess; i++) {
  let quessGroup = document.createElement('div')
  quessGroup.classList.add('div-group')
  quessGroup.classList.add('quess-group')

  // quessGroupHeader
  let quessGroupHeader = document.createElement('div')
  quessGroupHeader.classList.add('quess-group-header')

  let labelQuessGroupHeader = document.createElement('label')
  labelQuessGroupHeader.classList.add('quess-group-title')
  labelQuessGroupHeader.innerHTML = 'Quess ' + i

  let inputTitleQuess = document.createElement('input')
  inputTitleQuess.type = 'text'
  inputTitleQuess.classList.add('form-control')
  inputTitleQuess.placeholder = 'What is your title question?'
  inputTitleQuess.required = true

  quessGroupHeader.appendChild(labelQuessGroupHeader)
  quessGroupHeader.appendChild(inputTitleQuess)

  quessGroup.appendChild(quessGroupHeader)

  // end quessGroupHeader

  // choice Type Group
  let choiceTypeGroup = document.createElement('div')
  choiceTypeGroup.classList.add('choice-group')

  let labelChoiceTypeGroup = document.createElement('label')
  labelChoiceTypeGroup.classList.add('choice-group-label')
  labelChoiceTypeGroup.innerHTML = 'Type of quess'

  let selectChoiceTypeGroup = document.createElement('select')
  selectChoiceTypeGroup.classList.add('form-select')
  selectChoiceTypeGroup.classList.add('type-select')
  selectChoiceTypeGroup.id = 'type-quess-' + i
  let choiceTypeArr = ['singlechoice', 'multichoice', 'true-false', 'input']
  let indexType = 0
  choiceTypeArr.forEach((element) => {
    let option = document.createElement('option')
    option.value = element
    option.innerHTML = element
    if (indexType == 0) {
      option.selected = true
    }
    selectChoiceTypeGroup.appendChild(option)
    indexType++
  })

  choiceTypeGroup.appendChild(labelChoiceTypeGroup)
  choiceTypeGroup.appendChild(selectChoiceTypeGroup)
  quessGroup.appendChild(choiceTypeGroup)

  // end choice Type Group

  // choice difficult Group
  let choiceDifficultGroup = document.createElement('div')
  choiceDifficultGroup.classList.add('choice-group')

  let labelChoiceDifficultGroup = document.createElement('label')
  labelChoiceDifficultGroup.classList.add('choice-group-label')
  labelChoiceDifficultGroup.innerHTML = 'Difficult'

  let selectChoiceDifficultGroup = document.createElement('select')
  selectChoiceDifficultGroup.classList.add('form-select')
  selectChoiceDifficultGroup.classList.add('difficult-select')
  let choiceDifficultArr = ['easy', 'medium', 'hard']
  let indexDifficult = 0
  choiceDifficultArr.forEach((element) => {
    let option = document.createElement('option')
    option.value = element
    option.innerHTML = element
    if (indexDifficult == 0) {
      option.selected = true
    }
    selectChoiceDifficultGroup.appendChild(option)
    indexDifficult++
  })
  choiceDifficultGroup.appendChild(labelChoiceDifficultGroup)
  choiceDifficultGroup.appendChild(selectChoiceDifficultGroup)
  quessGroup.appendChild(choiceDifficultGroup)

  // end choice difficult Group

  // answer
  let quessGroupContent = document.createElement('div')
  quessGroupContent.classList.add('quess-group-content')
  quessGroupContent.id = 'quess-group-content-' + i

  for (let j = 1; j <= 4; j++) {
    let answerGroup = document.createElement('div')
    answerGroup.classList.add('answer-group')

    let labelAnswerGroup = document.createElement('label')
    labelAnswerGroup.classList.add('answer-group-label')
    labelAnswerGroup.innerHTML = 'Answer ' + j

    let inputAnswerGroup = document.createElement('input')
    inputAnswerGroup.type = 'text'
    inputAnswerGroup.classList.add('form-control')
    inputAnswerGroup.placeholder = 'Answer ' + j
    inputAnswerGroup.key = j
    inputAnswerGroup.required = true

    answerGroup.appendChild(labelAnswerGroup)
    answerGroup.appendChild(inputAnswerGroup)
    quessGroupContent.appendChild(answerGroup)
  }

  let choiceAnswerGroup = document.createElement('div')
  choiceAnswerGroup.classList.add('choice-group-answer')
  choiceAnswerGroup.classList.add('choice-group')

  let labelChoiceAnswerGroup = document.createElement('label')
  labelChoiceAnswerGroup.classList.add('choice-group-label')
  labelChoiceAnswerGroup.innerHTML = 'True Answer'

  let selectChoiceAnswerGroup = document.createElement('select')
  selectChoiceAnswerGroup.classList.add('form-select')
  selectChoiceAnswerGroup.classList.add('quess-answer-select')
  selectChoiceAnswerGroup.id = 'answer-quess-' + i
  let choiceAnswerArr = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
  let indexAnswer = 0
  choiceAnswerArr.forEach((element) => {
    let option = document.createElement('option')
    option.value = element
    option.innerHTML = element
    if (indexType == 0) {
      option.selected = true
    }
    selectChoiceAnswerGroup.appendChild(option)
    indexAnswer++
  })

  choiceAnswerGroup.appendChild(labelChoiceAnswerGroup)
  choiceAnswerGroup.appendChild(selectChoiceAnswerGroup)
  quessGroupContent.appendChild(choiceAnswerGroup)

  quessGroup.appendChild(quessGroupContent)

  // end answer

  // score Group
  let scoreGroup = document.createElement('div')
  scoreGroup.classList.add('score-group')
  scoreGroup.id = `score-group-${i}`

  let labelScoreGroup = document.createElement('label')
  labelScoreGroup.classList.add('score-group-label')
  labelScoreGroup.innerHTML = 'Score'

  let inputScoreGroup = document.createElement('input')
  inputScoreGroup.type = 'number'
  inputScoreGroup.classList.add('form-control')
  inputScoreGroup.placeholder = 'Score'
  inputScoreGroup.min = 5
  inputScoreGroup.max = 10
  inputScoreGroup.required = true

  scoreGroup.appendChild(labelScoreGroup)
  scoreGroup.appendChild(inputScoreGroup)
  quessGroup.appendChild(scoreGroup)

  // end score difficult Group

  selectChoiceTypeGroup.addEventListener('change', () => {
    let typeQuess = selectChoiceTypeGroup.value
    if (typeQuess == 'singlechoice') {
      quessGroupContent.innerHTML = ''
      for (let j = 1; j <= 4; j++) {
        let answerGroup = document.createElement('div')
        answerGroup.classList.add('answer-group')

        let labelAnswerGroup = document.createElement('label')
        labelAnswerGroup.classList.add('answer-group-label')
        labelAnswerGroup.innerHTML = 'Answer ' + j

        let inputAnswerGroup = document.createElement('input')
        inputAnswerGroup.type = 'text'
        inputAnswerGroup.classList.add('form-control')
        inputAnswerGroup.placeholder = 'Answer ' + j
        inputAnswerGroup.required = true

        answerGroup.appendChild(labelAnswerGroup)
        answerGroup.appendChild(inputAnswerGroup)
        quessGroupContent.appendChild(answerGroup)
      }
      let choiceAnswerGroup = document.createElement('div')
      choiceAnswerGroup.classList.add('choice-group')
      choiceAnswerGroup.classList.add('choice-group-answer')

      let labelChoiceAnswerGroup = document.createElement('label')
      labelChoiceAnswerGroup.classList.add('choice-group-label')
      labelChoiceAnswerGroup.innerHTML = 'True Answer'

      let selectChoiceAnswerGroup = document.createElement('select')
      selectChoiceAnswerGroup.classList.add('form-select')
      selectChoiceAnswerGroup.classList.add('quess-answer-select')
      selectChoiceAnswerGroup.id = 'answer-quess-' + i
      let choiceAnswerArr = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
      let indexAnswer = 0
      choiceAnswerArr.forEach((element, key) => {
        let option = document.createElement('option')
        option.value = element
        option.innerHTML = element
        if (indexType == 0) {
          option.selected = true
        }
        selectChoiceAnswerGroup.appendChild(option)
        indexAnswer++
      })

      choiceAnswerGroup.appendChild(labelChoiceAnswerGroup)
      choiceAnswerGroup.appendChild(selectChoiceAnswerGroup)
      quessGroupContent.appendChild(choiceAnswerGroup)
    } else if (typeQuess == 'multichoice') {
      quessGroupContent.innerHTML = ''
      for (let j = 1; j <= 4; j++) {
        let answerGroup = document.createElement('div')
        answerGroup.classList.add('answer-group')

        let labelAnswerGroup = document.createElement('label')
        labelAnswerGroup.classList.add('answer-group-label')
        labelAnswerGroup.innerHTML = 'Answer ' + j

        let inputAnswerGroup = document.createElement('input')
        inputAnswerGroup.type = 'text'
        inputAnswerGroup.classList.add('form-control')
        inputAnswerGroup.placeholder = 'Answer ' + j
        inputAnswerGroup.required = true

        answerGroup.appendChild(labelAnswerGroup)
        answerGroup.appendChild(inputAnswerGroup)
        quessGroupContent.appendChild(answerGroup)
      }

      let choiceAnswerGroup = document.createElement('div')
      choiceAnswerGroup.classList.add('choice-group-answer')
      choiceAnswerGroup.classList.add('choice-group')

      let labelChoiceAnswerGroup = document.createElement('label')
      labelChoiceAnswerGroup.classList.add('choice-group-label')
      labelChoiceAnswerGroup.innerHTML = 'True Answer'

      let formCheckContainer = document.createElement('div')
      formCheckContainer.classList.add('form-check-container')
      formCheckContainer.id = `form-check-container-${i}`

      let choiceAnswerArr = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
      let indexAnswer = 0
      choiceAnswerArr.forEach((element, key) => {
        let formCheck = document.createElement('div')
        formCheck.classList.add('form-check')

        let input = document.createElement('input')
        input.classList.add('form-check-input')
        input.type = 'checkbox'
        input.key = key
        input.required = true
        input.value = element

        let label = document.createElement('label')
        label.classList.add('form-check-label')
        label.innerHTML = element

        formCheck.appendChild(input)
        formCheck.appendChild(label)
        formCheckContainer.appendChild(formCheck)
        indexAnswer++
      })

      choiceAnswerGroup.appendChild(labelChoiceAnswerGroup)
      choiceAnswerGroup.appendChild(formCheckContainer)
      quessGroupContent.appendChild(choiceAnswerGroup)
    } else if (typeQuess == 'true-false') {
      quessGroupContent.innerHTML = ''

      let choiceAnswerGroup = document.createElement('div')
      choiceAnswerGroup.classList.add('choice-group-answer')
      choiceAnswerGroup.classList.add('choice-group')

      let labelChoiceAnswerGroup = document.createElement('label')
      labelChoiceAnswerGroup.classList.add('choice-group-label')
      labelChoiceAnswerGroup.innerHTML = 'Answer'

      let selectChoiceAnswerGroup = document.createElement('select')
      selectChoiceAnswerGroup.classList.add('form-select')
      selectChoiceAnswerGroup.classList.add('quess-answer-select')
      selectChoiceAnswerGroup.id = 'answer-quess-' + i
      let choiceAnswerArr = ['true', 'false']
      let indexAnswer = 0
      choiceAnswerArr.forEach((element) => {
        let option = document.createElement('option')
        option.value = element
        option.innerHTML = element
        if (indexType == 0) {
          option.selected = true
        }
        selectChoiceAnswerGroup.appendChild(option)
        indexAnswer++
      })

      choiceAnswerGroup.appendChild(labelChoiceAnswerGroup)
      choiceAnswerGroup.appendChild(selectChoiceAnswerGroup)
      quessGroupContent.appendChild(choiceAnswerGroup)
    } else if (typeQuess == 'input') {
      quessGroupContent.innerHTML = ''
      let answerGroup = document.createElement('div')
      answerGroup.classList.add('answer-group')

      let labelAnswerGroup = document.createElement('label')
      labelAnswerGroup.classList.add('answer-group-label')
      labelAnswerGroup.innerHTML = 'Answer '

      let inputAnswerGroup = document.createElement('input')
      inputAnswerGroup.type = 'text'
      inputAnswerGroup.classList.add('form-control')
      inputAnswerGroup.placeholder = 'Answer '
      inputAnswerGroup.required = true

      answerGroup.appendChild(labelAnswerGroup)
      answerGroup.appendChild(inputAnswerGroup)
      quessGroupContent.appendChild(answerGroup)
    }
  })

  mainContent.appendChild(quessGroup)
}

createQuizBtn.addEventListener('click', (e) => {
  let quizData = []
  let quessArr = []
  let scoreArr = []

  console.log(topic)
  console.log(numQuess)
  let titleAllQuess = document.querySelectorAll(
    '.quess-group-header .form-control'
  )
  let typeAllQuess = document.querySelectorAll('.type-select')
  let difficultAllQuess = document.querySelectorAll('.difficult-select')

  for (let i = 1; i <= numQuess; i++) {
    let obj = {}
    obj.quessNum = i
    obj.title = titleAllQuess[i - 1].value
    obj.difficult = difficultAllQuess[i - 1].value
    obj.type = typeAllQuess[i - 1].value
    obj.answerQuess = {}
    obj.answer = {}

    let score = document.querySelector(`#score-group-${i} .form-control`).value
    if (score) {
      scoreArr.push(score)
    } else {
      scoreArr.push(0)
    }

    if (typeAllQuess[i - 1].value == 'true-false') {
      let answer = document.querySelector(
        `.choice-group-answer #answer-quess-${i}`
      )

      obj.answer[0] = answer.value
    } else {
      if (typeAllQuess[i - 1].value == 'input') {
        let answer = document.querySelector(
          `#quess-group-content-${i} .answer-group .form-control`
        )
        obj.answer[0] = answer.value
      } else {
        let answerGroupAll = document.querySelectorAll(
          `#quess-group-content-${i} .answer-group`
        )
        answerGroupAll.forEach((element, key) => {
          let answer = element.querySelector('.form-control')
          obj.answerQuess[key + 1] = answer.value
        })

        if (typeAllQuess[i - 1].value == 'singlechoice') {
          let trueAnswer = document.querySelector(
            `.choice-group-answer #answer-quess-${i}`
          )
          switch (trueAnswer.value) {
            case 'Answer 1':
              obj.answer[0] = 1

              break
            case 'Answer 2':
              obj.answer[0] = 2

              break
            case 'Answer 3':
              obj.answer[0] = 3

              break
            case 'Answer 4':
              obj.answer[0] = 4

              break
            default:
              obj.answer[0] = 0
              break
          }
        }

        if (typeAllQuess[i - 1].value == 'multichoice') {
          let trueAnswer = document.querySelectorAll(
            `#form-check-container-${i} .form-check .form-check-input`
          )
          trueAnswer.forEach((element, key) => {
            if (element.checked) {
              obj.answer[key + 1] = element.key + 1
            }
          })
        }
      }
    }

    quessArr.push(obj)
  }

  divGroupInput.forEach((element, key) => {
    if (key != 1) {
      quizData.push(element.value)
    } else {
      if (element.value) {
        quizData.push(element.files[0].name)
      } else {
        quizData.push('')
      }
    }
  })
  // Upload Image
  if (divGroupInput[1].files[0]) {
    let dataForm = new FormData()
    dataForm.append('imageQuiz', divGroupInput[1].files[0])
    xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/api/create-quiz/upload', true)
    xhr.send(dataForm)
  }
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `http://localhost:3000/api/create-quiz`,
    data: {
      userId: userId,
      topic: topic,
      numQuess: numQuess,
      quizData: quizData,
      scoreArr: scoreArr,
      quessArr: quessArr
    }
  })
})
