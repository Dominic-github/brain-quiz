let mainContainer = document.querySelector('.main-container')

$.ajax({
  url: 'http://localhost:3000/api/get-all-quiz/',
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    if (res.errorCode == 0) {
      let quiz = Map.groupBy(res.quiz, ({ topic }) => topic)
      let index = 0
      quiz.forEach((value, key) => {
        let mainContainerContent = document.createElement('div')
        mainContainerContent.classList.add('main-container-content')

        let quizHeader = document.createElement('div')
        quizHeader.classList.add('quiz-header')

        let quizHeaderText = document.createElement('p')
        quizHeaderText.classList.add('quiz-header-text')
        quizHeaderText.textContent = value[0].topic

        let quizSeeMoreBtn = document.createElement('a')
        quizSeeMoreBtn.classList.add('quiz-see-more')
        quizSeeMoreBtn.classList.add('btn')
        quizSeeMoreBtn.textContent = 'See more'
        quizSeeMoreBtn.href = `/search/topic/${value[0].topic}`

        quizHeader.appendChild(quizHeaderText)
        quizHeader.appendChild(quizSeeMoreBtn)

        let quizContainer = document.createElement('div')
        quizContainer.classList.add('quiz-container')

        let quizList = document.createElement('ul')
        quizList.classList.add('quiz-container-list')
        if (value.length > 5) {
          value.length = 5
        }

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

        mainContainerContent.appendChild(quizHeader)
        mainContainerContent.appendChild(quizContainer)
        mainContainer.appendChild(mainContainerContent)
      })
    }
  }
})
