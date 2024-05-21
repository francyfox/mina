import { mapInit } from '@/module/map/map.init.js'

window.lastActiveSelectId = ''
window.currentButton = ''
window.mousePosition = [0, 0]

document.addEventListener('mousemove', (e) => {
  window.mousePosition = [e.pageX, e.pageY]
}, false)

window.addEventListener("load", ymaps.ready(mapInit))

window.onbeforeunload = (e) => {
  if (import.meta.env.MODE === 'production') {
    if (!e) e = window.event
    e.cancelBubble = true
    e.returnValue = 'Вы действительно хотите уйти со страницы?'
    if (e.stopPropagation) {
      e.stopPropagation()
      e.preventDefault()
    }
  }
}