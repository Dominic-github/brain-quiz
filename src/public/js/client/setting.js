let userId = getCookie('user').id
let settingsInputContent = document.querySelectorAll('.settings-input-content')

let inputFullNameModal = document.querySelector('.modal-fullname-input')
let inputPhoneModal = document.querySelector('.modal-phone-input')
let inputPasswordModal = document.querySelector('.modal-password-input')
let inputRePasswordModal = document.querySelector('.modal-repassword-input')
let inputDeleteModal = document.querySelector('.modal-delete-input')

function syncData() {
  let user = getCookie('user')
  settingsInputContent[0].innerHTML = user.fullName
  settingsInputContent[1].innerHTML = user.phone
  inputFullNameModal.value = user.fullName
  inputPhoneModal.value = user.phone
}
syncData()

let modalFullNameBtn = document.querySelector('#editFullName .btn-primary')
let modalPhoneBtn = document.querySelector('#editPhone .btn-primary')
let modalPasswordBtn = document.querySelector('#updatePassword .btn-primary')
let modalDeleteBtn = document.querySelector('#deleteAccount .btn-primary')

modalFullNameBtn.addEventListener('click', () => {
  let value = inputFullNameModal.value
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/api/user/update/${userId}/fullName/${value}`,
    data: {},
    dataType: 'json',
    success: function () {
      syncData()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Update Full Name Success!'
      })
    }
  })
})

modalPhoneBtn.addEventListener('click', () => {
  let value = inputPhoneModal.value
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/api/user/update/${userId}/phone/${value}`,
    dataType: 'json',
    success: function () {
      syncData()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Update Phone Success!'
      })
    }
  })
})

modalPasswordBtn.addEventListener('click', () => {
  if (
    inputPasswordModal.value == inputRePasswordModal.value &&
    inputPasswordModal.value.length > 4 &&
    inputRePasswordModal.value.length > 4
  ) {
    let value = inputPasswordModal.value
    $.ajax({
      type: 'POST',
      url: `http://localhost:3000/api/user/update/${userId}/password/${value}`,
      dataType: 'json',
      success: function () {
        syncData()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update Password Success!'
        })
      }
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Invalid password'
    })
  }
})

modalDeleteBtn.addEventListener('click', () => {
  let email = getCookie('user').email
  let value = inputDeleteModal.value
  if (email == value) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: 'POST',
          url: `http://localhost:3000/api/user/delete/${userId}`,
          dataType: 'json',
          success: function () {
            syncData()
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Delete Account Success!'
            }).then((result) => {
              removeCookie('user')
              window.location.replace(`http://localhost:3000/`)
            })
          }
        })
      }
    })
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'The email is invalid or not your email'
    })
  }
})
