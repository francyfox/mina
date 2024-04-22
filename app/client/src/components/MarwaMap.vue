<script setup lang="ts">
import { onMounted, ref, unref, watch } from 'vue';
import { initMap } from '@/module/map/map.init';
import { customDraw } from '@/module/draw/draw';

const drawType = ref('Polygon')
const drawRef = ref()

const undo = () => {
  drawRef.value.removeLastPoint();
}
onMounted(() => {
  const { map, vector, source } = initMap()

  let draw = customDraw(source, drawType.value)


  watch(() => drawType.value, () => {
    console.log(drawType.value)
    map.removeInteraction(draw);

    draw = customDraw(map, source, drawType.value)

  })

  draw = customDraw(source, drawType.value)
  map.addInteraction(draw);
  drawRef.value = draw
})
</script>

<template>
  <div class="editor">
    <n-form size="large" class="editor">
      <n-flex>
        <n-flex vertical>
          <n-flex>
            <n-button @click="undo">
              Прервать
            </n-button>

            <n-button :type="drawType === 'None' ? 'success' : 'default'"
                      @click="drawType = 'None'"
            >
              Курсор
            </n-button>

            <n-button :type="drawType === 'Point' ? 'success' : 'default'"
                      @click="drawType = 'Point'"
            >
              Маркер
            </n-button>

            <n-button :type="drawType === 'Polygon' ? 'success' : 'default'"
                      @click="drawType = 'Polygon'">
              Область
            </n-button>

            <n-button :type="drawType === 'Circle' ? 'success' : 'default'"
                      @click="drawType = 'Circle'">
              Круг
            </n-button>

            <n-button :type="drawType === 'Box' ? 'success' : 'default'"
                      @click="drawType = 'Box'">
              Палатка
            </n-button>

            <n-button>
              Измеритель
            </n-button>

<!--            <n-button @click="showMetaModal = true">-->
<!--              Мета данные-->
<!--            </n-button>-->

<!--            <n-modal v-model:show="showMetaModal">-->
<!--              <n-card-->
<!--                  style="width: 600px"-->
<!--                  title="Modal"-->
<!--                  :bordered="false"-->
<!--                  size="huge"-->
<!--                  role="dialog"-->
<!--                  aria-modal="true"-->
<!--              >-->
<!--                <template #header-extra>-->
<!--                  Oops!-->
<!--                </template>-->

<!--                <n-flex vertical>-->
<!--                  <n-button>-->
<!--                    Скопировать код-->
<!--                  </n-button>-->

<!--                  <div style="overflow: auto">-->
<!--                    <n-code v-if="zones" :code="featuresJSON(zones)"-->
<!--                            language="json"-->
<!--                            :word-wrap="true"-->
<!--                            show-line-numbers-->
<!--                    />-->
<!--                  </div>-->
<!--                </n-flex>-->

<!--                <template #footer>-->
<!--                  Footer-->
<!--                </template>-->
<!--              </n-card>-->
<!--            </n-modal>-->
          </n-flex>
        </n-flex>
<!--        <n-select v-model:value="layers" :options="layersOptions" size="large" placeholder="Выберите слой" />-->
      </n-flex>
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