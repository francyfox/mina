<script setup>
const route = useRoute()
onMounted(() => {
  window.NUXT = {
    isAdmin: true,
    params: route.params
  }
})
</script>


<template>

</template>

<style scoped>

</style>