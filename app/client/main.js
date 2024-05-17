import '@unocss/reset/tailwind-compat.css'
import 'bulma/css/bulma.min.css'
import './style.pcss'
import { mapInit } from '@/module/map/map.init.js'

window.currentButton = ''
window.mousePosition = [0, 0]

document.addEventListener('mousemove', (e) => {
  window.mousePosition = [e.pageX, e.pageY]
}, false)

window.onload = () => {
  ymaps.ready(mapInit)
  // mapInit()
}

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












