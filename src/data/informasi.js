// Data informasi akademik dan acara kampus
export const informasiData = [
  {
    id: 1,
    judul: "Pengisian KRS Semester Genap 2024/2025",
    kategori: "Akademik",
    tanggal: "2025-02-10",
    penting: true,
    isi: "Pengisian KRS akan dibuka pada tanggal 15-20 Februari 2025. Pastikan tidak ada tunggakan UKT.",
    penulis: "BAAK UNKRIS",
    lampiran: null
  },
  {
    id: 2,
    judul: "Workshop UI/UX Design bersama Praktisi Industri",
    kategori: "Acara",
    tanggal: "2025-02-25",
    penting: false,
    isi: "Himpunan Mahasiswa Sistem Informasi mengadakan workshop UI/UX Design. Daftar segera, kuota terbatas!",
    penulis: "HIMASI",
    lampiran: "https://forms.gle/example"
  },
  {
    id: 3,
    judul: "Pengumuman Beasiswa Prestasi 2025",
    kategori: "Akademik",
    tanggal: "2025-02-05",
    penting: true,
    isi: "Pendaftaran beasiswa prestasi dibuka hingga 28 Februari 2025. IPK minimal 3.50.",
    penulis: "Biro Kemahasiswaan",
    lampiran: "https://unkris.ac.id/beasiswa"
  },
  {
    id: 4,
    judul: "Seminar Nasional Teknologi AI untuk Masa Depan",
    kategori: "Acara",
    tanggal: "2025-03-10",
    penting: false,
    isi: "BEM Fakultas Teknik menyelenggarakan seminar nasional dengan pembicara dari industri teknologi.",
    penulis: "BEM FT",
    lampiran: null
  },
  {
    id: 5,
    judul: "Perpanjangan Masa Pembayaran UKT",
    kategori: "Akademik",
    tanggal: "2025-02-01",
    penting: true,
    isi: "Batas pembayaran UKT diperpanjang hingga 15 Februari 2025. Gunakan kesempatan ini untuk melunasi.",
    penulis: "Keuangan UNKRIS",
    lampiran: null
  },
  {
    id: 6,
    judul: "Lomba Karya Tulis Ilmiah Nasional",
    kategori: "Acara",
    tanggal: "2025-03-15",
    penting: false,
    isi: "Ikuti lomba karya tulis ilmiah tingkat nasional. Total hadiah 15 juta rupiah.",
    penulis: "UKM Penalaran",
    lampiran: "https://unkris.ac.id/lkti"
  }
];

// Fungsi untuk mendapatkan informasi terbaru
export const getInformasiTerbaru = (limit = 3) => {
  return [...informasiData]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, limit);
};

// Fungsi untuk mendapatkan informasi berdasarkan kategori
export const getInformasiByKategori = (kategori) => {
  if (kategori === 'all') return informasiData;
  return informasiData.filter(info => 
    info.kategori.toLowerCase() === kategori.toLowerCase()
  );
};

// Fungsi untuk mencari informasi
export const searchInformasi = (query) => {
  const lowerQuery = query.toLowerCase();
  return informasiData.filter(info => 
    info.judul.toLowerCase().includes(lowerQuery) ||
    info.isi.toLowerCase().includes(lowerQuery)
  );
};

// Fungsi untuk mendapatkan informasi penting
export const getInformasiPenting = () => {
  return informasiData.filter(info => info.penting);
};