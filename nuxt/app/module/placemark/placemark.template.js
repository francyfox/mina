export const menuContentTemplate = (isAdmin, placemark) => {
  return `<ul id="menu_list">
               ${ isAdmin ? menuContentEditTemplate : menuContentInfo(placemark)}
           </ul>
               <div style="display: flex; gap: 10px;">\
               ${ isAdmin ? editButtons : '' }
               <button class="button is-small" name="share" type="button" ><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59c-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0c-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606c.648 17.722 3.826 35.527 9.69 52.721c1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96c28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83c-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37c-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569c-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51c27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612c5.864 17.194 9.042 34.999 9.69 52.721c.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" fill="currentColor"></path></svg></button>
               </div>`
}

export const menuContentInfo = (placemark) => {
  return `
   <div class="is-flex is-gap-0.5">
      <li>Номер: ${placemark.properties.get('iconContent')}</li>
      <li class="bg-green">Зеленая: ${placemark.properties.get('green')}</li>
      <li class="bg-red">Красная: ${placemark.properties.get('red')}</li>
   </div>

  <li>Описание: ${placemark.properties.get('balloonContent')}</li>
   <div class="is-flex is-gap-0.5">
     <li>Кв. м: ${placemark.properties.get('square')}</li>
     <li>Кол-во: ${placemark.properties.get('count')}</li>
     <li>Мактаб: ${placemark.properties.get('maqtab')}</li>
   </div>
  `
}

export const editButtons = `<button class="button is-small is-danger" name="remove" type="button" >Удалить</button>
               <button class="button is-small is-success" type="submit" >Сохранить</button>`

export const menuContentEditTemplate = `
                      <div class="columns is-gap-0.5 mb-0">
                        <li class="column is-half">1с_ID: <br /> <input class="input" type="text" name="1с_ID" maxlength="4" /></li>
                      </div>
                      <div class="is-flex is-gap-0.5">
                        <li>Номер: <br /> <input class="input" type="text" name="icon_text" maxlength="5" /></li>
                        <li>Зеленая: <br /> <input class="input is-success bg-green" type="text" name="green_text" maxlength="5" /></li>
                        <li>Красная: <br /> <input class="input is-danger bg-red" type="text" name="red_text" maxlength="5" /></li>
                      </div>
                      <li>Подсказка: <br /> <input class="input" type="text" name="hint_text" maxlength="20" /></li>
                      <li>Описание: <br /> <input class="input" type="text" name="balloon_text" maxlength="50" /></li>
                      <div class="is-flex is-gap-0.5">
                        <li>Кв. м: <br /> <input class="input" type="number" name="square_number" max="999" /></li>
                        <li>Кол-во: <br /> <input class="input" type="number" name="count_number" max="999" /></li>
                        <li>Мактаб: <br /> <input class="input" type="text" name="maqtab_text" maxlength="20" /></li>
                      </div>
                      <li>Цвет: <br />
                      <span class="select">
                        <select name="color">
                        <option value="islands#blueStretchyIcon" style="background: blue">Голубой</option>
                        <option value="islands#redStretchyIcon" style="background: red">Красный</option>
                        <option value="islands#greenStretchyIcon" style="background: green">Зеленый</option>
                        <option value="islands#pinkStretchyIcon" style="background: pink">Розовый</option>
                        <option value="islands#grayStretchyIcon" style="background: grey">Серый</option>
                        <option value="islands#brownStretchyIcon" style="background: brown">Коричневый</option>
                        <option value="islands#darkOrangeStretchyIcon" style="background: darkorange">Оранжевый</option>
                        </select>
                      </span>
                      </li>
                      `
