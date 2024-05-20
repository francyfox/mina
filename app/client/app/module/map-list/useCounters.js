export const setCounters = ({ count, square }) => {
  const totalCount = document.getElementById('totalCount')
  const totalSquare = document.getElementById('totalSquare')

  totalCount.textContent = count
  totalSquare.textContent = square
}

export const useCounters = (geoObjects) => {
  let total = {
    count: 0,
    square: 0
  }

  geoObjects.each(function (geoObject) {
    total.count += parseInt(geoObject.properties.get('count') | '0')
    total.square += parseInt(geoObject.properties.get('square') | '0')

    setCounters(total)

    geoObject.properties.events.add("change", function () {
      total.count += parseInt(geoObject.properties.get('count') | '0')
      total.square += parseInt(geoObject.properties.get('square') | '0')

      setCounters(total)
    })
  });
}
