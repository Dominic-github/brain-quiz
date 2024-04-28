let avatarUserNameValue = document.querySelector('.avatar-user-name-value')
let user = getCookie('user')
avatarUserNameValue.innerHTML = user.fullName

let actionableSearchBtn = document.querySelector('.actionable-form-btn')
let actionableSearchInput = document.querySelector('.actionable-form-input')

actionableSearchBtn.addEventListener('click', () => {
  let string = actionableSearchInput.value
  window.location.replace(`http://localhost:3000/search/${string}`)
})

removeCookie('quizId')
removeCookie('nav')
