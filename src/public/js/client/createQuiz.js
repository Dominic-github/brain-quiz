let createQuizTopic = document.querySelector('#create-quiz-topic')
let createQuizNumber = document.querySelector('#create-quiz-number')
let createQuizBtn = document.querySelector('.btn-create-quiz')

let numQrr = [10, 20, 30]

numQrr.forEach((element) => {
  let option = document.createElement('option')
  option.value = element
  option.innerHTML = element
  createQuizNumber.appendChild(option)
})

$.ajax({
  url: 'http://localhost:3000/api/get-all-topic',
  type: 'GET',
  dataType: 'json', // added data type
  success: function (res) {
    let topic = res.topic
    if (res.errorCode == 0) {
      topic.forEach((element) => {
        let option = document.createElement('option')
        option.key = element.id
        option.value = element.name
        option.innerHTML = element.name
        createQuizTopic.appendChild(option)
      })
    }
  }
})

createQuizBtn.addEventListener('click', (e) => {
  if (createQuizTopic.value != 'null' && createQuizNumber.value != 'null') {
    let topic = createQuizTopic.value
    let number = createQuizNumber.value
    window.location.replace(
      `http://localhost:3000/createquess/${topic}/${number}`
    )
  }
})
