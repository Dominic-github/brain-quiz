function checkAdmin() {
  let user = getCookie('user')
  if (!user || !user.email) {
    window.location.replace('http://localhost:3000/login')
  }
  if (user.roleId != 1) {
    window.location.replace('http://localhost:3000/home')
  }
}
checkAdmin()
