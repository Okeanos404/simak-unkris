import React, { useState } from 'react';
import { 
  BookOpen, Search, Plus, Check, X, Filter, Calendar, 
  Clock, Info, AlertCircle, Save, Download, Eye 
} from 'lucide-react';
import { getMatakuliahByProdi } from '../data/matakuliah';

const KRS = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMk, setSelectedMk] = useState([]);
  const [filterSemester, setFilterSemester] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Dapatkan mata kuliah untuk prodi user
  const mkTersedia = getMatakuliahByProdi(user.prodi) || [];
  
  // Filter berdasarkan pencarian dan semester
  const filteredMk = mkTersedia.filter(mk => {
    const matchesSearch = 
      mk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mk.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mk.dosen.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSemester = filterSemester === 'all' || mk.semester === parseInt(filterSemester);
    
    return matchesSearch && matchesSemester;
  });

  const totalSKS = selectedMk.reduce((sum, mk) => sum + mk.sks, 0);
  const maxSKS = 24;
  const minSKS = 12;

  const toggleMk = (mk) => {
    if (selectedMk.find(item => item.kode === mk.kode)) {
      // Hapus dari pilihan
      setSelectedMk(selectedMk.filter(item => item.kode !== mk.kode));
    } else {
      // Cek batas SKS
      if (totalSKS + mk.sks <= maxSKS) {
        setSelectedMk([...selectedMk, mk]);
      } else {
        alert(`Melebihi batas maksimal SKS (${maxSKS} SKS)`);
      }
    }
  };

  const isSelected = (kode) => selectedMk.some(mk => mk.kode === kode);

  const handleSave = () => {
    if (totalSKS < minSKS) {
      alert(`Minimal mengambil ${minSKS} SKS`);
      return;
    }
    setShowConfirmation(true);
  };

  const confirmSave = () => {
    setIsSaving(true);
    // Simulasi proses save
    setTimeout(() => {
      setIsSaving(false);
      setShowConfirmation(false);
      alert('KRS berhasil disimpan!');
    }, 2000);
  };

  const getSKSColor = () => {
    if (totalSKS < minSKS) return 'bg-yellow-500';
    if (totalSKS >= maxSKS) return 'bg-red-500';
    return 'bg-green-500';
  };

  // Cek jadwal bentrok
  const checkConflict = (mk1, mk2) => {
    return mk1.hari === mk2.hari && mk1.jam === mk2.jam;
  };

  const hasConflict = (mk) => {
    return selectedMk.some(selected => 
      selected.kode !== mk.kode && checkConflict(selected, mk)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kartu Rencana Studi (KRS)</h1>
          <p className="text-gray-500">Semester Genap 2024/2025 - {user.prodi}</p>
        </div>

        {/* Info Card SKS - TEKS HITAM, BACKGROUND BIRU */}
<div className="bg-blue-900 rounded-2xl shadow-lg p-6 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-white font-medium mb-1">Total SKS yang Dipilih</p>
      <div className="flex items-baseline">
        <p className="text-4xl font-bold text-white">{totalSKS}</p>
        <p className="text-lg text-white ml-2">/ {maxSKS} SKS</p>
      </div>
      <p className="text-xs text-white mt-2">
        Minimal {minSKS} SKS • Maksimal {maxSKS} SKS
      </p>
    </div>
    
    <div className="mt-4 md:mt-0 flex space-x-3">
      <button
        onClick={handleSave}
        disabled={totalSKS < minSKS}
        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
      >
        <Save size={18} className="text-black" />
        <span>Simpan KRS</span>
      </button>
      <button className="bg-white/80 backdrop-blur text-black px-4 py-3 rounded-xl hover:bg-white/90 transition-all flex items-center space-x-2 shadow-md">
        <Eye size={18} className="text-black" />
        <span className="hidden md:inline font-medium">Preview</span>
      </button>
    </div>
  </div>
  
  {/* Progress Bar */}
  <div className="mt-4 w-full bg-white/80 rounded-full h-2.5">
    <div 
      className={`${getSKSColor()} h-2.5 rounded-full transition-all duration-300`}
      style={{ width: `${(totalSKS / maxSKS) * 100}%` }}
    ></div>
  </div>
  
  {/* Info Tambahan - TEKS HITAM */}
  <div className="mt-4 flex flex-wrap gap-4 text-xs text-white">
    <div className="flex items-center bg-white/30 backdrop-blur px-3 py-1.5 rounded-full">
      <Info size={14} className="mr-1 text-white" />
      <span className="font-medium">Mata kuliah prasyarat akan otomatis dicek</span>
    </div>
    <div className="flex items-center bg-white/30 backdrop-blur px-3 py-1.5 rounded-full">
      <Calendar size={14} className="mr-1 text-white" />
      <span className="font-medium">Batas pengisian: 20 Februari 2025</span>
    </div>
  </div>
</div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari mata kuliah berdasarkan nama, kode, atau dosen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-unkris-blue focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterSemester}
                onChange={(e) => setFilterSemester(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-unkris-blue bg-white"
              >
                <option value="all">Semua Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Filter size={18} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daftar MK Tersedia */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-700 flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  Daftar Mata Kuliah Tersedia
                </h2>
                <span className="text-xs text-gray-500">
                  {filteredMk.length} mata kuliah
                </span>
              </div>
              
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {filteredMk.length > 0 ? (
                  filteredMk.map((mk) => {
                    const conflict = hasConflict(mk);
                    return (
                      <div key={mk.kode} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs font-semibold bg-unkris-blue text-white px-2 py-1 rounded">
                                {mk.kode}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {mk.sks} SKS
                              </span>
                              <span className="text-xs bg-blue-100 text-unkris-blue px-2 py-1 rounded">
                                Sem {mk.semester}
                              </span>
                            </div>
                            
                            <h3 className="font-medium text-gray-800 mb-2">{mk.nama}</h3>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {mk.hari}
                              </div>
                              <div className="flex items-center">
                                <Clock size={12} className="mr-1" />
                                {mk.jam}
                              </div>
                              <div className="flex items-center col-span-2">
                                <span className="font-medium">Dosen:</span> {mk.dosen}
                              </div>
                            </div>

                            {conflict && (
                              <div className="mt-2 text-xs text-red-500 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                Bentrok dengan jadwal yang sudah dipilih
                              </div>
                            )}
                          </div>
                          
                          <button
                            onClick={() => toggleMk(mk)}
                            disabled={conflict && !isSelected(mk.kode)}
                            className={`ml-4 p-3 rounded-xl transition-all ${
                              isSelected(mk.kode)
                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                : conflict 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-unkris-blue'
                            }`}
                          >
                            {isSelected(mk.kode) ? <Check size={20} /> : <Plus size={20} />}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <Search size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Tidak ada mata kuliah ditemukan</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ringkasan KRS */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-20">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-700">Ringkasan KRS</h2>
              </div>
              
              <div className="p-4">
                {selectedMk.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                      {selectedMk.map((mk) => (
                        <div key={mk.kode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{mk.nama}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="bg-unkris-blue text-white px-1.5 py-0.5 rounded mr-2">
                                {mk.kode}
                              </span>
                              <span>{mk.sks} SKS</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleMk(mk)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Total dan Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Total SKS</span>
                        <span className="font-bold text-unkris-blue">{totalSKS}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-600">Jumlah MK</span>
                        <span className="font-bold text-gray-800">{selectedMk.length}</span>
                      </div>

                      {/* Peringatan */}
                      {totalSKS < minSKS && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-700 flex items-start">
                          <AlertCircle size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                          <span>Minimal mengambil {minSKS} SKS</span>
                        </div>
                      )}

                      {totalSKS >= maxSKS && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 flex items-start">
                          <AlertCircle size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                          <span>SKS sudah mencapai maksimal</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">Belum ada mata kuliah dipilih</p>
                    <p className="text-xs text-gray-400 mt-1">Pilih mata kuliah dari daftar</p>
                  </div>
                )}
              </div>

              {/* Tombol Aksi Mobile */}
              {selectedMk.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 lg:hidden">
                  <button
                    onClick={handleSave}
                    disabled={totalSKS < minSKS}
                    className="w-full bg-unkris-blue text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
                  >
                    Simpan KRS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Konfirmasi Simpan KRS</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total SKS</span>
                <span className="font-semibold">{totalSKS} SKS</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Jumlah Mata Kuliah</span>
                <span className="font-semibold">{selectedMk.length} MK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Semester</span>
                <span className="font-semibold">Genap 2024/2025</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-700 mb-6">
              <p className="flex items-start">
                <Info size={14} className="mr-2 flex-shrink-0 mt-0.5" />
                Pastikan data yang Anda masukkan sudah benar. KRS yang sudah disimpan tidak dapat diubah tanpa persetujuan dosen wali.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmSave}
                disabled={isSaving}
                className="flex-1 bg-unkris-blue text-white px-4 py-3 rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Ya, Simpan'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KRS;