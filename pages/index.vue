<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>Silahkan Log in Terlebih Dahulu!</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const pb = usePocketBaseClient()
// console.log(pb)
const email = ref("")
const password = ref("")
async function handleLogin() {
  const authData = await pb.collection('users').authWithPassword(
    email.value,
    password.value,
  );
  if(authData) {
    const user = usePocketBaseUser()
    console.log(user.user.value)
    const role = user.user.value.role
    console.log(role)
    if(role == 'siswa') navigateTo('/catatan_jurnal')
    else navigateTo('/catatan_jurnal')
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 60px;
}
.login-container {
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 400px;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
h2 {
  font-size: 28px;
  margin-bottom: 20px;
}
.input-group {
  margin-bottom: 20px;
  text-align: left;
}
.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: bold;
}
.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
.btn-login {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}
.btn-login:hover {
  background-color: #0056b3;
}
</style>