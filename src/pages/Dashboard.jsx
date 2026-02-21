import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Calendar, Award, TrendingUp, Clock, Bell, 
  BookMarked, ChevronRight, GraduationCap, FileText 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import QuickMenuCard from '../components/QuickMenuCard';
import { getInformasiTerbaru } from '../data/informasi';
import { getJadwalHariIni } from '../data/jadwal';
import { getNilaiByNim, hitungIPK } from '../data/nilai';

const Dashboard = ({ user }) => {
  // Data untuk user yang login
  const jadwalHariIni = getJadwalHariIni(user.prodi);
  const nilaiUser = getNilaiByNim(user.id);
  const ipk = hitungIPK(nilaiUser);
  const infoTerbaru = getInformasiTerbaru(3);

  // Statistik untuk dashboard
  const stats = [
    {
      title: 'IPK',
      value: ipk,
      icon: TrendingUp,
      color: 'blue',
      subtitle: `Semester ${user.semester}`,
      trend: 'up',
      trendValue: '+0.15 dari semester lalu'
    },
    {
      title: 'SKS Tempuh',
      value: nilaiUser.reduce((sum, n) => sum + n.sks, 0),
      icon: BookOpen,
      color: 'green',
      subtitle: 'Dari 144 SKS',
      trend: 'up',
      trendValue: '24 SKS semester ini'
    },
    {
      title: 'Mata Kuliah',
      value: jadwalHariIni.length,
      icon: Calendar,
      color: 'yellow',
      subtitle: 'Hari ini',
      trend: null
    },
    {
      title: 'Peringkat',
      value: '5',
      icon: Award,
      color: 'purple',
      subtitle: 'Dari 45 mahasiswa',
      trend: 'up',
      trendValue: 'Naik 2 peringkat'
    }
  ];

  const quickMenus = [
    {
      title: 'KRS Online',
      description: 'Isi dan cetak KRS',
      icon: BookMarked,
      to: '/krs',
      color: 'blue'
    },
    {
      title: 'Jadwal Kuliah',
      description: 'Lihat jadwal perkuliahan',
      icon: Calendar,
      to: '/jadwal',
      color: 'green'
    },
    {
      title: 'Nilai Akademik',
      description: 'Lihat nilai dan transkrip',
      icon: Award,
      to: '/nilai',
      color: 'purple'
    },
    {
      title: 'Informasi',
      description: 'Pengumuman dan acara',
      icon: Bell,
      to: '/informasi',
      color: 'yellow'
    }
  ];

  const getDayColor = (hari) => {
    const colors = {
      'Senin': 'bg-blue-100 text-blue-800 border-blue-200',
      'Selasa': 'bg-green-100 text-green-800 border-green-200',
      'Rabu': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Kamis': 'bg-purple-100 text-purple-800 border-purple-200',
      "Jum'at": 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[hari] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header dengan gradient - BACKGROUND TETAP BIRU, TEKS HITAM */}
      <div className="bg-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Selamat datang, {user.nama}!
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <GraduationCap size={18} className="text-white" />
                <span className="text-white font-medium">{user.nim}</span>
                <span className="text-white">•</span>
                <span className="text-white font-medium">{user.prodi}</span>
                <span className="text-white">•</span>
                <span className="text-white font-medium">Semester {user.semester}</span>
              </div>
              <div className="mt-3 flex items-center bg-white/30 backdrop-blur px-4 py-2 rounded-lg w-fit border border-gray-300 shadow-sm">
                <Award size={18} className="text-yellow-300 mr-2" />
                <span className="text-white font-bold">IPK: {user.ipk}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 bg-white/30 backdrop-blur rounded-xl px-6 py-3 border border-gray-300 shadow-sm">
              <p className="text-sm text-white/80 font-medium">Tahun Akademik</p>
              <p className="text-xl font-bold text-white">2024/2025 • Genap</p>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama - SEMUA TEKS HITAM PEKAT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Menu */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Menu Cepat</h2>
            <span className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
              Akses fitur utama
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickMenus.map((menu, index) => (
              <QuickMenuCard key={index} {...menu} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jadwal Hari Ini */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Calendar size={20} className="mr-2 text-unkris-blue" />
                  Jadwal Kuliah Hari Ini
                </h2>
                <Link to="/jadwal" className="text-sm font-semibold text-unkris-blue hover:text-blue-800 flex items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                  Lihat Semua
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              {jadwalHariIni.length > 0 ? (
                <div className="space-y-3">
                  {jadwalHariIni.map((mk, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                      <div className={`p-3 rounded-xl mr-4 border ${getDayColor(mk.hari)}`}>
                        <Clock size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">{mk.nama_mk}</h3>
                            <p className="text-sm text-gray-700 mt-1">
                              {mk.kode_mk} • {mk.dosen}
                            </p>
                          </div>
                          <span className="text-xs font-bold bg-unkris-blue text-white px-2.5 py-1 rounded-full shadow-sm">
                            {mk.sks} SKS
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock size={14} className="mr-1 text-gray-600" />
                          <span className="mr-3 font-medium text-gray-800">{mk.jam}</span>
                          <span className="text-gray-600">• {mk.ruang}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-800 font-semibold">Tidak ada jadwal hari ini</p>
                  <p className="text-sm text-gray-600 mt-1">Istirahat dulu, yuk!</p>
                </div>
              )}
            </div>
          </div>

          {/* Informasi Terbaru */}
          <div>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Bell size={20} className="mr-2 text-unkris-blue" />
                  Informasi Terbaru
                </h2>
                <Link to="/informasi" className="text-sm font-semibold text-unkris-blue hover:text-blue-800 flex items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                  Lihat Semua
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {infoTerbaru.length > 0 ? (
                  infoTerbaru.map((info) => (
                    <InfoCard key={info.id} info={info} />
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <Bell size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-700">Tidak ada informasi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Akademik */}
        <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
            <TrendingUp size={20} className="mr-2 text-unkris-blue" />
            Progress Akademik
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-800">Progress Studi</span>
                <span className="font-bold text-unkris-blue bg-blue-50 px-2 py-0.5 rounded-full">
                  {Math.round((nilaiUser.reduce((sum, n) => sum + n.sks, 0) / 144) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-900 h-4 rounded-full shadow-inner"
                  style={{ width: `${(nilaiUser.reduce((sum, n) => sum + n.sks, 0) / 144) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-medium text-gray-800">
                  {nilaiUser.reduce((sum, n) => sum + n.sks, 0)} SKS
                </p>
                <p className="text-sm font-medium text-gray-800">
                  144 SKS
                </p>
              </div>
            </div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <FileText size={28} className="mx-auto text-unkris-blue mb-2" />
                <p className="text-2xl font-bold text-unkris-blue">
                  {nilaiUser.filter(n => n.semester === 4).length}
                </p>
                <p className="text-xs font-semibold text-gray-800">MK Semester Ini</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <Award size={28} className="mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {nilaiUser.filter(n => n.huruf === 'A').length}
                </p>
                <p className="text-xs font-semibold text-gray-800">Nilai A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;