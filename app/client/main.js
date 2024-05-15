import './style.css'
import { mapInit } from './app/module/map/map.init.js'

window.currentButton = ''
window.mousePosition = [0, 0]

document.addEventListener('mousemove', (e) => {
  window.mousePosition = [e.pageX, e.pageY]
}, false);

window.onload = () => {
  ymaps.ready(mapInit);
  // mapInit()
}









