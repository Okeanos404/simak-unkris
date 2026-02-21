# SISTEM INFORMASI AKADEMIK (SIMAK) UNKRIS

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-^6.0-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-^4.0-06B6D4?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Pengembangan%20Frontend%20(Mock%20Data)-brightgreen)

![Preview Aplikasi](src/assets/login-page.png)  


## 📋 Tentang Proyek

**SIMAK UNKRIS** adalah sistem informasi akademik berbasis web yang dirancang untuk memudahkan pengelolaan data akademik di Universitas Krisnadwipayana (UNKRIS), khususnya untuk **Fakultas Teknik**. Proyek ini merupakan **purwarupa frontend** yang dibangun dengan **JavaScript murni (Vanilla JS)** menggunakan Vite sebagai build tool dan Tailwind CSS untuk styling. Seluruh data yang ditampilkan bersumber dari berkas **`mahasiswa.js`** yang berisi data dummy mahasiswa, sehingga tidak memerlukan backend server (seperti PHP/MySQL) atau database riil. Tujuannya adalah untuk memvisualisasikan alur kerja dan antarmuka pengguna khusus untuk **role mahasiswa** sebelum diintegrasikan dengan backend sesungguhnya.

## ✨ Fitur Utama

*   **Autentikasi Mahasiswa**: Login menggunakan NIM yang terdaftar dalam data dummy.
*   **Dashboard Mahasiswa**: Tampilan ringkasan informasi akademik mahasiswa (nama, NIM, prodi, IPK, dll).
*   **Profil Mahasiswa**: Lihat detail lengkap profil mahasiswa.
*   **Jadwal Kuliah (Simulasi)**: Tampilan jadwal perkuliahan berdasarkan data dummy (terkait mahasiswa).
*   **Nilai & KHS (Simulasi)**: Halaman untuk melihat nilai dan Kartu Hasil Studi (KHS) sementara.
*   **KRS (Simulasi)**: Tampilan Kartu Rencana Studi (KRS) untuk semester berjalan.
*   **Data Mahasiswa Lain ( jika diizinkan)**: Mungkin dapat melihat daftar mahasiswa satu prodi (tergantung implementasi).

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun dengan teknologi frontend modern:

*   **Frontend**:
    *   **Bahasa**: HTML5, CSS3, **JavaScript (ES6+)**
    *   **Framework CSS**: [Tailwind CSS](https://tailwindcss.com/) untuk styling yang responsif dan cepat.
    *   **Build Tool**: [Vite](https://vitejs.dev/) untuk pengembangan dengan hot-reload dan bundling produksi.
    *   **Linting**: ESLint untuk menjaga konsistensi kode.
*   **Data & State**:
    *   **Data Dummy**: Semua data disimpan dalam berkas **`src/data/mahasiswa.js`** (objek JavaScript) yang berisi array mahasiswa Fakultas Teknik.
    *   **State Management**: Menggunakan mekanisme state sederhana berbasis JavaScript murni.
*   **Tools**:
    *   **Manajemen Paket**: npm
    *   **Version Control**: Git
    *   **Konfigurasi**: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`

## 🚀 Cara Menjalankan Proyek (Lokal)

Karena proyek ini hanya frontend, Anda tidak perlu menginstal database atau server backend. Cukup ikuti langkah berikut:

### Prasyarat
Pastikan Anda telah menginstal:
*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) (versi 18 atau lebih baru, termasuk npm)

### Langkah Instalasi

1.  **Clone repositori**
    ```bash
    git clone https://github.com/Okeanos404/simak-unkris.git
    ```

2.  **Masuk ke direktori proyek**
    ```bash
    cd simak-unkris
    ```

3.  **Instal dependensi**
    ```bash
    npm install
    ```

4.  **Jalankan server pengembangan**
    ```bash
    npm run dev
    ```
    Setelah perintah ini, Vite akan menampilkan URL lokal (biasanya `http://localhost:5173`). Buka URL tersebut di browser.

5.  **Login (Simulasi Mahasiswa)**
    Aplikasi ini hanya menyediakan akses untuk **role mahasiswa**. Login cukup dengan memasukkan **NIM** yang terdaftar dalam data dummy.  
    **Contoh NIM yang dapat digunakan:**
    *   `20241001` (Riyan Samuel Harahap)
    *   `20241002` (Tiara Vindy)
    *   `20241003` (Rama Hidayat)
    *   `20241004` (Herman Saputro)
    *   `20241005` (Azka Iqbal)

    > **Catatan:** Saat ini tidak ada verifikasi password (atau password sama dengan NIM, tergantung implementasi). Cukup masukkan NIM untuk mengakses dashboard mahasiswa.

## 📸 Tangkapan Layar

Berikut beberapa tampilan dari aplikasi (ganti dengan screenshot asli proyek Anda):

| Dashboard Mahasiswa | Halaman Jadwal |
| :---: | :---: |
| ![Dashboard Mahasiswa](src/assets/dashboard-page.png) | ![Halaman Jadwal](src/assets/jadwal-page.png) |

| Laporan Nilai | Laporan KRS |
| :---: | :---: |
| ![Laporan Nilai](src/assets/nilai-page.png) | ![KRS](src/assets/krs-page.png) |

## 🧪 Tentang Data Dummy

Semua data yang ditampilkan dalam aplikasi ini berasal dari berkas **`src/data/mahasiswa.js`** (atau lokasi sesuai struktur proyek). Berkas ini mengekspor objek JavaScript berisi array untuk entitas `mahasiswa` dengan atribut:
- `id`, `nim`, `nama`, `prodi`, `fakultas`, `angkatan`, `email`, `ipk`, `semester`, `foto`, `telepon`, `alamat`

Jika ingin menyesuaikan data, cukup edit berkas tersebut. Tidak perlu mengubah database atau konfigurasi lainnya.

## 🤝 Kontribusi

Kontribusi sangat terbuka! Anda dapat membantu mengembangkan proyek ini dengan:
- Menambah halaman/fitur baru (misalnya halaman dosen, admin, atau integrasi dengan data dummy lain).
- Memperbaiki UI/UX.
- Menyempurnakan data dummy agar lebih realistis.
- Menambahkan animasi atau interaktivitas.

Langkah-langkah:
1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/FiturKeren`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur keren'`)
4. Push ke branch (`git push origin fitur/FiturKeren`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini didistribusikan di bawah lisensi **MIT**. Silakan lihat file `LICENSE` untuk informasi lebih lanjut.

## 📞 Kontak

*   **Pengembang**: Riyan Samuel Harahap
*   **Email**: riyansmauel6@gmail.com
*   **Link Proyek**: [https://github.com/Okeanos404/simak-unkris](https://github.com/Okeanos404/simak-unkris)

---

**Catatan Penting:** Proyek ini adalah **purwarupa frontend** yang menggunakan data statis dari `mahasiswa.js`. Saat ini hanya mengakomodasi role mahasiswa. Untuk menjadi aplikasi yang fungsional penuh dengan multi-level user, perlu diintegrasikan dengan backend API dan database riil, serta penambahan data untuk dosen dan admin.