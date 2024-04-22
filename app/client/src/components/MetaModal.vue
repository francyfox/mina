<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<template>
  <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
  >
    <n-flex vertical>
      <n-button>
        Скопировать код
      </n-button>

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