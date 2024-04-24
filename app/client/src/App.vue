<script setup lang="ts">
import MarwaMap from '@/components/MarwaMap.vue';
import { NModalProvider, NConfigProvider } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-notification-provider placement="bottom-right" :max="3" :scrollable="true">
      <n-modal-provider>
        <div class="marwa">
          <div class="marwa-body">
            <marwa-map />
          </div>
        </div>
      </n-modal-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
