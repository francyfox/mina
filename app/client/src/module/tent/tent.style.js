import { Fill, Icon, Stroke, Text } from 'ol/style'

export const tentStyle = (data) => {
  return {
    text: new Text({
      text: `${data.tentNo} \n${data.personCount}`,
      font: '1.5em sans-serif',
      fill: new Fill({
        color: 'black'
      }),
      offsetY: 0,
      stroke: new Stroke({
        color: 'white',
        width: 3
      })
    }),
    stroke: new Stroke({
      width: 2,
      color: data.color
    }),
    fill: new Fill({
      color: data.color + '33'
    })
  }
}

export const pointDoorStyle = () => {
  return {
    geometry: function (feature) {
      const modifyGeometry = feature.get('modifyGeometry');
      return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
    },
    image: new Icon({
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTYuMjUgMi43NWExLjUgMS41IDAgMCAwLTEuNSAxLjV2MTUuNWExLjUgMS41IDAgMCAwIDEuNSAxLjVoNS45NGE2LjUgNi41IDAgMCAxIDcuMDYtMTAuMDEyVjQuMjVhMS41IDEuNSAwIDAgMC0xLjUtMS41SDYuMjV6bTIuMjUgMTAuNWExLjUgMS41IDAgMSAxIDAtM2ExLjUgMS41IDAgMCAxIDAgM3ptOSA5Ljc1YTUuNSA1LjUgMCAxIDAgMC0xMWE1LjUgNS41IDAgMCAwIDAgMTF6bTMuNS01LjVhLjUuNSAwIDAgMS0uNS41aC00Ljc5M2wxLjY0NyAxLjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC0yLjUtMi41YS41LjUgMCAwIDEgMC0uNzA4bDIuNS0yLjVhLjUuNSAwIDAgMSAuNzA4LjcwOEwxNS43MDcgMTdIMjAuNWEuNS41IDAgMCAxIC41LjV6IiBmaWxsPSIjMDhiMzI3Ij48L3BhdGg+PC9nPjwvc3ZnPg==',
      scale: 1.4,
      // rotation: angle
    }),
    fill: new Fill({
      color: '#fff',
    }),
    stroke: new Stroke({
      width: 1,
      color: '#000',
    }),
  }
}