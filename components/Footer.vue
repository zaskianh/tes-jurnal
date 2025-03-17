<template>
  <div class="app-wrapper">
    <div class="content">
    </div>
    <footer class="footer">
      <p>&copy; 2025 SMKN 4 Tasikmalaya</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  background-color: #f5f5f5;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  margin-top: 120px;
}
</style>
