let headerInfoIcon = document.querySelector('.header-info-icon')
let headerInfoLink = document.querySelector('.header-info-link')
let headerInfoIconBars = document.querySelector('.header-info-icon .fa-solid')

headerInfoIcon.addEventListener('click', () => {
  headerInfoLink.classList.toggle('hidden')
  headerInfoIconBars.classList.toggle('fa-xmark')
})

let searchContainer = document.querySelector('.search-container')
let searchBtn = document.querySelector('.fas.fa-search')
let searchInput = document.querySelector('.search-input')
searchBtn.addEventListener('click', () => {
  let string = searchInput.value
  window.location.replace(`http://localhost:3000/search/${string}`)
})
