import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, BookOpen, Calendar, Award, Info, LogOut, 
  ChevronDown, User, Bell, GraduationCap 
} from 'lucide-react';

// Import logo (sesuaikan path dengan file logo Anda)
import LogoUnkris from '../assets/logo-unkris.png';
import LogoFatek from '../assets/logo-fatek.png';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'KRS', path: '/krs', icon: BookOpen },
    { name: 'Jadwal', path: '/jadwal', icon: Calendar },
    { name: 'Nilai', path: '/nilai', icon: Award },
    { name: 'Informasi', path: '/informasi', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo dan Brand - Kiri */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="flex items-center space-x-1">
                <img 
                  src={LogoUnkris} 
                  alt="UNKRIS" 
                  className="w-9 h-9 rounded-lg" 
                />
                <img 
                  src={LogoFatek} 
                  alt="Fakultas Teknik" 
                  className="w-9 h-9 rounded-lg" 
                />
              </div>
              <div className="hidden md:block">
                <span className="font-bold text-gray-800 text-base">UNKRIS</span>
                <span className="block text-xs text-gray-500">Fakultas Teknik</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Tengah - UBAH WARNA TEKS SAAT AKTIF */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    active
                      ? 'bg-blue-100 text-black shadow-md'
                      : 'bg-white text-black-600 hover:bg-blue-100'  // TIDAK AKTIF: Abu-abu
                  }`}
                >
                  <item.icon size={18} className={active ? 'text-unkris-blue' : 'text-gray-400'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Area - Kanan */}
          <div className="flex items-center space-x-3">
            {/* Notifikasi */}
            <button className="p-2 text-gray-500 hover:text-unkris-blue hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-unkris-blue">
                  <img 
                    src={user?.foto || "https://ui-avatars.com/api/?name=User"} 
                    alt={user?.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-gray-800">{user?.nama}</p>
                  <p className="text-xs text-unkris-blue">IPK: {user?.ipk || '3.85'}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{user?.nama}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{user?.nim}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{user?.prodi}</p>
                    <div className="mt-2 flex items-center bg-blue-50 px-3 py-1.5 rounded-lg">
                      <Award size={14} className="text-unkris-gold mr-2" />
                      <span className="text-sm font-bold text-unkris-blue">IPK: {user?.ipk}</span>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User size={16} className="text-gray-500" />
                    <span>Profil Saya</span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1"
                  >
                    <LogOut size={16} />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium ${
                    active
                      ? 'text-unkris-blue font-bold bg-blue-50'  // AKTIF: Biru tua dengan background biru muda
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} className={active ? 'text-unkris-blue' : 'text-gray-400'} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
            
            {/* User Info Mobile */}
            <div className="pt-4 pb-3 border-t border-gray-200 mt-2">
              <div className="flex items-center px-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-unkris-blue">
                  <img src={user?.foto} alt={user?.nama} className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-bold text-gray-900">{user?.nama}</div>
                  <div className="text-xs text-gray-600">{user?.nim}</div>
                  <div className="text-xs font-semibold text-unkris-blue mt-1">IPK: {user?.ipk}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;