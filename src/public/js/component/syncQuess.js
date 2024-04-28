// input
// multichoice
// true-false
// singlechoice

let difficult = getCookie('difficult')
let quizId = getCookie('quizId')
let userId = getCookie('user').id

let answerArr = []
let quessIdArr = []
let contentArr = []

let randomAnswer = [0, 1, 2, 3]

$.ajax({
  url: `http://localhost:3000/api/quiz/${quizId}/${difficult}/answer`,
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    let quizArr = []
    let answer = Map.groupBy(res.answer, ({ questionId }) => questionId)
    if (res.errorCode == 0) {
      answer.forEach((element, index) => {
        let obj = {}
        obj.id = element[0].questionId
        obj.question = element[0].title
        let type = element[0].type
        obj.type = type
        obj.quessScore = element[0].quessScore
        obj.quizScore = element[0].quizScore

        shuffle(randomAnswer)

        if (type == 'singlechoice') {
          let options = {
            A: element[randomAnswer[0]].content,
            B: element[randomAnswer[1]].content,
            C: element[randomAnswer[2]].content,
            D: element[randomAnswer[3]].content
          }
          obj.options = options
          if (element[randomAnswer[0]].correct == 1) {
            obj.answer = 'A'
          } else if (element[randomAnswer[1]].correct == 1) {
            obj.answer = 'B'
          } else if (element[randomAnswer[2]].correct == 1) {
            obj.answer = 'C'
          } else if (element[randomAnswer[3]].correct == 1) {
            obj.answer = 'D'
          }
        }

        if (type == 'multichoice') {
          let options = {
            A: element[randomAnswer[0]].content,
            B: element[randomAnswer[1]].content,
            C: element[randomAnswer[2]].content,
            D: element[randomAnswer[3]].content
          }
          obj.options = options
          obj.answer = []
          let stringArr = ['A', 'B', 'C', 'D']
          for (let i = 0; i < 4; i++) {
            if (element[randomAnswer[i]].correct == 1) {
              obj.answer.push(stringArr[randomAnswer[i]])
            }
          }
        }

        if (type == 'true-false') {
          let options = {
            A: 'True',
            B: 'False'
          }
          obj.options = options
          if (element[0].correct == 1) {
            obj.answer = 'A'
          } else if (element[1].correct == 1) {
            obj.answer = 'B'
          }
        }

        if (type == 'input') {
          obj.answer = element[0].content
        }
        quizArr.push(obj)
      })

      // App
      /* ========================
 ! - Important DOM Elements
 ==========================*/
      const questionSection = document.querySelector('.question-section')
      const questionText = questionSection.querySelector('.question-text')
      const questionOptionContainer =
        questionSection.querySelector('.question-options')
      const questionProgressText = questionSection.querySelector(
        '.question-progress-text'
      )

      const typeQuessText = document.querySelector(
        '.question-type .question-type-text'
      )
      const AnswerQuessText = document.querySelector(
        '.question-type .question-answer-text'
      )

      const timeText = questionSection.querySelector('.time-count')
      const scoreElement = questionSection.querySelector('.score')
      const timelineElement = questionSection.querySelector('.timeline')
      const questionProgressbar =
        questionSection.querySelector('.question-progress')

      const questionAction = document.querySelector('.question-action')
      const resultSection = document.querySelector('.result-section')
      const canvas = document.getElementById('my-canvas')
      const resultExpression = resultSection.querySelector('.result-expression')
      const resultText = resultSection.querySelector('.result-text')
      const resultFeedback = resultSection.querySelector('.feedback')
      const restart = resultSection.querySelector('.restart')
      const backHome = resultSection.querySelector('.back-to-home')
      const loadingContainer = document.querySelector('.loading-container')

      /* =====================
 ! - Important Variables - *
 =======================*/

      let questionIndex = 0
      let timeCount
      let userScore = 0
      let counter // it will track the timer
      let timelineCounter

      /* ===================
 ! - Important Elements - *
 =====================*/
      // tick icon
      let tick = document.createElement('div')
      tick.classList.add('tick-icon')
      tick.innerHTML = `<i class="fa-solid fa-check"></i>`

      // cross icon
      let cross = document.createElement('div')
      cross.classList.add('cross-icon')
      cross.innerHTML = `<i class="fa-solid fa-xmark"></i>`

      /* ===================
 ! - Confetti Settings - *
 ====================*/
      var confettiSettings = {
        target: 'my-canvas',
        max: '250',
        size: '1.8',
        rotate: true,
        clock: '29',
        start_from_edge: true
      }
      var confetti = new ConfettiGenerator(confettiSettings)

      /* ========================
 ! - Important Functions - *
 ==========================*/

      /*
! - Initial show Function
 * - // initial setup before showing question
* - // it is used in for later restart and back to home event listener
 */
      const initialShowQuestion = () => {
        //Remove the result sections
        resultSection.classList.remove('active')
        canvas.style.display = 'none'

        // the question and score will start from the 0
        answerArr = []
        quessIdArr = []
        contentArr = []
        questionIndex = 0
        userScore = 0
        scoreElement.textContent = userScore
      }

      /*
 ! - Show Question Function - *
 */
      const showQuestion = () => {
        // hidden answer input
        AnswerQuessText.classList.add('hidden')

        // show Question Section
        questionSection.classList.add('active')

        questionAction.innerHTML = ''
        questionOptionContainer.innerHTML = ''

        // Start the timer
        timer()

        // Start the timelineFunc
        timelineFunc()

        // If there is any single option, remove the all option
        if (document.querySelectorAll('.single-option')) {
          document
            .querySelectorAll('.single-option')
            .forEach((element) => element.remove())
        }

        // showing question text
        questionText.textContent = `${questionIndex + 1}. ${
          quizArr[questionIndex].question
        }`

        // showing type of question
        typeQuessText.innerHTML = 'Type: ' + quizArr[questionIndex].type

        // Showing question Options

        if (
          quizArr[questionIndex].type == 'singlechoice' ||
          quizArr[questionIndex].type == 'true-false'
        ) {
          const options = quizArr[questionIndex].options
          for (let option in options) {
            let singleQuestionElement = document.createElement('div')
            singleQuestionElement.classList.add('single-option')
            singleQuestionElement.innerHTML = `
    <span class="single-option-text"> ${option}.  ${options[option]}</span>`
            singleQuestionElement.addEventListener('click', (e) =>
              selectedAnswer(option, e)
            )
            questionOptionContainer.append(singleQuestionElement)
          }
        }

        if (quizArr[questionIndex].type == 'multichoice') {
          let checkBtn = document.createElement('button')
          checkBtn.classList.add('btn')
          checkBtn.classList.add('check-question')
          checkBtn.innerHTML = 'Check Answer'
          questionAction.appendChild(checkBtn)

          const options = quizArr[questionIndex].options
          for (let option in options) {
            let singleQuestionElement = document.createElement('div')
            singleQuestionElement.classList.add('single-option')
            singleQuestionElement.id = option
            singleQuestionElement.innerHTML = `
    <span class="single-option-text"'> ${option}.  ${options[option]}</span>`
            singleQuestionElement.addEventListener('click', (e) => {
              singleQuestionElement.classList.toggle('choice')
            })

            questionOptionContainer.append(singleQuestionElement)
          }

          checkBtn.addEventListener('click', (e) => {
            selectedAnswer(options, e)
          })
        }

        if (quizArr[questionIndex].type == 'input') {
          AnswerQuessText.innerHTML = 'Answer: ' + quizArr[questionIndex].answer
          let inputAnswer = document.createElement('input')
          inputAnswer.classList.add('form-control')
          questionOptionContainer.append(inputAnswer)

          let checkBtn = document.createElement('button')
          checkBtn.classList.add('btn')
          checkBtn.classList.add('check-question')
          checkBtn.innerHTML = 'Check Answer'
          questionAction.appendChild(checkBtn)

          checkBtn.addEventListener('click', () => {
            inputAnswerCheck(inputAnswer)
          })
        }

        // Question Progress Text
        questionProgress()
      }

      /*
 ! - Timeline Fuction - *
 */
      const timelineFunc = () => {
        // initially the width will be 100%
        timelineElement.style.width = `100%`
        timeText.textContent = 30

        timelineCounter = setInterval(() => {
          // get the time
          const getTime = Number(timeText.textContent)

          // the width will change, according to the time
          timelineElement.style.width = `${getTime * (10 / 3)}%`
        }, 1000)
      }

      /*
 ! - After select an option, this selected answer function will be triggered - *
 */
      const selectedAnswer = (option, e) => {
        let type = quizArr[questionIndex].type
        // clear the time
        clearInterval(counter)

        // clear the timeline
        clearInterval(timelineCounter)

        if (type == 'singlechoice' || type == 'true-false') {
          // Get the Correct Answer
          const selectedOption = option
          const correctOption = quizArr[questionIndex].answer
          //  Checking condition
          if (selectedOption === correctOption) {
            userScore += quizArr[questionIndex].quessScore
            scoreElement.textContent = userScore
            answerArr.push(1)
            quessIdArr.push(quizArr[questionIndex].id)
            contentArr.push('')

            showIconTick(e, true)
          } else {
            showIconTick(e, false)
            answerArr.push(0)
            quessIdArr.push(quizArr[questionIndex].id)
            contentArr.push('')

            showCorrectAnswer(quizArr[questionIndex].type)
          }

          // After selected an option, User can not select any of the option again
          const singleOption = document.querySelectorAll('.single-option')
          singleOption.forEach((element) => element.classList.add('disabled'))

          // show the next question button
          nextQuizBtnChange()
        }

        if (type == 'multichoice') {
          // Get the Correct Answer
          const selectedOption = document.querySelectorAll(
            '.question-options .choice'
          )
          const correctOption = quizArr[questionIndex].answer
          let isAnswer = true
          for (let index = 0; index < selectedOption.length; index++) {
            //  Checking condition
            const indexCheck = correctOption.indexOf(selectedOption[index].id)
            if (indexCheck > -1) {
            } else {
              isAnswer = false
              break
            }
          }

          if (isAnswer) {
            userScore += quizArr[questionIndex].quessScore
            scoreElement.textContent = userScore
            answerArr.push(1)
            quessIdArr.push(quizArr[questionIndex].id)
            contentArr.push('')
            showIconTick(e, true)
          } else {
            showIconTick(e, false)
            answerArr.push(0)
            quessIdArr.push(quizArr[questionIndex].id)
            contentArr.push('')
            showCorrectAnswer(quizArr[questionIndex].type)
          }

          // After selected an option, User can not select any of the option again
          const singleOption = document.querySelectorAll('.single-option')
          singleOption.forEach((element) => element.classList.add('disabled'))

          // show the next question button
          nextQuizBtnChange()
        }
      }

      const multichoiceAnswerCheck = (check) => {}

      const inputAnswerCheck = (element) => {
        // clear the time
        clearInterval(counter)

        // clear the timeline
        clearInterval(timelineCounter)
        element.readOnly = true
        if (element.value == quizArr[questionIndex].answer) {
          userScore += quizArr[questionIndex].quessScore
          scoreElement.textContent = userScore
          AnswerQuessText.classList.remove('hidden')
          element.classList.add('form-control-true')
          answerArr.push(1)
          quessIdArr.push(quizArr[questionIndex].id)
          contentArr.push(element.value)

          // show the next question button
          nextQuizBtnChange()
        } else {
          element.classList.add('form-control-false')
          answerArr.push(0)
          quessIdArr.push(quizArr[questionIndex].id)
          contentArr.push(element.value)

          // show the next question button
          nextQuizBtnChange()
        }
      }

      const selectedAnswerMultichoice = (options, e) => {
        // Get the Correct Answer
        const selectedOption = option
        const correctOption = quizArr[questionIndex].answer
      }

      /*
! - Show Icon Tick Function
*/
      const showIconTick = (e, isTick) => {
        let type = quizArr[questionIndex].type
        if (type == 'multichoice') {
          const correctOption = quizArr[questionIndex].answer
          let choice = document.querySelectorAll('.choice')
          choice.forEach((element) => {
            // tick icon
            let tick = document.createElement('div')
            tick.classList.add('tick-icon')
            tick.innerHTML = `<i class="fa-solid fa-check"></i>`

            // cross icon
            let cross = document.createElement('div')
            cross.classList.add('cross-icon')
            cross.innerHTML = `<i class="fa-solid fa-xmark"></i>`

            let indexCheck = correctOption.indexOf(element.id)
            if (indexCheck > -1) {
              element.appendChild(tick)
            } else {
              element.appendChild(cross)
            }
          })
        } else {
          if (e.target.classList.contains('single-option')) {
            e.target.children[0].insertAdjacentElement(
              'afterend',
              isTick === true ? tick : cross
            )
            e.target.classList.add(isTick === true ? 'correct' : 'incorrect')
          } else {
            e.target.insertAdjacentElement(
              'afterend',
              isTick === true ? tick : cross
            )
            e.target.parentNode.classList.add(
              isTick === true ? 'correct' : 'incorrect'
            )
          }
        }
      }

      /*
! - Show Correct Answer Function
*/
      const showCorrectAnswer = (type) => {
        if (type == 'singlechoice' || type == 'true-false') {
          // find all single options
          const singleOption = document.getElementsByClassName('single-option')
          // correct answer
          const correctOption = quizArr[questionIndex].answer

          // looping the option and show the correct option with tick
          for (let option of singleOption) {
            if (option.textContent.trim().slice(0, 1) == correctOption) {
              option.children[0].insertAdjacentElement('afterend', tick)
              option.classList.add('correct')
            }

            // After showing the correct Answer, disable all the option
            option.classList.add('disabled')
          }
        }

        if (type == 'multichoice') {
          // find all single options
          const choiceOption = document.querySelectorAll('.choice')
          // correct answer
          const correctOption = quizArr[questionIndex].answer
          for (let option of choiceOption) {
            if (correctOption.includes(option.textContent.trim().slice(0, 1))) {
              option.classList.add('correct')
            } else {
              option.classList.add('incorrect')
            }

            // After showing the correct Answer, disable all the option
            option.classList.add('disabled')
          }
        }
        if (type == 'input') {
          let input = document.querySelector('.question-options .form-control')
          AnswerQuessText.classList.remove('hidden')
          input.readOnly = true
          input.classList.add('form-control-false')
        }
      }

      /*
! -  Question Progress Function
*/
      const questionProgress = () => {
        // Question Progress Loading
        questionProgressbar.style.width = `${
          ((questionIndex + 1) / quizArr.length) * 100
        }%`

        // Question Progress Text
        questionProgressText.innerHTML = `<span class="bold">${
          questionIndex + 1
        } </span> of  <span class="bold">${quizArr.length}</span> Questions`
      }

      /*
! - Timer Function
*/
      const timer = () => {
        // initially the time start from 10 seconds
        timeCount = 30
        timeText.textContent = timeCount
        counter = setInterval(() => {
          timeCount--
          timeText.textContent = timeCount
          if (timeCount == 0) {
            // The score and the timeline width will be 0

            timeText.textContent = '0' + timeCount
            timelineElement.style.width = `0%`

            // Clear the time counter and timeline counter
            clearInterval(counter)
            clearInterval(timelineCounter)
            answerArr.push(0)
            quessIdArr.push(quizArr[questionIndex].id)
            if (quizArr[questionIndex].type == 'input') {
              let input = document.querySelector(
                '.question-options .form-control'
              )
              contentArr.push(input.value)
            } else {
              contentArr.push('')
            }
            // show the correct answer
            showCorrectAnswer(quizArr[questionIndex].type)

            // show the next question button
            nextQuizBtnChange()
          } else {
            // Show the time
            if (timeCount < 10) {
              timeText.textContent = '0' + timeCount
            }
            timeText.textContent = timeCount
          }
        }, 1000)
      }

      /*
! - Next Quiz Button Change function
*/
      const nextQuizBtnChange = () => {
        questionAction.innerHTML = ''
        let nextBtn = document.createElement('button')
        nextBtn.classList.add('btn')
        nextBtn.classList.add('next-question')
        nextBtn.innerHTML = 'Next Question'
        questionAction.appendChild(nextBtn)

        if (questionIndex === quizArr.length - 1) {
          nextBtn.textContent = 'Show Result'
        } else {
          nextBtn.textContent = 'Next Question'
        }

        nextBtn.addEventListener('click', async () => {
          // Increasing the question index
          questionIndex++

          // if the question completed then the result will show
          if (questionIndex > quizArr.length - 1) {
            await saveScore()
            showResult()
          } else {
            // Show the Question
            showQuestion()
          }
        })
      }

      /*
! - Show Result Function
*/
      const showResult = () => {
        questionSection.classList.remove('active')
        resultSection.classList.add('active')
        canvas.style.display = 'block'

        // Show the result in the result text
        resultText.textContent = `You scored ${userScore} points`

        // Giving feedback
        scoreFeedback(userScore)
      }

      const saveScore = async () => {
        $.ajax({
          type: 'POST',
          url: `http://localhost:3000/api/user/${userId}/quiz/${quizId}/${difficult}/take`,
          data: {
            answerArr: answerArr,
            userScore: userScore,
            quessIdArr: quessIdArr,
            contentArr: contentArr
          },
          dataType: 'json'
        })
      }

      /*
! - Score Feedback Function
*/
      const scoreFeedback = (userScore) => {
        let quizScore = quizArr[0].quizScore

        // the result will show according to the score
        if (userScore >= quizScore * 0.8 && userScore <= quizScore) {
          confettiStart()
          resultFeedback.textContent = `Bạn đã làm bài thi rất tốt!`
        } else if (
          userScore >= quizScore * 0.6 &&
          userScore < quizScore * 0.8
        ) {
          confettiStart()
          resultFeedback.textContent = `Bạn đã làm khá tốt bài thi! Hãy cố gắng ở lần thi sau. `
        } else if (
          userScore >= quizScore * 0.4 &&
          userScore < quizScore * 0.6
        ) {
          confettiStart()
          resultFeedback.textContent = `Bạn hiểu khá rõ về bài thi , nhưng vẫn còn chỗ để cải thiện. Điều quan trọng là tiếp tục thực hành và xem lại tài liệu để củng cố sự hiểu biết và kỹ năng của bạn. Tôi khuyên bạn nên tìm kiếm thêm nguồn lực và sự trợ giúp để giúp bạn cải thiện chủ đề này.`
        } else {
          confetti.clear()
          resultExpression.textContent = `Cần cải thiện!!!!`
          resultFeedback.textContent = `Kết quả của bài trắc nghiệm này không đạt yêu cầu, rõ ràng là bạn có hiểu biết hạn chế về bài thi này. Điều quan trọng là bạn phải nỗ lực nhiều hơn và tìm kiếm sự trợ giúp để nâng cao hiểu biết và kỹ năng của bạn về chủ đề này. Tôi khuyên bạn nên xem lại tài liệu và luyện tập thường xuyên để cải thiện hiệu suất của mình.`
        }
      }

      /*
! - Confetti Start Functionality
*/
      const confettiStart = () => {
        setTimeout(() => confetti.render(), 500)
      }

      /* ==========================
! - Event Listeners
============================*/

      // Start Quiz Event Listener
      let startQuiz = () => {
        // before question start, there will be a loading state, after the first question, the loading option will not be shown
        if (questionIndex === 0) {
          loadingContainer.style.display = 'flex'
          document.body.style.overflow = 'hidden'
          setTimeout(() => {
            loadingContainer.style.display = 'none'
            showQuestion()
          }, 2500)
        } else {
          //   Show the question
          showQuestion()
        }

        // From the beginning the score will be 0
        scoreElement.textContent = 0
      }
      let nextBtn = document.createElement('button')
      nextBtn.classList.add('btn')
      nextBtn.classList.add('next-question')
      nextBtn.innerHTML = 'Next Question'
      nextBtn.style.display = 'none'
      questionAction.appendChild(nextBtn)
      // Next Quiz Event listener
      nextBtn.addEventListener('click', async () => {
        // Increasing the question index
        questionIndex++

        // if the question completed then the result will show
        if (questionIndex > quizArr.length - 1) {
          await saveScore()
          showResult()
        } else {
          // Show the Question
          showQuestion()
        }
      })

      // Restart Event functionality
      restart.addEventListener('click', () => {
        // some initial task will show before shoing question
        // like - removing the result section, and reset the time and score as well
        initialShowQuestion()

        // before question start, there will be a loading state, after the first question, the loading option will not be shown
        if (questionIndex === 0) {
          loadingContainer.style.display = 'flex'
          document.body.style.overflow = 'hidden'
          setTimeout(() => {
            loadingContainer.style.display = 'none'
            showQuestion()
          }, 2500)
        } else {
          //   Show the question
          showQuestion()
        }
      })

      // Back To Home Event listner
      backHome.addEventListener('click', () => {
        window.location.replace('http://localhost:3000/home')
      })

      startQuiz()
    }
  }
})
