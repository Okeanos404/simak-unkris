// Export semua data dari folder data
export * from './mahasiswa';
export * from './matakuliah';
export * from './nilai';
export * from './jadwal';
export * from './informasi';

// Data statistik untuk dashboard
export const statistikFakultas = {
  totalMahasiswa: 1250,
  totalDosen: 85,
  totalProdi: 8,
  totalMataKuliah: 120
};

// Data prodi
export const daftarProdi = [
  "Teknik Elektro",
  "Teknik Sipil", 
  "PWK",
  "Teknik Industri",
  "Informatika",
  "Teknik Mesin",
  "Arsitektur",
  "Sistem Informasi"
];

// Warna untuk setiap prodi (untuk UI)
export const warnaProdi = {
  "Teknik Elektro": "bg-yellow-100 text-yellow-800",
  "Teknik Sipil": "bg-blue-100 text-blue-800",
  "PWK": "bg-green-100 text-green-800",
  "Teknik Industri": "bg-purple-100 text-purple-800",
  "Informatika": "bg-red-100 text-red-800",
  "Teknik Mesin": "bg-indigo-100 text-indigo-800",
  "Arsitektur": "bg-pink-100 text-pink-800",
  "Sistem Informasi": "bg-unkris-blue text-white"
};