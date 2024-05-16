export const useCapture = (el) => {
  const captureMode = document.getElementById('captureMode')
  const captureAll = document.getElementById('captureAll')

  captureMode.addEventListener('change', (e) => {
    const container = document.querySelector('.map-list-container')
    container.classList.toggle('capture-mode')

    if (container.classList.contains('capture-mode')) {
      const mapListItems = el.querySelectorAll('.map-list-item')

      for (const item of mapListItems) {
        item.addEventListener('click', (e) => {
          e.target.classList.toggle('active')
        })
      }
    }
  })

  captureAll.addEventListener('click', (e) => {
    captureMode.checked = true
    const mapListItems = el.querySelectorAll('.map-list-item')


    for (const item of mapListItems) {
      item.classList.add('active')
    }
  })
}