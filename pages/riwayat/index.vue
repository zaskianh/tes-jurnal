<template>
  <div class="riwayat-container">
    <h2>Riwayat Pengisian Catatan Jurnal PKL</h2>
    <table border="1">
      <thead>
        <tr>
          <th>No</th>
          <th>Hari/Tanggal</th>
          <th>Uraian Kegiatan</th>
          <th>Verifikasi Guru</th>
          <th>Catatan Instruktur</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="riwayat.length < 1">
          <td colspan="5">Belum ada jurnal</td>
        </tr>
        <tr v-for="(entry, index) in riwayat" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.Tanggal }}</td>
          <td>{{ entry.Uraian_Kegiatan }}</td>
          <td>
            <span v-if="role == 'guru'">
              <span v-if="entry.Verifikasi_Guru">Selesai</span>
              <span v-else><button class="btn btn-dark" @click="verifikasi(entry.id)">Verifikasi</button></span>
            </span>
            <span v-else>
              <span v-if="entry.Verifikasi_Guru">Selesai</span>
              <span v-else>Belum diverifikasi</span>
            </span>
          </td>
          <td>{{ entry.Catatan_Instruktur }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button @click="printTable" class="print-button">Print</button>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const pb = usePocketBaseClient();
const user = usePocketBaseUser();
const nama = user.user.value.name;
const role = user.user.value.role;
const current_id_user = user.user.value.id;
const riwayat = ref([]);

async function getRiwayat() {
  pb.autoCancellation(false)
  if(role == 'siswa') {
    const record = await pb.collection('catatan_jurnal').getList(1, 50, {
      expand: 'user_id',
      filter: 'user_id = "' + current_id_user + '"',
    });
    if(record) {
      riwayat.value = record.items;
    }
  } else {
    const record = await pb.collection('catatan_jurnal').getList(1,50, {
      sort: 'Verifikasi_Guru',
    });
    if(record) {
      riwayat.value = record.items;
    }
  }
}

async function verifikasi(id) {
  const data = {
    "Verifikasi_Guru": true,
  };
  await pb.collection('catatan_jurnal').update(id, data);
  getRiwayat();
}

function printTable() {
  window.print();
}

function logout() {
  pb.authStore.clear();
  window.location.reload();
}

onMounted(() => {
  getRiwayat();
  pb.collection('catatan_jurnal').subscribe('*', function (e) {
    if(e.action == 'update') getRiwayat();
  }, {});
})
</script>

<style scoped>
.riwayat-container {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 1000px;
  margin: 250px auto;
}
h2 {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}
th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.print-button, .logout-button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.print-button {
  background-color: #007bff;
  color: white;
}
.print-button:hover {
  background-color: #0056b3;
}
.logout-button {
  background-color: #dc3545;
  color: white;
}
.logout-button:hover {
  background-color: #c82333;
}
</style>
