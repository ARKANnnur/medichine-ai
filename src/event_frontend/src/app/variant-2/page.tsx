'use client';
import { useState } from 'react';
import Image from 'next/image';
import type React from 'react';

export default function GlassmorphismVariant() {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with medical imagery */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
        alt="Medical background"
        fill
        className="object-cover"
        priority
      />

      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 bg-opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-200 bg-opacity-20 rounded-full animate-ping"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-3xl p-12 border border-white border-opacity-20 shadow-2xl">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-full border border-white border-opacity-30">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 47.678 47.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 47.678 47.678 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  MediFind
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-4 font-light">
                Revolusi Pencarian Obat Digital
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto leading-relaxed">
                Platform AI terdepan untuk menemukan obat dengan harga terbaik
                di seluruh Indonesia. Hemat waktu, hemat biaya, dapatkan
                kesehatan optimal.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
          {/* Search Section */}
          <div className="backdrop-blur-lg bg-white bg-opacity-20 rounded-3xl p-10 mb-12 border border-white border-opacity-30 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Pencarian Cerdas
              </h2>
              <p className="text-blue-100 text-lg">
                Teknologi AI untuk hasil pencarian yang akurat dan cepat
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-blue-200"
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
                    placeholder="Masukkan nama obat atau gejala yang Anda alami..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-6 py-5 text-lg backdrop-blur-md bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl focus:bg-opacity-30 focus:border-opacity-50 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-30 transition-all duration-300 outline-none text-white placeholder-blue-200"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!query.trim() || isSearching}
                  className="px-10 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[160px] shadow-xl"
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

          {/* Results Section */}
          {results.length > 0 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Hasil Pencarian
                </h3>
                <p className="text-blue-200 text-lg">
                  Ditemukan {results.length} apotek dengan stok tersedia
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-lg bg-white bg-opacity-15 rounded-2xl border border-white border-opacity-20 shadow-2xl hover:bg-opacity-25 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl mr-4 shadow-lg">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 8.5l-1.5-1.5L12 14.5 4.5 7 3 8.5l9 9 9-9z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2">
                              {item.apotek}
                            </h4>
                            <div className="flex items-center">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                  item.stok
                                    ? 'bg-green-400 bg-opacity-20 text-green-300 border border-green-400 border-opacity-30'
                                    : 'bg-red-400 bg-opacity-20 text-red-300 border border-red-400 border-opacity-30'
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    item.stok ? 'bg-green-400' : 'bg-red-400'
                                  }`}
                                ></div>
                                {item.stok ? 'Tersedia' : 'Habis'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">
                            Rp {item.harga.toLocaleString()}
                          </div>
                          <div className="text-blue-200 text-sm">per unit</div>
                        </div>
                      </div>

                      <div className="flex items-center text-blue-200 mb-6">
                        <svg
                          className="w-5 h-5 mr-3"
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
                        <span>{item.lokasi}</span>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg transform hover:scale-105">
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
                        <button className="flex-1 backdrop-blur-md bg-white bg-opacity-20 border border-white border-opacity-30 text-white py-3 px-6 rounded-xl hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center font-semibold transform hover:scale-105">
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
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: 'AI-Powered',
                  description:
                    'Teknologi kecerdasan buatan untuk pencarian yang akurat',
                  color: 'from-blue-400 to-blue-600',
                },
                {
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                  title: 'Harga Terbaik',
                  description:
                    'Perbandingan harga real-time dari ribuan apotek',
                  color: 'from-green-400 to-green-600',
                },
                {
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  title: 'Super Cepat',
                  description: 'Hasil pencarian dalam hitungan detik',
                  color: 'from-purple-400 to-purple-600',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-lg bg-white bg-opacity-15 rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl hover:bg-opacity-25 transition-all duration-500 transform hover:-translate-y-2 text-center"
                >
                  <div
                    className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
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
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
