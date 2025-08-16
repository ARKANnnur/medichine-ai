'use client';
import { useState } from 'react';
import type React from 'react';

export default function VibrantVariant() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  type ResultItem = {
    apotek: string;
    harga: number;
    stok: boolean;
    lokasi: string;
  };

  const [results, setResults] = useState<ResultItem[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    console.log('Cari obat:', query);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResults([
      {
        apotek: 'Farmaku Kemang',
        harga: 4500,
        stok: true,
        lokasi: 'Jl. Kemang Raya No.12',
      },
      {
        apotek: 'Kimia Farma Sudirman',
        harga: 5000,
        stok: true,
        lokasi: 'Jl. Jend. Sudirman No.45',
      },
      {
        apotek: 'Guardian Plaza Indonesia',
        harga: 4200,
        stok: false,
        lokasi: 'Plaza Indonesia, Lt. 1',
      },
      {
        apotek: 'Apotek K24 Senayan',
        harga: 4800,
        stok: true,
        lokasi: 'Jl. Asia Afrika No.8',
      },
    ]);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative">
              {/* Floating medical icons */}
              <div className="absolute -top-8 left-1/4 animate-float">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>

              <div className="absolute -top-4 right-1/4 animate-float animation-delay-1000">
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-3xl shadow-2xl mb-6">
                  <svg
                    className="w-12 h-12 text-white mr-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 47.678 47.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 47.678 47.678 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                  <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                    MediFind
                  </h1>
                </div>

                <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Revolusi Pencarian Obat Digital
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Platform AI terdepan untuk menemukan obat dengan harga
                    terbaik. Hemat waktu, hemat biaya, dapatkan kesehatan
                    optimal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-5xl mx-auto px-4 mb-16 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white border-opacity-50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Pencarian Cerdas
              </h3>
              <p className="text-gray-600">
                Masukkan nama obat atau gejala untuk mendapatkan rekomendasi
                terbaik
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Contoh: Paracetamol, Vitamin C, sakit kepala..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-6 py-5 text-lg border-3 border-blue-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none shadow-lg"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || isSearching}
                  className="px-10 py-5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[160px] shadow-xl"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Mencari...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Cari Sekarang
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Hasil Pencarian
              </h3>
              <p className="text-xl text-gray-600">
                Ditemukan {results.length} apotek dengan stok tersedia
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-white border-opacity-50"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-4 rounded-2xl mr-4 shadow-lg">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-800 mb-2">
                            {item.apotek}
                          </h4>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                item.stok
                                  ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                                  : 'bg-gradient-to-r from-red-400 to-red-600 text-white'
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${
                                  item.stok ? 'bg-green-200' : 'bg-red-200'
                                }`}
                              ></div>
                              {item.stok ? 'Tersedia' : 'Habis'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                          Rp {item.harga.toLocaleString()}
                        </div>
                        <div className="text-gray-500 text-sm">per unit</div>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-6">
                      <svg
                        className="w-5 h-5 mr-3 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-medium">{item.lokasi}</span>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center font-bold shadow-lg transform hover:scale-105">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Hubungi
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center font-bold shadow-lg transform hover:scale-105">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        Navigasi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Section */}
        {results.length === 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Keunggulan MediFind
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Platform kesehatan digital terdepan dengan teknologi AI untuk
                pengalaman terbaik
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  title: 'Super Cepat',
                  description:
                    'Pencarian real-time dengan hasil dalam hitungan detik',
                  gradient: 'from-yellow-400 to-orange-500',
                },
                {
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: 'Terpercaya',
                  description: 'Data akurat dari apotek resmi dan berlisensi',
                  gradient: 'from-green-400 to-green-600',
                },
                {
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                  title: 'Harga Terbaik',
                  description:
                    'Perbandingan harga dari ribuan apotek di Indonesia',
                  gradient: 'from-blue-400 to-purple-600',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 text-center border border-white border-opacity-50"
                >
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
