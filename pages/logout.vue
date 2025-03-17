<template>
  <div>
    sedang keluar sistem...
  </div>
</template>

<script setup>
const pb = usePocketBaseClient()

pb.authStore.clear();
navigateTo('/')
</script>