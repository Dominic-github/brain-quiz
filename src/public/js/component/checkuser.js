// function getCookie(cName) {
//   const name = cName + '='
//   const cDecoded = decodeURIComponent(document.cookie) //to be careful
//   const cArr = cDecoded.split('; ')
//   let res = ''
//   cArr.forEach((val) => {
//     if (val.indexOf(name) === 0) res = val.substring(name.length)
//   })
//   if (res != '') {
//     return JSON.parse(res)
//   } else {
//     return res
//   }
// }

function checkLogined() {
  let user = getCookie('user')
  if (user == '' || !user.email) {
    window.location.replace('http://localhost:3000/login')
  }
}
checkLogined()
