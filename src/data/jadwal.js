import { matakuliahData } from './matakuliah';

// Generate jadwal berdasarkan data mata kuliah
export const generateJadwalFromMK = () => {
  const jadwal = {};
  
  Object.keys(matakuliahData).forEach(prodi => {
    jadwal[prodi] = matakuliahData[prodi].map(mk => ({
      kode_mk: mk.kode,
      nama_mk: mk.nama,
      hari: mk.hari,
      jam: mk.jam,
      ruang: mk.ruang,
      dosen: mk.dosen,
      sks: mk.sks,
      prodi: mk.prodi
    }));
  });
  
  return jadwal;
};

export const jadwalData = generateJadwalFromMK();

// Fungsi untuk mendapatkan jadwal berdasarkan prodi
export const getJadwalByProdi = (prodi) => {
  return jadwalData[prodi] || [];
};

// Fungsi untuk mendapatkan jadwal berdasarkan hari
export const getJadwalByHari = (prodi, hari) => {
  const jadwalProdi = getJadwalByProdi(prodi);
  if (hari === 'all') return jadwalProdi;
  return jadwalProdi.filter(j => j.hari === hari);
};

// Fungsi untuk mendapatkan jadwal hari ini
export const getJadwalHariIni = (prodi) => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
  const today = days[new Date().getDay()];
  return getJadwalByHari(prodi, today);
};

// Daftar hari
export const daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];