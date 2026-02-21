import React, { useState } from 'react';
import { 
  Bell, Calendar, AlertCircle, Filter, Search, 
  Megaphone, BookOpen, Users, ChevronRight, Star,
  Download, ExternalLink, Clock 
} from 'lucide-react';
import { informasiData, getInformasiPenting } from '../data/informasi';

const Informasi = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const informasiPenting = getInformasiPenting();

  // Filter informasi
  const filteredInfo = informasiData.filter(info => {
    // Filter kategori utama
    if (filter !== 'all' && info.kategori.toLowerCase() !== filter) {
      return false;
    }
    
    // Filter kategori detail
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'penting' && !info.penting) return false;
    }
    
    // Filter pencarian
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        info.judul.toLowerCase().includes(searchLower) ||
        info.isi.toLowerCase().includes(searchLower) ||
        info.penulis?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Urutkan berdasarkan tanggal (terbaru)
  const sortedInfo = [...filteredInfo].sort((a, b) => 
    new Date(b.tanggal) - new Date(a.tanggal)
  );

  const getCategoryIcon = (kategori) => {
    switch(kategori?.toLowerCase()) {
      case 'akademik':
        return <BookOpen size={20} />;
      case 'acara':
        return <Users size={20} />;
      default:
        return <Megaphone size={20} />;
    }
  };

  const getCategoryColor = (kategori) => {
    switch(kategori?.toLowerCase()) {
      case 'akademik':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'acara':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getTimeRemaining = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Telah lewat';
    if (diffDays === 0) return 'Berakhir hari ini';
    if (diffDays === 1) return 'Besok';
    return `${diffDays} hari lagi`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Megaphone size={24} className="mr-2 text-unkris-blue" />
            Informasi & Pengumuman
          </h1>
          <p className="text-gray-500 mt-1">
            Tetap update dengan informasi terbaru dari Fakultas Teknik UNKRIS
          </p>
        </div>

        {/* Info Penting Banner */}
        {informasiPenting.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white mb-6">
            <div className="flex items-start">
              <AlertCircle size={24} className="mr-4 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-2">Informasi Penting</h2>
                <p className="text-red-100 mb-3">
                  Ada {informasiPenting.length} informasi penting yang perlu Anda perhatikan
                </p>
                <div className="space-y-2">
                  {informasiPenting.slice(0, 2).map(info => (
                    <div key={info.id} className="bg-white/10 rounded-lg p-3">
                      <p className="font-semibold">{info.judul}</p>
                      <p className="text-sm text-red-100 mt-1">{info.isi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari informasi, pengumuman, atau acara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-unkris-blue focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-unkris-blue bg-white"
              >
                <option value="all">Semua Kategori</option>
                <option value="akademik">Akademik</option>
                <option value="acara">Acara</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Filter size={18} />
                <span className="hidden md:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-unkris-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedCategory('penting')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center ${
                selectedCategory === 'penting'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <Star size={12} className="mr-1" />
              Penting
            </button>
            <button
              onClick={() => {
                setFilter('akademik');
                setSelectedCategory('all');
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              Akademik
            </button>
            <button
              onClick={() => {
                setFilter('acara');
                setSelectedCategory('all');
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100"
            >
              Acara
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Menampilkan {sortedInfo.length} informasi
          </p>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>Penting</option>
          </select>
        </div>

        {/* Grid Informasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedInfo.map((info) => (
            <div 
              key={info.id} 
              className={`bg-white rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                info.penting ? 'border-red-200 shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              {/* Header dengan status penting */}
              {info.penting && (
                <div className="bg-red-500 px-4 py-1.5 flex items-center">
                  <AlertCircle size={14} className="text-white mr-1" />
                  <span className="text-xs font-semibold text-white">Informasi Penting</span>
                </div>
              )}

              {/* Kategori */}
              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 border ${getCategoryColor(info.kategori)}`}>
                    {getCategoryIcon(info.kategori)}
                    <span className="ml-1">{info.kategori}</span>
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {getTimeRemaining(info.tanggal)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                  {info.judul}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {info.isi}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    {formatDate(info.tanggal)}
                  </div>
                  
                  {info.penulis && (
                    <span className="text-gray-400">
                      {info.penulis}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <button className="text-xs text-unkris-blue hover:underline flex items-center">
                    Baca selengkapnya
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                  
                  {info.lampiran && (
                    <a 
                      href={info.lampiran} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-unkris-blue transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedInfo.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <Bell size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Tidak ada informasi ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau filter Anda
            </p>
          </div>
        )}

        {/* Pagination */}
        {sortedInfo.length > 0 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-unkris-blue text-black flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">5</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Informasi;