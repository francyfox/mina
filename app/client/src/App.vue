<script setup lang="ts">
import MarwaMap from '@/components/MarwaMap.vue';
import { NModalProvider } from 'naive-ui'
</script>

<template>
  <n-modal-provider>
    <div class="marwa">
      <h1 class="marwa-title">
        Marwa map
      </h1>

      <div class="marwa-body">
        <marwa-map />
      </div>
    </div>
  </n-modal-provider>
</template>
