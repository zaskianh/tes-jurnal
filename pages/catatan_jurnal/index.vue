<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group-container">
      
      <table border="1">
        <thead>
          <tr>
            <th>Hari/Tanggal</th>
            <th>Uraian Kegiatan</th>
            <th>Verifikasi Guru</th>
            <th>Catatan Instruktur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="tableData.Tanggal" type="date" :disabled="role == 'guru'" /></td>
            <td><input v-model="tableData.Uraian_Kegiatan" type="text" :disabled="role == 'guru'" /></td>
            <td>
              <select v-model="tableData.Verifikasi_Guru" :disabled="role == 'siswa'">
                <option value="">Pilih Status</option>
                <option value="✓">✓ (Selesai)</option>
                <option value="✗">✗ (Belum Selesai)</option>
              </select>
            </td>
            <td><input v-model="tableData.Catatan_Instruktur" type="text" :readonly="role == 'siswa'" /></td>
          </tr>
        </tbody>
      </table>
      </div>
      
      <div class="actions">
        <div class="left-actions">
          <NuxtLink to="/riwayat" class="btn back-btn">Riwayat</NuxtLink>
        </div>
        <div class="right-actions">
          <button type="button" class="back-btn" @click="logout">Logout</button>
          <button type="submit" class="submit-btn">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; 
definePageMeta({
  middleware: "auth",
});
const pb = usePocketBaseClient();
const user = usePocketBaseUser();
const router = useRouter();
const role = user.user.value.role;
const tableData = ref(
  {
    Tanggal: "",
    Uraian_Kegiatan: "",
    Verifikasi_Guru: "",
    Catatan_Instruktur: "",
    user_id: user.user.value.id
  },
);
const isGuru = ref(false);
function logout() {
  pb.authStore.clear()
  navigateTo('/')
}
function addRow() {
  if (!isGuru.value) {
    tableData.value.push({
      hariTanggal: "",
      Uraian_Kegiatan: "",
      verifikasiGuru: "",
      catatanInstruktur: "",
    });
  }
}
function removeRow() {
  if (!isGuru.value && tableData.value.length > 1) {
    tableData.value.pop();
  }
}
async function handleSubmit() {
  try {
    await pb.collection("catatan_jurnal").create(tableData.value);
    await pb.collection("riwayat").create(tableData.value);
    console.log("Data berhasil disimpan!");
    router.push("/riwayat");
  } catch (error) {
    console.error(error);
  }
}
function goBack() {
  window.history.back();
}
</script>
<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 50px;
  margin-top: 350px;
}
form {
  width: 100%;
  max-width: 900px;
  background-color: #F3F3F3;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.form-group-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #F8F9FA;
}
th, td {
  padding: 14px;
  text-align: left;
  border: 1px solid #000000;
  font-size: 15px;
}
th {
  background-color: #F3F3F3;
  color: rgb(0, 0, 0);
}
td input, td select {
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background-color: #fff;
}
.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.left-actions, .right-actions {
  display: flex;
  gap: 20px;
}
.add-button, .remove-button {
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
.add-button {
  background-color: #218838;
  color: white;
}
.remove-button {
  background-color: #c82333;
  color: white;
}
.add-button:disabled, .remove-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.back-btn, .submit-btn {
  padding: 12px 18px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
.back-btn {
  background-color: #5a6268;
  color: white;
}
.back-btn:hover {
  background-color: #343a40;
}
.submit-btn {
  background-color: #004085;
  color: white;
}
.submit-btn:hover {
  background-color: #002752;
}
</style>