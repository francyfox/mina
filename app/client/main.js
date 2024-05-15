import './style.css'
import { mapInit } from './app/module/map/map.init.js'

window.currentButton = ''


window.onload = () => {
  ymaps.ready(mapInit);
  // mapInit()
}









