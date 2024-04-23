import Bar from 'ol-ext/control/Bar'
import EditBar from 'ol-ext/control/EditBar'
import {
  boxButton, ControlBarButtons,
  cursorButton,
  edgeButton, empty, layerButton,
  lineButton, metaButton, saveButton,
  transformButton
} from '@/module/control-bar/control-bar.buttons.js'
export const controlBar = (vector) => {
  const controlButtons = new ControlBarButtons(vector)
  const actionsButtons = controlButtons.actionsButtons()

  const actions = new Bar({ toggleOne: true, group:true, controls: actionsButtons })
  const settings = new Bar({ toggleOne: true, group:true, controls: settingsButtons })

  const bar = new Bar({ controls: [actions, settings]})

  return bar
}