let quizId = getCookie('quizId')

$.ajax({
  url: `http://localhost:3000/api/quiz/${quizId}`,
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    let quiz = res.quiz
    if (res.errorCode == 0) {
      let imageQuiz = document.querySelector('.quiz-header-image')
      let titleQuiz = document.querySelector('.quiz-header-name')
      let subTitleQuiz = document.querySelector('.quiz-header-sub')
      let lenghtQuiz = document.querySelector('.quiz-header-quess')
      let playedQuiz = document.querySelector('.quiz-header-played')

      imageQuiz.src = quiz.image
      titleQuiz.innerHTML = quiz.title
      subTitleQuiz.innerHTML = quiz.subTitle
      lenghtQuiz.innerHTML = 'Quesstion: ' + quiz.length + ' qs'
      playedQuiz.innerHTML = 'Played: ' + quiz.played + ' played'
    }
  }
})
