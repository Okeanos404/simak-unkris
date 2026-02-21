import React, { useState } from 'react';
import { 
  Award, TrendingUp, Calendar, Download, Filter, 
  ChevronDown, BarChart2, PieChart, BookOpen 
} from 'lucide-react';
import { getNilaiByNim, hitungIPK } from '../data/nilai';

const Nilai = ({ user }) => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' atau 'chart'
  
  // Dapatkan nilai user
  const semuaNilai = getNilaiByNim(user.id);
  
  // Filter berdasarkan semester
  const filteredNilai = selectedSemester === 'all' 
    ? semuaNilai 
    : semuaNilai.filter(n => n.semester === parseInt(selectedSemester));

  // Hitung statistik per semester
  const hitungStatistikSemester = (semester) => {
    const nilaiSemester = semuaNilai.filter(n => n.semester === semester);
    if (nilaiSemester.length === 0) return null;
    
    let totalBobot = 0;
    let totalSKS = 0;
    
    nilaiSemester.forEach(n => {
      totalBobot += n.bobot * n.sks;
      totalSKS += n.sks;
    });
    
    return {
      ips: (totalBobot / totalSKS).toFixed(2),
      totalSKS,
      jumlahMK: nilaiSemester.length
    };
  };

  // Statistik keseluruhan
  const totalSKS = semuaNilai.reduce((sum, n) => sum + n.sks, 0);
  const ipk = hitungIPK(semuaNilai);
  
  // Distribusi nilai
  const distribusiNilai = {
    'A': semuaNilai.filter(n => n.huruf === 'A').length,
    'A-': semuaNilai.filter(n => n.huruf === 'A-').length,
    'B+': semuaNilai.filter(n => n.huruf === 'B+').length,
    'B': semuaNilai.filter(n => n.huruf === 'B').length,
    'B-': semuaNilai.filter(n => n.huruf === 'B-').length,
  };

  const getNilaiColor = (nilai) => {
    if (nilai.startsWith('A')) return 'bg-green-100 text-green-700';
    if (nilai.startsWith('B')) return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getNilaiBobot = (nilai) => {
    const bobot = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7 };
    return bobot[nilai] || 0;
  };

  // Daftar semester unik
  const semesters = [...new Set(semuaNilai.map(n => n.semester))].sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
<div className="mb-6">
  <h1 className="text-2xl font-bold text-gray-800">Nilai Akademik</h1>
  <p className="text-gray-600">{user.nama} - {user.prodi}</p>
  <div className="flex items-center mt-2">
    <Award size={18} className="text-unkris-gold mr-2" />
    <span className="text-lg font-semibold text-unkris-blue">IPK: {user.ipk}</span>
  </div>
</div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-900 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-blue-200">IPK</p>
              <Award size={24} className="text-unkris-gold" />
            </div>
            <p className="text-3xl font-bold mb-1">{ipk}</p>
            <p className="text-xs text-blue-200">Dari total {totalSKS} SKS</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">Total SKS</p>
              <BookOpen size={24} className="text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{totalSKS}</p>
            <p className="text-xs text-gray-400">SKS telah ditempuh</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">Semester Aktif</p>
              <Calendar size={24} className="text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{user.semester}</p>
            <p className="text-xs text-gray-400">Semester {user.semester}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500">Nilai A</p>
              <Award size={24} className="text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{distribusiNilai['A']}</p>
            <p className="text-xs text-gray-400">Mata Kuliah</p>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Filter Semester:</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-unkris-blue"
              >
                <option value="all">Semua Semester</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <BarChart2 size={20} />
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'chart' 
                    ? 'bg-blue-100 text-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <PieChart size={20} />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                <Download size={18} />
                <span className="hidden md:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabel Nilai */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mata Kuliah
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKS
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nilai
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bobot
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tahun Akademik
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredNilai.length > 0 ? (
                    filteredNilai.map((nilai, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {nilai.kode_mk}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nilai.nama_mk}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nilai.sks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getNilaiColor(nilai.huruf)}`}>
                            {nilai.huruf}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nilai.bobot}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nilai.semester}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {nilai.tahun_akademik}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        Tidak ada data nilai
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Tampilan Chart (sederhana dulu)
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Nilai</h3>
            <div className="space-y-3">
              {Object.entries(distribusiNilai).map(([nilai, count]) => (
                <div key={nilai}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Nilai {nilai}</span>
                    <span className="font-semibold">{count} MK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        nilai.startsWith('A') ? 'bg-green-500' : 
                        nilai.startsWith('B') ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(count / semuaNilai.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* IPS per Semester */}
            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">IPS per Semester</h3>
            <div className="space-y-4">
              {semesters.map(sem => {
                const stat = hitungStatistikSemester(sem);
                return stat ? (
                  <div key={sem} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Semester {sem}</span>
                      <span className="text-unkris-blue font-bold">{stat.ips}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.jumlahMK} MK • {stat.totalSKS} SKS
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nilai;