export const useCapture = (el) => {
  const captureAll = document.getElementById('captureAll')
  const mapListItems = el.querySelectorAll('.map-list-item .checkbox-select input')

  for (const item of mapListItems) {
    item.addEventListener('click', (e) => {
      e.target.closest('.map-list-item').classList.toggle('active')
      e.target.closest('.map-list-item').querySelector('.checkbox-select input').checked = e.target.closest('.map-list-item').classList.contains('active')
    })
  }

  captureAll.addEventListener('click', (e) => {
    const container = document.querySelector('.map-list-container')
    container.classList.add('capture-mode')
    const mapListItems = el.querySelectorAll('.map-list-item')

    for (const item of mapListItems) {
      if (item.style.display !== 'none') {
        item.classList.add('active')
        item.querySelector('.checkbox-select input').checked = true
      }
    }
  })
}
