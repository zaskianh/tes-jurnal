<template>
  <header class="header">
    <div class="header-content">
      <img src="~/assets/img/Logo.png" alt="Logo SMKN 4" class="logo" />
      <div class="header-title">
        <h1>JURNAL HARIAN PRAKTEK KERJA LAPANGAN (PKL)</h1>
        <h2>PENGEMBANGAN PERANGKAT LUNAK DAN GIM</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.header-content {
  display: flex;
  align-items: center;
}

.logo {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.header-title {
  text-align: left;
}

h1 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  color: #555;
}
</style>