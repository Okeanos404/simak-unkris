import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, GraduationCap, BookOpen, Code, Building2, Cpu } from 'lucide-react';
import { mahasiswaData } from '../data/mahasiswa';

const Login = ({ onLogin }) => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulasi login (password bebas asal NIM terdaftar)
    setTimeout(() => {
      const user = mahasiswaData.find(m => m.id === nim || m.nim === nim);
      
      if (user) {
        onLogin(user);
        navigate('/dashboard');
      } else {
        setError('NIM tidak ditemukan. Coba: 20241001, 20241002, 20241003, 20241004, atau 20241005');
      }
      setLoading(false);
    }, 1000);
  };

  const demoAccounts = [
    { nim: "20241001", nama: "Riyan Samuel Harahap", prodi: "Sistem Informasi" },
    { nim: "20241002", nama: "Tiara Vindy", prodi: "Informatika" },
    { nim: "20241003", nama: "Rama Hidayat", prodi: "Arsitektur" },
    { nim: "20241004", nama: "Herman Saputro", prodi: "Teknik Elektro" },
    { nim: "20241005", nama: "Azka Iqbal", prodi: "Teknik Sipil" }
  ];

  const fillDemo = (demoNim) => {
    setNim(demoNim);
    setPassword('demo123');
  };

  // Ikon untuk setiap prodi
  const getProdiIcon = (prodi) => {
    if (prodi.includes('Informasi') || prodi.includes('Informatika')) return <Code size={14} />;
    if (prodi.includes('Elektro')) return <Cpu size={14} />;
    if (prodi.includes('Sipil')) return <Building2 size={14} />;
    return <BookOpen size={14} />;
  };

  return (
    <div className="min-h-screen bg-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern - Elemen dekoratif */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-unkris-gold opacity-5 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side - Branding */}
        <div className="flex-1 text-white hidden lg:block">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/25 rounded-2xl mb-6 flex items-center justify-center shadow-xl">
              <GraduationCap size={48} className="text-unkris-blue" />
            </div>
            <h1 className="text-4xl font-bold mb-4">SIMAK UNKRIS</h1>
            <p className="text-xl text-white mb-6">Fakultas Teknik</p>
            <div className="space-y-4 text-white">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-white/45 rounded-full mr-3"></span>
                Sistem Informasi Akademik Terintegrasi
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-white/45 rounded-full mr-3"></span>
                8 Program Studi • 1250+ Mahasiswa
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-white/45 rounded-full mr-3"></span>
                E.S.P.I.I.M.A.SI (Elektro, Sipil, PWK, Industri, Informatika, Mesin, Arsitektur, SI)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
            {/* Header Mobile */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-16 h-16 bg-white/15 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <GraduationCap size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">SIMAK UNKRIS</h2>
              <p className="text-white">Fakultas Teknik</p>
            </div>

            {/* Form Login */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  NIM
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                  <input
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-unkris-gold focus:border-transparent"
                    placeholder="Masukkan NIM"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-unkris-gold focus:border-transparent"
                    placeholder="Masukkan password (bebas)"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-yellow-400 text-unkris-blue font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Masuk</span>
                  </>
                )}
              </button>

              {/* Demo Accounts Toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowDemo(!showDemo)}
                  className="text-sm text-white hover:text-unkris-gold transition-colors"
                >
                  {showDemo ? 'Sembunyikan' : 'Lihat'} Akun Demo
                </button>
              </div>

              {/* Demo Accounts List */}
              {showDemo && (
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs text-white mb-3">Pilih akun demo:</p>
                  <div className="space-y-2">
                    {demoAccounts.map((acc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => fillDemo(acc.nim)}
                        className="w-full text-left p-2 hover:bg-white/10 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-unkris-gold">
                              {acc.nama}
                            </p>
                            <p className="text-xs text-white flex items-center gap-1">
                              {getProdiIcon(acc.prodi)}
                              {acc.prodi}
                            </p>
                          </div>
                          <span className="text-xs text-white">{acc.nim}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white mt-3 text-center">
                    *Password bebas (isi apa saja)
                  </p>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-white">
              &copy; 2025 SIMAK UNKRIS - Dibangun oleh Riyan Samuel Harahap
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;