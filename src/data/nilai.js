import { matakuliahData } from './matakuliah';

// Fungsi untuk generate nilai random (untuk demo)
const generateNilaiRandom = () => {
  const nilaiOptions = ['A', 'A-', 'B+', 'B', 'B-'];
  const bobotNilai = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7
  };
  
  const nilai = nilaiOptions[Math.floor(Math.random() * nilaiOptions.length)];
  return {
    huruf: nilai,
    bobot: bobotNilai[nilai]
  };
};

// Fungsi untuk generate nilai per mahasiswa
const generateNilaiMahasiswa = (nim, prodi) => {
  const mkList = matakuliahData[prodi] || [];
  
  // Ambil 3 mata kuliah pertama untuk semester ini
  const mkSemesterIni = mkList.slice(0, 3);
  
  // Nilai untuk semester 1-3 (lalu)
  const nilaiLalu = [
    // Semester 1
    ...Array(5).fill(null).map((_, i) => ({
      kode_mk: `${prodi === 'Sistem Informasi' ? 'SI' : 
                prodi === 'Informatika' ? 'IF' :
                prodi === 'Arsitektur' ? 'AR' :
                prodi === 'Teknik Elektro' ? 'EL' :
                prodi === 'Teknik Sipil' ? 'TS' :
                prodi === 'PWK' ? 'PW' :
                prodi === 'Teknik Industri' ? 'TI' : 'TM'}1${i+1}01`,
      nama_mk: `Mata Kuliah Semester 1 - ${i+1}`,
      sks: 3,
      ...generateNilaiRandom(),
      semester: 1,
      tahun_akademik: '2023/2024'
    })),
    // Semester 2
    ...Array(5).fill(null).map((_, i) => ({
      kode_mk: `${prodi === 'Sistem Informasi' ? 'SI' : 
                prodi === 'Informatika' ? 'IF' :
                prodi === 'Arsitektur' ? 'AR' :
                prodi === 'Teknik Elektro' ? 'EL' :
                prodi === 'Teknik Sipil' ? 'TS' :
                prodi === 'PWK' ? 'PW' :
                prodi === 'Teknik Industri' ? 'TI' : 'TM'}1${i+1}02`,
      nama_mk: `Mata Kuliah Semester 2 - ${i+1}`,
      sks: 3,
      ...generateNilaiRandom(),
      semester: 2,
      tahun_akademik: '2023/2024'
    })),
    // Semester 3
    ...Array(5).fill(null).map((_, i) => ({
      kode_mk: `${prodi === 'Sistem Informasi' ? 'SI' : 
                prodi === 'Informatika' ? 'IF' :
                prodi === 'Arsitektur' ? 'AR' :
                prodi === 'Teknik Elektro' ? 'EL' :
                prodi === 'Teknik Sipil' ? 'TS' :
                prodi === 'PWK' ? 'PW' :
                prodi === 'Teknik Industri' ? 'TI' : 'TM'}1${i+1}03`,
      nama_mk: `Mata Kuliah Semester 3 - ${i+1}`,
      sks: 3,
      ...generateNilaiRandom(),
      semester: 3,
      tahun_akademik: '2024/2025'
    }))
  ];
  
  // Nilai semester ini (sedang berjalan)
  const nilaiSemesterIni = mkSemesterIni.map(mk => ({
    kode_mk: mk.kode,
    nama_mk: mk.nama,
    sks: mk.sks,
    ...generateNilaiRandom(),
    semester: 4,
    tahun_akademik: '2024/2025'
  }));
  
  return [...nilaiLalu, ...nilaiSemesterIni];
};

// Data nilai untuk setiap mahasiswa
export const nilaiData = {
  "20241001": generateNilaiMahasiswa("20241001", "Sistem Informasi"), // Riyan
  "20241002": generateNilaiMahasiswa("20241002", "Informatika"),      // Budi
  "20241003": generateNilaiMahasiswa("20241003", "Arsitektur"),        // Anisa
  "20241004": generateNilaiMahasiswa("20241004", "Teknik Elektro"),    // Citra
  "20241005": generateNilaiMahasiswa("20241005", "Teknik Sipil")       // Dian
};

// Fungsi untuk mendapatkan nilai mahasiswa
export const getNilaiByNim = (nim) => {
  return nilaiData[nim] || [];
};

// Fungsi untuk menghitung IPK
export const hitungIPK = (nilaiList) => {
  if (!nilaiList || nilaiList.length === 0) return 0;
  
  let totalBobot = 0;
  let totalSKS = 0;
  
  nilaiList.forEach(nilai => {
    totalBobot += nilai.bobot * nilai.sks;
    totalSKS += nilai.sks;
  });
  
  return totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : 0;
};

// Fungsi untuk mendapatkan nilai per semester
export const getNilaiPerSemester = (nim, semester) => {
  const nilaiList = nilaiData[nim] || [];
  if (semester === 'all') return nilaiList;
  return nilaiList.filter(n => n.semester === parseInt(semester));
};