let mainContainer = document.querySelector('.main-container')

let searchQuizName = getCookie('search-quizname')
let searchTopic = getCookie('search-topic')

let url
if (searchTopic) {
  url = `http://localhost:3000/api/search/topic/${searchTopic}`
} else if (searchQuizName) {
  url = `http://localhost:3000/api/search/q/${searchQuizName}`
} else {
  url = `http://localhost:3000/api/get-all-quiz/`
}
$.ajax({
  url: url,
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    if (res.errorCode == 0) {
      let quiz = Map.groupBy(res.quiz, ({ topic }) => topic)
      let index = 0
      let mainContainerContent = document.createElement('div')
      mainContainerContent.classList.add('main-container-content')

      let quizContainer = document.createElement('div')
      quizContainer.classList.add('quiz-container')

      let quizList = document.createElement('ul')
      quizList.classList.add('quiz-container-list')
      quiz.forEach((value, key) => {
        value.filter((item, key) => {
          let quizItem = document.createElement('li')
          quizItem.classList.add('quiz-item')

          let quizLink = document.createElement('a')
          quizLink.classList.add('quiz-item-link')
          quizLink.href = `/quiz/${item.id}`

          let quizImage = document.createElement('img')
          quizImage.classList.add('quiz-img')
          quizImage.src = item.image
          quizImage.alt = ''

          let quizInfo = document.createElement('div')
          quizInfo.classList.add('quiz-info')

          let questionsLength = document.createElement('span')
          questionsLength.classList.add('questions-length')
          questionsLength.textContent = item.length + ' Qs'

          let timesPlayed = document.createElement('span')
          timesPlayed.classList.add('times-played')
          timesPlayed.textContent = item.played + ' played'

          quizInfo.appendChild(questionsLength)
          quizInfo.appendChild(timesPlayed)

          let quizName = document.createElement('p')
          quizName.classList.add('quiz-name')
          quizName.textContent = item.title

          quizLink.appendChild(quizImage)
          quizLink.appendChild(quizInfo)
          quizLink.appendChild(quizName)

          quizItem.appendChild(quizLink)
          quizList.appendChild(quizItem)
          quizContainer.appendChild(quizList)
        })

        mainContainerContent.appendChild(quizContainer)
        mainContainer.appendChild(mainContainerContent)
        removeCookie('search-quizname')
        removeCookie('search-topic')
      })
    }
  }
})
