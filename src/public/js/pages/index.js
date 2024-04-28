// Switch form
let containerForm = document.getElementById('container')
let formSignUp = document.querySelector('.sign-up')
let formSignIn = document.querySelector('.sign-in')
let registerBtn = document.querySelectorAll('#register')
let loginBtn = document.querySelectorAll('#login')

let toggleForm = () => {
  containerForm.classList.toggle('active')
}
registerBtn[0].addEventListener('click', () => {
  toggleForm()
})
loginBtn[0].addEventListener('click', () => {
  toggleForm()
})
registerBtn[1].addEventListener('click', () => {
  toggleForm()
})
loginBtn[1].addEventListener('click', () => {
  toggleForm()
})

function checkAction() {
  let action = getCookie('action')
  let user = getCookie('user')
  if (user && user.email && action == 'logoutPage') {
    setCookie('user', '', 0)
  }
  setCookie('action', '', 0)
  setCookie('quizId', '', 0)
  setCookie('difficult', '', 0)
}
checkAction()

function showMessage() {
  let data = getCookie('data')
  let user = getCookie('user')

  if (user != '' && user.email) {
    if (user.roleId == 0) {
      window.location.replace('http://localhost:3000/home')
    } else {
      window.location.replace('http://localhost:3000/admin/dashboard')
    }
  }

  if (data != '' && data.errorCode != 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.message
    })
    setCookie('data', '', 0)
  } else {
    if (user != '') {
      if (user.roleId == 0) {
        window.location.replace('http://localhost:3000/home')
      } else {
        window.location.replace('http://localhost:3000/admin/dashboard')
      }
    }
  }
}
showMessage()
