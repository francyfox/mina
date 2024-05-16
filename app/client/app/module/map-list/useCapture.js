export const useCapture = (el) => {
  const captureMode = document.getElementById('captureMode')
  const captureAll = document.getElementById('captureAll')
  const container = document.querySelector('.map-list-container')
  const mapListItems = el.querySelectorAll('.map-list-item')

  for (const item of mapListItems) {
    item.addEventListener('click', (e) => {
      if (container.classList.contains('capture-mode')) {
        e.target.classList.toggle('active')
      }
    })
  }

  captureMode.addEventListener('change', () => {
    container.classList.toggle('capture-mode')

    if (!container.classList.contains('capture-mode')) {
      for (const item of mapListItems) {
        item.classList.remove('active')
      }
    }
  })

  captureAll.addEventListener('click', (e) => {
    captureMode.checked = true
    const container = document.querySelector('.map-list-container')
    container.classList.toggle('capture-mode')
    const mapListItems = el.querySelectorAll('.map-list-item')

    for (const item of mapListItems) {
      if (item.style.display !== 'none') {
        item.classList.add('active')
      }
    }
  })
}