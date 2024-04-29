<script setup lang="ts">
import { useStackStore } from '@/store/stack';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps<{}>()

const stackStore = useStackStore();
const { historyStack } = storeToRefs(stackStore);

const data = computed(() => historyStack.value.reverse().slice(0, 3));
const featuresName = (feature) => {
  const name = feature.getProperties().name;
  return !!name ? name : feature.getGeometryName()
}
</script>

<template>
  <div class="history">
    <div class="history-title">
      История
    </div>

    <div class="history-list">
      <n-button v-for="item in data" type="info">
        {{ featuresName(item) }}
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.history {
  width: 200px;
  top: 0.5em;
  right: 0.5em;
  padding: 0.5em;
  position: absolute;
  background: rgba(50, 50, 50, 0.79);
  border-radius: 8px;
  z-index: 10;

  &-title {
    font-size: 1.2em;
    font-weight: 600;
    padding: 0.5em;
    text-align: center;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
}
</style>