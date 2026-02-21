import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, User as UserIcon, Filter, 
  ChevronLeft, ChevronRight, Download, Printer, BookOpen 
} from 'lucide-react';
import { getJadwalByProdi, daftarHari } from '../data/jadwal';

const Jadwal = ({ user }) => {
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedView, setSelectedView] = useState('card'); // 'card' atau 'table'
  const [currentWeek, setCurrentWeek] = useState(1);
  
  const jadwalUser = getJadwalByProdi(user.prodi) || [];
  
  const filteredJadwal = selectedDay === 'all' 
    ? jadwalUser 
    : jadwalUser.filter(j => j.hari === selectedDay);

  const getDayColor = (day) => {
    const colors = {
      'Senin': 'bg-blue-100 text-blue-600 border-blue-200',
      'Selasa': 'bg-green-100 text-green-600 border-green-200',
      'Rabu': 'bg-yellow-100 text-yellow-600 border-yellow-200',
      'Kamis': 'bg-purple-100 text-purple-600 border-purple-200',
      "Jum'at": 'bg-red-100 text-red-600 border-red-200',
      'Sabtu': 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[day] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  // Kelompokkan jadwal berdasarkan hari
  const jadwalPerHari = {};
  filteredJadwal.forEach(jadwal => {
    if (!jadwalPerHari[jadwal.hari]) {
      jadwalPerHari[jadwal.hari] = [];
    }
    jadwalPerHari[jadwal.hari].push(jadwal);
  });

  // Urutkan hari
  const hariUrut = selectedDay === 'all' 
    ? daftarHari.filter(hari => jadwalPerHari[hari])
    : [selectedDay];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-gray-800">Jadwal Kuliah</h1>
    <p className="text-gray-600">Semester Genap 2024/2025 - {user.prodi}</p>
    <p className="text-sm text-unkris-blue mt-1">IPK: {user.ipk}</p>
  </div>
          
           {/* Info Card */}
  <div className="mt-4 md:mt-0 bg-blue-900 rounded-xl px-6 py-3 text-white">
    <div className="flex items-center space-x-4">
      <div>
        <p className="text-xs text-blue-200">Total Mata Kuliah</p>
        <p className="text-xl font-bold text-white">{jadwalUser.length} MK</p>
      </div>
      <div className="w-px h-8 bg-white/20"></div>
      <div>
        <p className="text-xs text-blue-200">SKS</p>
        <p className="text-xl font-bold text-white">
          {jadwalUser.reduce((sum, j) => sum + j.sks, 0)} SKS
        </p>
      </div>
    </div>
  </div>
</div>

        {/* Filter dan Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Hari */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDay('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDay === 'all'
                    ? 'bg-blue-100 text-black shadow-md'
                      : 'bg-white text-black-600 hover:bg-blue-200'
                }`}
              >
                Semua Hari
              </button>
              {daftarHari.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDay === day
                      ? 'bg-blue-100 text-black shadow-md'
                      : 'bg-white text-black-600 hover:bg-blue-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Printer size={18} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigasi Minggu (Jika perlu) */}
        {selectedDay === 'all' && (
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
            <button 
              onClick={() => setCurrentWeek(prev => Math.max(1, prev - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-medium text-gray-700">Minggu ke-{currentWeek}</span>
            <button 
              onClick={() => setCurrentWeek(prev => prev + 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Tampilan Jadwal */}
        {selectedDay === 'all' ? (
          // Tampilan Grid per Hari
          <div className="space-y-6">
            {hariUrut.map(hari => (
              <div key={hari} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Hari */}
                <div className={`px-6 py-4 border-b ${getDayColor(hari)}`}>
                  <h2 className="font-semibold text-lg flex items-center">
                    <Calendar size={20} className="mr-2" />
                    {hari}
                  </h2>
                </div>

                {/* Daftar Jadwal */}
                <div className="divide-y divide-gray-100">
                  {jadwalPerHari[hari].map((jadwal, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg mb-1">
                                {jadwal.nama_mk}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {jadwal.kode_mk} • {jadwal.dosen}
                              </p>
                            </div>
                            <span className="bg-unkris-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {jadwal.sks} SKS
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center text-gray-600">
                              <Clock size={18} className="mr-2 text-unkris-blue" />
                              <div>
                                <p className="text-xs text-gray-400">Waktu</p>
                                <p className="text-sm font-medium">{jadwal.jam}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600">
                              <MapPin size={18} className="mr-2 text-unkris-blue" />
                              <div>
                                <p className="text-xs text-gray-400">Ruang</p>
                                <p className="text-sm font-medium">{jadwal.ruang}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600">
                              <UserIcon size={18} className="mr-2 text-unkris-blue" />
                              <div>
                                <p className="text-xs text-gray-400">Dosen</p>
                                <p className="text-sm font-medium">{jadwal.dosen}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Tampilan Detail per Hari
          <div className="space-y-4">
            {filteredJadwal.length > 0 ? (
              filteredJadwal.map((jadwal, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Header dengan waktu */}
                  <div className={`px-6 py-3 ${getDayColor(jadwal.hari)} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      <span className="font-medium">{jadwal.jam}</span>
                    </div>
                    <span className="text-sm bg-white bg-opacity-30 px-3 py-1 rounded-full">
                      {jadwal.sks} SKS
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-3">
                      {jadwal.nama_mk}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <MapPin size={18} className="mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400">Ruang</p>
                          <p className="text-sm font-medium text-gray-700">{jadwal.ruang}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <UserIcon size={18} className="mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400">Dosen Pengampu</p>
                          <p className="text-sm font-medium text-gray-700">{jadwal.dosen}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Kode MK: {jadwal.kode_mk}</span>
                      <span className="text-unkris-blue font-medium">{jadwal.prodi}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Tidak ada jadwal untuk hari {selectedDay}
                </h3>
                <p className="text-gray-500">Silakan pilih hari lain atau hubungi akademik</p>
              </div>
            )}
          </div>
        )}

        {/* Ringkasan Jadwal */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen size={20} className="mr-2 text-unkris-blue" />
            Ringkasan Jadwal
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-unkris-blue">{jadwalUser.length}</p>
              <p className="text-xs text-gray-600">Total MK</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {jadwalUser.reduce((sum, j) => sum + j.sks, 0)}
              </p>
              <p className="text-xs text-gray-600">Total SKS</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(jadwalUser.map(j => j.hari)).size}
              </p>
              <p className="text-xs text-gray-600">Hari Aktif</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {jadwalUser.filter(j => j.hari === 'Senin').length}
              </p>
              <p className="text-xs text-gray-600">MK di Senin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;