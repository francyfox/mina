// <option value="islands#blueStretchyIcon" style="background: blue">Голубой</option>
// <option value="islands#redStretchyIcon" style="background: red">Красный</option>
// <option value="islands#greenStretchyIcon" style="background: green">Зеленый</option>
// <option value="islands#pinkStretchyIcon" style="background: pink">Розовый</option>
// <option value="islands#grayStretchyIcon" style="background: grey">Серый</option>
// <option value="islands#brownStretchyIcon" style="background: brown">Коричневый</option>
// <option value="islands#darkOrangeStretchyIcon" style="background: darkorange">Оранжевый</option>
export const transformPresetToColor = (preset) => {
  return preset.replace(/islands#|StretchyIcon/gi, '').toLowerCase()
}