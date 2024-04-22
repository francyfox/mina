<script setup lang="ts">
import { onMounted, ref, unref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import { customDraw, drawTypes } from '@/module/draw/draw';
import MetaModal from '@/components/MetaModal.vue';
import MapElementModal from '@/components/MapElementModal.vue';

const drawType = ref('Polygon')
const drawRef = ref()
const layer = ref()
const layersOptions = ref()

const showMetaModal = ref(false)
const showMapElementModal = ref(false)

const undo = () => {
  drawRef.value.removeLastPoint();
}

onMounted(() => {
  const { map, vector, source } = initMap()

  customDraw(map, source, drawType.value)

  window.draw.addEventListener('drawend', () => {
    showMapElementModal.value = true
  })

  watch(() => drawType.value, () => {
    map.removeInteraction(window.draw);
    customDraw(map, source, drawType.value)

    window.draw.addEventListener('drawend', () => {
      showMapElementModal.value = true
    })
  })
})
</script>

<template>
  <div class="editor">
    <n-form size="large" class="editor">
      <n-flex>
        <n-flex vertical>
          <n-flex>
            <span style="color: #000">{{ drawType }}</span>
            <n-button @click="undo">
              Назад
            </n-button>

            <n-button @click="undo">
              Вернуть
            </n-button>

            <n-button :type="drawType === drawTypes.none ? 'success' : 'default'"
                      @click="drawType = drawTypes.none"
            >
              Курсор
            </n-button>

            <n-button :type="drawType === drawTypes.polygon ? 'success' : 'default'"
                      @click="drawType = drawTypes.polygon"
            >
              Прямые
            </n-button>

            <n-button :type="drawType === drawTypes.box ? 'success' : 'default'"
                      @click="drawType = drawTypes.box"
            >
              Прямоугольник
            </n-button>

            <n-button>
              Вращение
            </n-button>

            <n-button>
              Перемещение
            </n-button>

            <n-button>
              Перемещение краев
            </n-button>

          </n-flex>
          <n-flex>

          </n-flex>
          <n-flex>
            <n-select v-model:value="layer" :options="layersOptions" size="large" placeholder="Выберите слой" style="width: 150px" />

            <n-button>
              Создать слой
            </n-button>


            <n-button @click="showMetaModal">
              Мета данные
            </n-button>

            <n-modal v-model:show="showMetaModal">
              <meta-modal code="" />
            </n-modal>

            <n-button>
              Сохранить
            </n-button>
          </n-flex>
        </n-flex>

      </n-flex>

      <n-modal v-model:show="showMapElementModal">
        <map-element-modal />
      </n-modal>
    </n-form>
  </div>
  <div id="map" class="map"></div>
</template>

<style lang="scss">
.editor {
  padding: 1em;
  background: #fbf6f2;
}

.position {
  position: relative;
  left: 200px;
  width: 300px;
  display: block;
  padding: 0.5em;
  background: rgba(19, 57, 108, 0.78);
}

.map {
  width: 100%;
  height: 600px
}
</style>