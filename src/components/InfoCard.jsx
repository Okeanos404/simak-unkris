import React from 'react';
import { Calendar, AlertCircle, Bell, Users, FileText, ExternalLink, Clock } from 'lucide-react';

const InfoCard = ({ info }) => {
  const isPenting = info.penting;
  
  const getCategoryIcon = (kategori) => {
    switch(kategori?.toLowerCase()) {
      case 'akademik':
        return <FileText size={16} />;
      case 'acara':
        return <Users size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getCategoryColor = (kategori) => {
    switch(kategori?.toLowerCase()) {
      case 'akademik':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'acara':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-xl transition-all duration-300 ${
      isPenting ? 'border-red-300 shadow-md' : 'border-gray-200 shadow-sm'
    }`}>
      {/* Header dengan status penting */}
      {isPenting && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 flex items-center">
          <AlertCircle size={16} className="text-white mr-2" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Informasi Penting</span>
        </div>
      )}

      <div className="p-5">
        {/* Kategori */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1 border ${getCategoryColor(info.kategori)}`}>
            {getCategoryIcon(info.kategori)}
            <span className="ml-1">{info.kategori}</span>
          </span>
          <span className="text-xs font-medium text-gray-600 flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <Clock size={12} className="mr-1 text-gray-500" />
            {getTimeRemaining(info.tanggal)}
          </span>
        </div>

        {/* Judul */}
        <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
          {info.judul}
        </h3>

        {/* Isi */}
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          {info.isi}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
          <div className="flex items-center text-gray-600">
            <Calendar size={12} className="mr-1 text-gray-500" />
            <span className="font-medium">{formatDate(info.tanggal)}</span>
          </div>
          
          {info.penulis && (
            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">
              {info.penulis}
            </span>
          )}

          {info.lampiran && (
            <a 
              href={info.lampiran} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Detail
              <ExternalLink size={12} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;