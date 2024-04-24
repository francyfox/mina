<script setup lang="ts">
const emit = defineEmits(['confirm'])
</script>

<template>
  <n-card
      style="width: 600px"
      title="Удаление данных слоя"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      class="meta-card"
  >
    <div slot="content">
      <p>Вы действительно хотите удалить данные слоя?</p>
    </div>
    <div slot="footer">
      <n-button type="error" @click="emit('confirm')">Удалить</n-button>
    </div>
  </n-card>
</template>

<style scoped lang="scss">

</style>