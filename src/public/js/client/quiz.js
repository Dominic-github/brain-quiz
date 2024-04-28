let checkDiff = document.querySelectorAll('.btn-check')
let start = document.querySelector('.quiz-footer-start')
let close = document.querySelector('.quiz-footer-close')
let ranking = document.querySelector('.quiz-ranking')
let leaderContent = document.querySelector('.modal-body .leader-content')

close.addEventListener('click', () => {
  window.history.go(-1)
  return false
})

ranking.addEventListener('click', () => {
  let difficult
  leaderContent.innerHTML = ''
  checkDiff.forEach((input, key) => {
    if (input.checked == true) {
      difficult = input.value
    }
  })

  $.ajax({
    url: `http://localhost:3000/api/quiz/${quizId}/${difficult}/take`,
    type: 'GET',
    dataType: 'json', // added data type
    success: function (res) {
      if (res.errorCode == 0) {
        let take = Map.groupBy(res.take, ({ userId }) => userId)
        if (res.errorCode == 0 && take.size > 0) {
          const ribbon = document.createElement('div')
          ribbon.classList.add('ribbon')
          leaderContent.appendChild(ribbon)

          const table = document.createElement('table')
          table.classList.add('modal-table')

          let index = 0
          take.forEach((element) => {
            const row = table.insertRow() // Tạo hàng mới

            // Tạo cột cho số thứ tự
            const numberCell = row.insertCell()
            numberCell.classList.add('number')
            numberCell.textContent = index + 1

            // Tạo cột cho tên
            const nameCell = row.insertCell()
            nameCell.classList.add('name')
            nameCell.textContent = element[0].fullName

            // Tạo cột cho điểm
            const pointsCell = row.insertCell()
            pointsCell.classList.add('points')
            pointsCell.textContent = element[0].take_score

            if (index == 0) {
              const image = document.createElement('img')
              image.src = '/assets/images/icon/gold-medal.png'
              image.alt = 'gold-medal'
              image.classList.add('gold-medal')
              pointsCell.appendChild(image)
            }
            index++
          })
          leaderContent.appendChild(table)
        }
      }
    }
  })
})

start.addEventListener('click', () => {
  let difficult
  checkDiff.forEach((input, key) => {
    if (input.checked == true) {
      difficult = input.value
    }
  })
  window.location.replace(`http://localhost:3000/quiz/${quizId}/${difficult}`)
})
