window.lastActiveSelectId = ''
export const useCapture = (el) => {
  const captureAll = document.getElementById('captureAll')
  const mapListItems = el.querySelectorAll('.map-list-item .checkbox-select input')

  for (const item of mapListItems) {
    item.addEventListener('click', (e) => {
      if (e.ctrlKey) {
        const parent = Array.prototype.slice.call(el.children)
        const lastIndex = parent.indexOf(el.querySelector(`[data-id="${window.lastActiveSelectId}"]`))
        const index = parent.indexOf(e.target.closest('.map-list-item'))

        const selected = (index > lastIndex)
          ? parent.slice(lastIndex, index)
          : parent.slice(index, lastIndex)

        const needSelect = selected.filter((i) => {
          return parent[index].classList.contains('active') === i.classList.contains('active')
        })

        for (const i of needSelect) {
          i.querySelector('.checkbox-select').click()
        }
      }

      e.target.closest('.map-list-item').classList.toggle('active')
      e.target.closest('.map-list-item').querySelector('.checkbox-select input').checked = e.target.closest('.map-list-item').classList.contains('active')

      window.lastActiveSelectId = e.target.closest('.map-list-item').dataset.id
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
