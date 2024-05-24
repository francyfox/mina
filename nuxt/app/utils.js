import { BASE_URL } from '@/consts.js'

export const transformPresetToColor = (preset) => {
  return preset.replace(/islands#|StretchyIcon/gi, '').toLowerCase()
}

export const getPlacemarkById = (id, geoObjects) => {
  return ymaps.geoQuery(geoObjects).search(`properties.id = "${id}"`)
}

export const getPlacemarkUserURL = (maktab) => `${BASE_URL}/maktab/${maktab}/view`
export const getPlacemarkAdminURL = (maktab) => `${BASE_URL}/maktab/${maktab}/admin`


export const getPlacemarkYandexURL = (coordinates) => {
  const url = new URL('https://yandex.ru/maps/')
  const [y, x] = coordinates
  url.searchParams.append('pt', `${x.toFixed(6)},${y.toFixed(6)}`)
  url.searchParams.append('z', '18')
  url.searchParams.append('l', 'sat')

  return url.toString()
}

export const incrementTentNo = (i) => {
  if (i) {
    if (!/-(.*)/.test(i)) {
      const number = Number(i)
      return number + 1
    } else {
      const match = i.split('-')
      const last = match.pop()
      console.log((Number(last) + 1).toString())
      match.push((Number(last) + 1).toString())
      return match.join('-')
    }
  } else {
    return null
  }
}



