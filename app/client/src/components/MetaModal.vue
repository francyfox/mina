<script setup lang="ts">
import { Icon } from '@vicons/utils';
import { ArrowDownload16Filled, ArrowImport20Filled, Copy16Filled } from '@vicons/fluent'

defineProps<{
  code: string
}>()
</script>

<template>
  <n-card
      style="width: 600px"
      title="Метаданные"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
  >
    <n-flex>
      <n-button type="info">
        <n-space align="center">
          <icon size="18">
            <ArrowImport20Filled />
          </icon>
          Импорт
        </n-space>
      </n-button>

      <n-button type="error">
        <n-space align="center">
          <icon size="18">
            <ArrowDownload16Filled />
          </icon>
          Экспорт
        </n-space>
      </n-button>

      <n-button type="default">
        <n-space align="center">
          <icon size="18">
            <Copy16Filled />
          </icon>
          Скопировать код
        </n-space>
      </n-button>
    </n-flex>
    <n-flex vertical>
      <div style="overflow: auto">
        <n-code :code="code"
                language="json"
                :word-wrap="true"
                show-line-numbers
        />
      </div>
    </n-flex>
  </n-card>
</template>

<style scoped lang="scss">

</style>