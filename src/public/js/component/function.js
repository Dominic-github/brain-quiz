function getCookie(cName) {
  let name = cName + '='
  let cDecoded = decodeURIComponent(document.cookie) //to be careful
  let cArr = cDecoded.split('; ')
  let res = ''
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length)
  })
  if (res != '') {
    return JSON.parse(res)
  } else {
    return res
  }
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function removeCookie(name) {
  let cname = getCookie(name)
  if (cname != '') setCookie(name, '', 0)
}

function shuffle(array) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }
}

// example
// $.ajax({
//   url: 'http://localhost:3000/api/quiz/1/quess/',
//   type: 'GET',
//   dataType: 'json', // added data type
//   success: function (res) {
//     console.log(res)
//     alert(res)
//   }
// })
