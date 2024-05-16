export const transformPresetToColor = (preset) => {
  return preset.replace(/islands#|StretchyIcon/gi, '').toLowerCase()
}