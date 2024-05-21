<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
<script setup lang="ts">
useHead({
  script: [
    {
      type: 'text/javascript',
      src: 'https://api-maps.yandex.ru/2.1/?apikey=e17cc763-4148-4990-9caa-bad8e62383c1&lang=ru_RU',
      tagPosition: 'head',
    },
  ]
})
</script>