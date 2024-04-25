import Toggle from 'ol-ext/control/Toggle'
import Button from 'ol-ext/control/Button'
import Select from 'ol/interaction/Select'
import Polygon from 'ol/geom/Polygon'
import { Draw } from 'ol/interaction'
import DrawRegular from 'ol-ext/interaction/DrawRegular'
import Tranform from 'ol-ext/interaction/Transform'
import { useModalStore } from '@/store/modal.js'
import { storeToRefs } from 'pinia'
import { useNotification } from 'naive-ui'


export class ControlBarButtons {
  vector
  // TODO: выглядит грязно
  constructor(vector) {
    this.vector = vector
  }

  settingsButtons() {
    const layerButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.505 3.117a1 1 0 0 0-1.011 0l-6.01 3.52a1 1 0 0 0 .003 1.726l6.009 3.502a1 1 0 0 0 1.007 0l6.009-3.502a1 1 0 0 0 .001-1.727l-6.009-3.52zM3.07 9.65l6.438 3.622a1 1 0 0 0 .98 0l6.438-3.622a1 1 0 0 1-.415 1.26l-6.01 3.502a1 1 0 0 1-1.006 0l-6.01-3.502a1 1 0 0 1-.415-1.26zm0 2.453l6.438 3.622a1 1 0 0 0 .98 0l6.438-3.622a1 1 0 0 1-.415 1.26l-6.01 3.502a1 1 0 0 1-1.006 0l-6.01-3.502a1 1 0 0 1-.415-1.26z" fill="currentColor"></path></g></svg>',
      className: 'bar-button layer',
      title: 'Слои',
      interaction: new Select(),
      active: false,
    })


    const metaButton = new Button({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M8 1v3.5A1.5 1.5 0 0 0 9.5 6H13v7.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11A1.5 1.5 0 0 1 4.5 1H8zm1 .25V4.5a.5.5 0 0 0 .5.5h3.25L9 1.25z" fill="currentColor"></path></g></svg>',
      className: 'bar-button meta',
      title: 'Метаданные',
      interaction: new Select(),
      active: false,
      handleClick: () => {
        const modalStore = useModalStore()
        const { showMetaModal, showMapElementModal } = storeToRefs(modalStore)

        showMetaModal.value =!showMetaModal.value
      }
    })

    const saveButton = new Button({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M18.5 20a.5.5 0 0 1-.5.5h-5v1c0 .171-.017.338-.05.5H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7h1.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621zM5 12h3v2H5v-2zm-2.5 0H4v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V12h.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 1 12 14.622V21.5a1.5 1.5 0 0 1-1.5 1.5H10v-5.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V23h-.5A1.5 1.5 0 0 1 1 21.5v-8A1.5 1.5 0 0 1 2.5 12zM9 18v5H4v-5h5z" fill="currentColor"></path></g></svg>',
      className: 'bar-button save',
      title: 'Сохранить',
      handleClick: () => {
        window.notification.success({
          title: 'Сохранено',
          duration: 1000
        })
      },
      active: false,
    })

    const removeLayerData = new Button({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-.5-.5z" fill="currentColor"></path></g></svg>',
      className: 'bar-button remove-layer-data',
      title: 'Удалить данные слоя',
      handleClick: () => {
        const modalStore = useModalStore()
        const { showEraseLayerModal } = storeToRefs(modalStore)

        showEraseLayerModal.value =!showEraseLayerModal.value
      },
      active: false,
    })

    return [
      layerButton,
      metaButton,
      saveButton,
      removeLayerData
    ]
  }
  actionsButtons() {
    const empty = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12v.01"></path><path d="M7 12h10"></path><path d="M21 12v.01"></path></g></svg>',
      className: 'bar-button empty',
      disable: true
    })

    const cursorButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M6.636 2.287A1 1 0 0 0 5 3.059v13.998c0 .927 1.15 1.355 1.756.655l3.524-4.073a1.5 1.5 0 0 1 1.134-.518h5.592c.938 0 1.36-1.176.636-1.772L6.636 2.287z" fill="currentColor"></path></g></svg>',
      className: 'bar-button cursor',
      title: 'Курсор',
      interaction: new Select({ hitTolerance: 2 }),
      autoActivate:true,
      active:true
    })

    const lineButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M17 3.002a2.998 2.998 0 1 1-2.148 5.09l-5.457 3.12a3.002 3.002 0 0 1 0 1.577l5.458 3.119a2.998 2.998 0 1 1-.746 1.304l-5.457-3.12a2.998 2.998 0 1 1 0-4.184l5.457-3.12A3 3 0 0 1 17 3.003z" fill="currentColor"></path></g></svg>',
      className: 'bar-button line',
      title: 'Линия',
      interaction: new Draw({
        type: 'Polygon',
        source: this.vector.getSource(),
        geometryFunction: function(coordinates, geometry) {
          this.nbpts = coordinates[0].length;
          if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
          else geometry = new Polygon(coordinates);

          return geometry;
        }
      }),
      onToggle: () => {
      },
      active: false,
    })

    const boxButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M13.798 2.217l-.015-.004l-.765-.248a1.578 1.578 0 0 1-1-.999L11.77.202a.302.302 0 0 0-.57 0l-.25.764a1.576 1.576 0 0 1-.983.999l-.765.248a.302.302 0 0 0 0 .57l.765.249a1.582 1.582 0 0 1 1 1.002l.248.764A.302.302 0 0 0 11.5 5h.004a.302.302 0 0 0 .281-.202l.249-.764a1.576 1.576 0 0 1 .999-.999l.765-.248a.303.303 0 0 0 0-.57zm1.416 3.355l.612.199l.013.003a.242.242 0 0 1 0 .455l-.613.2a1.262 1.262 0 0 0-.799.798l-.199.612a.241.241 0 0 1-.456 0l-.2-.612a1.261 1.261 0 0 0-.798-.802l-.613-.199a.242.242 0 0 1 0-.455l.613-.2a1.261 1.261 0 0 0 .787-.798l.199-.612a.242.242 0 0 1 .456 0l.199.612a1.26 1.26 0 0 0 .799.799zM8 2.5c0-.173.035-.343.1-.5h-.85a.75.75 0 0 0 0 1.5h1.22a1.31 1.31 0 0 1-.47-1zM4.75 2a.75.75 0 0 1 0 1.5c-.69 0-1.25.56-1.25 1.25a.75.75 0 0 1-1.5 0A2.75 2.75 0 0 1 4.75 2zm8.5 8.5a.75.75 0 0 1 .75.75A2.75 2.75 0 0 1 11.25 14a.75.75 0 0 1 0-1.5c.69 0 1.25-.56 1.25-1.25a.75.75 0 0 1 .75-.75zM6.5 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75zm-1.75-.75a.75.75 0 0 1 0 1.5A2.75 2.75 0 0 1 2 11.25a.75.75 0 0 1 1.5 0c0 .69.56 1.25 1.25 1.25zm-2-3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .414.336.75.75.75z" fill="currentColor"></path></g></svg>',
      className: 'bar-button box',
      title: 'Квадрат',
      interaction: new DrawRegular({
        source: this.vector.getSource(),
        sides: 4,
        canRotate: true
      }),
      active: false,
    })

    const transformButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M4.5 6.25c0-.966.784-1.75 1.75-1.75h1.5a.75.75 0 0 0 0-1.5h-1.5A3.25 3.25 0 0 0 3 6.25v1.5a.75.75 0 0 0 1.5 0v-1.5zM17.75 4.5c.966 0 1.75.784 1.75 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5A3.25 3.25 0 0 0 17.75 3h-1.5a.75.75 0 0 0 0 1.5h1.5zm0 15a1.75 1.75 0 0 0 1.75-1.75v-1.5a.75.75 0 0 1 1.5 0v1.5A3.25 3.25 0 0 1 17.75 21h-1.5a.75.75 0 0 1 0-1.5h1.5zm-11.5 0a1.75 1.75 0 0 1-1.75-1.75v-1.5a.75.75 0 0 0-1.5 0v1.5A3.25 3.25 0 0 0 6.25 21h1.5a.75.75 0 0 0 0-1.5h-1.5zm2-13.5A2.25 2.25 0 0 0 6 8.25v7.5A2.25 2.25 0 0 0 8.25 18h7.5A2.25 2.25 0 0 0 18 15.75v-7.5A2.25 2.25 0 0 0 15.75 6h-7.5z" fill="currentColor"></path></g></svg>',
      className: 'bar-button transform',
      title: 'Манипуляции',
      interaction: new Tranform(),
      active: false,
    })

    const edgeButton = new Toggle({
      html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><defs></defs><path d="M843.5 737.4c-12.4-75.2-79.2-129.1-155.3-125.4S550.9 676 546 752c-153.5-4.8-208-40.7-199.1-113.7c3.3-27.3 19.8-41.9 50.1-49c18.4-4.3 38.8-4.9 57.3-3.2c1.7.2 3.5.3 5.2.5c11.3 2.7 22.8 5 34.3 6.8c34.1 5.6 68.8 8.4 101.8 6.6c92.8-5 156-45.9 159.2-132.7c3.1-84.1-54.7-143.7-147.9-183.6c-29.9-12.8-61.6-22.7-93.3-30.2c-14.3-3.4-26.3-5.7-35.2-7.2c-7.9-75.9-71.5-133.8-147.8-134.4c-76.3-.6-140.9 56.1-150.1 131.9s40 146.3 114.2 163.9c74.2 17.6 149.9-23.3 175.7-95.1c9.4 1.7 18.7 3.6 28 5.8c28.2 6.6 56.4 15.4 82.4 26.6c70.7 30.2 109.3 70.1 107.5 119.9c-1.6 44.6-33.6 65.2-96.2 68.6c-27.5 1.5-57.6-.9-87.3-5.8c-8.3-1.4-15.9-2.8-22.6-4.3c-3.9-.8-6.6-1.5-7.8-1.8l-3.1-.6c-2.2-.3-5.9-.8-10.7-1.3c-25-2.3-52.1-1.5-78.5 4.6c-55.2 12.9-93.9 47.2-101.1 105.8c-15.7 126.2 78.6 184.7 276 188.9c29.1 70.4 106.4 107.9 179.6 87c73.3-20.9 119.3-93.4 106.9-168.6zM329.1 345.2c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3s83.3 37.3 83.3 83.3s-37.3 83.3-83.3 83.3zM695.6 845c-46 0-83.3-37.3-83.3-83.3s37.3-83.3 83.3-83.3s83.3 37.3 83.3 83.3s-37.3 83.3-83.3 83.3z" fill="currentColor"></path></svg>',
      className: 'bar-button edge',
      title: 'Двигать края',
      interaction: new Select(),
      active: false,
    })

    return [
      cursorButton,
      transformButton,
      edgeButton,
      empty,
      lineButton,
      boxButton,
    ]
  }
}



