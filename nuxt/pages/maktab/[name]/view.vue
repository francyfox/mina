<script setup>
const route = useRoute()
onMounted(() => {
  window.NUXT = {
    isAdmin: false,
    params: route.params
  }
})
</script>

<template>

</template>

<style scoped>

</style>