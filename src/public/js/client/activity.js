let tab = document.querySelectorAll('.tab')
let nav = getCookie('nav')
let userId = getCookie('user').id

let checkNav = () => {
  if (nav == 'created') {
    tab[1].classList.add('active')
    tab[0].classList.remove('active')
  } else {
    tab[0].classList.add('active')
    tab[1].classList.remove('active')
  }
  removeCookie(nav)
}

checkNav()

let mainContent = document.querySelector('.main-content')
let nothingHeader = document.querySelector('.nothing-header')
let nothingImg = document.querySelector('.nothing-img')
let nothingBtn = document.querySelector('.nothing-btn')
let nothingMainContent = document.querySelector('.main-content-nothing')

$.ajax({
  url: `http://localhost:3000/api/activity/${nav}/${userId}`,
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    if (res.errorCode == 0) {
      let quiz = Map.groupBy(res.quiz, ({ topic }) => topic)
      let mainContainerContent = document.createElement('div')
      mainContainerContent.classList.add('main-container-content')
      if (quiz.size == 0) {
        nothingMainContent.classList.remove('hidden')
        if (nav == 'completed') {
          nothingHeader.textContent =
            "It looks like you don't have any games in progress..."
          nothingImg.src = '/assets/images/icon/activity_empty.png'
          nothingBtn.textContent = 'Find a quiz'
        } else if (nav == 'created') {
          nothingHeader.textContent = "You haven't created a quiz yet."
          nothingImg.src = '/assets/images/icon/create_illustration.png'
          nothingBtn.textContent = 'Create a quiz'
        }
      } else {
        let index = 0
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

            if (nav != 'created') {
              let quizAccuracy = document.createElement('div')
              quizAccuracy.classList.add('accuracy-bar')
              let quizAccuracyText = document.createElement('span')
              quizAccuracyText.classList.add('accuracy-bar-text')
              quizAccuracyText.innerHTML =
                (item.take_score / item.score) * 100 + '% accuracy'
              quizAccuracy.appendChild(quizAccuracyText)
              quizLink.appendChild(quizAccuracy)
            }

            quizItem.appendChild(quizLink)
            quizList.appendChild(quizItem)
            quizContainer.appendChild(quizList)
          })

          mainContainerContent.appendChild(quizContainer)
          mainContent.appendChild(mainContainerContent)
        })
      }
      removeCookie('nav')
    }
  }
})
