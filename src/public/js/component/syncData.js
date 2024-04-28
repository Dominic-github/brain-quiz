let infoUsername = document.querySelector('.info-username')
let infoEmail = document.querySelector('.info-email')

function syncData() {
  let user = getCookie('user')
  infoUsername.innerHTML = user.fullName
  infoEmail.innerHTML = user.email
}
syncData()
