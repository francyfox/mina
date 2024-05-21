import { BASE_URL } from '@/consts.js'

export const transformPresetToColor = (preset) => {
  return preset.replace(/islands#|StretchyIcon/gi, '').toLowerCase()
}

export const getPlacemarkById = (id, geoObjects) => {
  return ymaps.geoQuery(geoObjects).search(`properties.id = "${id}"`)
}

export const getPlacemarkUserURL = (coordinates) =>
  `${BASE_URL}#&ll=${coordinates.join(',')}&z=18`

export const getPlacemarkYandexURL = (coordinates) => {
  const url = new URL('https://yandex.ru/maps/')
  const [y, x] = coordinates
  url.searchParams.append('pt', `${x.toFixed(6)},${y.toFixed(6)}`)
  url.searchParams.append('z', '18')
  url.searchParams.append('l', 'sat')

  return url.toString()
}


export const getPlacemarkAdminURL = (coordinates) =>
  `${BASE_URL}#&admin=true&ll=${coordinates.join(',')}&z=18`
