// Data dummy mahasiswa Fakultas Teknik UNKRIS
// Dibuat oleh: Riyan Samuel Harahap - Sistem Informasi

export const mahasiswaData = [
  {
    id: "20241001",
    nim: "20241001",
    nama: "Riyan Samuel Harahap",
    prodi: "Sistem Informasi",
    fakultas: "Teknik",
    angkatan: 2023,
    email: "riyan.samuel@student.unkris.ac.id",
    ipk: 3.92, // IPK tinggi
    semester: 4,
    foto: "https://ui-avatars.com/api/?name=Riyan+Harahap&background=1e3a8a&color=fff&size=128",
    telepon: "081234567890",
    alamat: "Jakarta Timur"
  },
  {
    id: "20241002",
    nim: "20241002",
    nama: "Tiara Vindy",
    prodi: "Informatika",
    fakultas: "Teknik",
    angkatan: 2023,
    email: "budi.santoso@student.unkris.ac.id",
    ipk: 3.67,
    semester: 4,
    foto: "https://ui-avatars.com/api/?name=Budi+Santoso&background=1e3a8a&color=fff&size=128",
    telepon: "081234567891",
    alamat: "Jakarta Selatan"
  },
  {
    id: "20241003",
    nim: "20241003",
    nama: "Rama Hidayat",
    prodi: "Arsitektur",
    fakultas: "Teknik",
    angkatan: 2023,
    email: "anisa.putri@student.unkris.ac.id",
    ipk: 3.78,
    semester: 4,
    foto: "https://ui-avatars.com/api/?name=Anisa+Putri&background=1e3a8a&color=fff&size=128",
    telepon: "081234567892",
    alamat: "Jakarta Barat"
  },
  {
    id: "20241004",
    nim: "20241004",
    nama: "Herman Saputro",
    prodi: "Teknik Elektro",
    fakultas: "Teknik",
    angkatan: 2023,
    email: "citra.dewi@student.unkris.ac.id",
    ipk: 3.90,
    semester: 4,
    foto: "https://ui-avatars.com/api/?name=Citra+Dewi&background=1e3a8a&color=fff&size=128",
    telepon: "081234567893",
    alamat: "Jakarta Utara"
  },
  {
    id: "20241005",
    nim: "20241005",
    nama: "Azka Iqbal",
    prodi: "Teknik Sipil",
    fakultas: "Teknik",
    angkatan: 2023,
    email: "dian.pratama@student.unkris.ac.id",
    ipk: 3.60,
    semester: 4,
    foto: "https://ui-avatars.com/api/?name=Dian+Pratama&background=1e3a8a&color=fff&size=128",
    telepon: "081234567894",
    alamat: "Jakarta Pusat"
  }
];

// Fungsi untuk mendapatkan mahasiswa by ID
export const getMahasiswaById = (id) => {
  return mahasiswaData.find(mhs => mhs.id === id || mhs.nim === id);
};

// Fungsi untuk mendapatkan semua prodi
export const getAllProdi = () => {
  const prodiSet = new Set(mahasiswaData.map(mhs => mhs.prodi));
  return Array.from(prodiSet);
};