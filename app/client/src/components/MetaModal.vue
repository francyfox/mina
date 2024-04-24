<script setup lang="ts">
import { Icon } from '@vicons/utils';
import { ArrowDownload16Filled, ArrowImport20Filled, Copy16Filled } from '@vicons/fluent'
import { useNotification } from 'naive-ui'

defineProps<{
  code: string
}>()

const emit = defineEmits(['import'])


const notification = useNotification()

const exportJSON = (content, format = 'json', contentType = 'application/geo+json') => {
  const date = new Date().toISOString();
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = `marwa_${date}.${format}`;
  a.click();
}

const importJSON = (data) => {
  const file = data.file.file;
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result);
      emit('import', json)
    } catch (e) {
      notification.error({
        title: 'Error',
        message: 'Не удалось распарсить файл. Возможно в файле допущена синтаксическая ошибка',
        duration: 1000
      })
    }

  }
}

const copyJSON = (content) => {
  window.navigator.clipboard.writeText(content);
  notification.success({
    content: 'Скопировано!',
    duration: 1000
  })
}
</script>

<template>
  <n-card
      style="width: 600px"
      title="Метаданные слоя"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      class="meta-card"
  >
    <n-space>
      <n-flex>
        <n-upload type="info"
                  @before-upload="importJSON"
                  :max="1"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <ArrowImport20Filled />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              Импорт метаданных слоя
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              Положите файл .geojson или .json сюда
            </n-p>
          </n-upload-dragger>
        </n-upload>

        <n-button type="error"
                  @click="exportJSON(code)"
        >
          <n-space align="center">
            <icon size="18">
              <ArrowDownload16Filled />
            </icon>
            Экспорт JSON
          </n-space>
        </n-button>

        <n-button type="tertiary"
                  @click="exportJSON(code, 'geojson', 'text/plain')"
        >
          <n-space align="center">
            <icon size="18">
              <ArrowDownload16Filled />
            </icon>
            Экспорт GEOJSON
          </n-space>
        </n-button>

        <n-button type="default"
                  @click="copyJSON(code)"
        >
          <n-space align="center">
            <icon size="18">
              <Copy16Filled />
            </icon>
            Скопировать код
          </n-space>
        </n-button>
      </n-flex>
    </n-space>
    <div style="margin-top: 5px; overflow-y: auto; max-height: 70vh">
      <n-code :code="code"
              language="json"
              :word-wrap="true"
              show-line-numbers
      />
    </div>
  </n-card>
</template>

<style lang="scss">
</style>