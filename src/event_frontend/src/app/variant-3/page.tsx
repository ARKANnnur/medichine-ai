'use client';
import { useState } from 'react';
import type React from 'react';

export default function MinimalVariant() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-2xl mr-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.5 2L6.5 7h4v6l5-5h-4V2z" />
                </svg>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
                MediFind
              </h1>
            </div>

            <p className="text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              Temukan obat dengan harga terbaik di apotek terdekat
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>1000+ Apotek</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Real-time Data</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Harga Terbaik</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-gray-400"
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
                placeholder="Cari obat, vitamin, atau suplemen..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isSearching ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mencari...
                </div>
              ) : (
                'Cari'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hasil Pencarian
            </h2>
            <p className="text-gray-600">
              Menampilkan {results.length} apotek dengan stok tersedia
            </p>
          </div>

          <div className="space-y-6">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start mb-6 lg:mb-0">
                      <div className="bg-blue-100 p-3 rounded-xl mr-4 flex-shrink-0">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.apotek}
                        </h3>
                        <div className="flex items-center mb-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              item.stok
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                item.stok ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            ></div>
                            {item.stok ? 'Tersedia' : 'Habis'}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-2"
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
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end">
                      <div className="text-3xl font-bold text-blue-600 mb-4">
                        Rp {item.harga.toLocaleString()}
                      </div>
                      <div className="flex gap-3">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
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
                        <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
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
                          Rute
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      {results.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Memilih MediFind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform terpercaya untuk kebutuhan kesehatan Anda dengan
              teknologi terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Data Terpercaya',
                description:
                  'Informasi real-time dari apotek resmi dan berlisensi di seluruh Indonesia',
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                title: 'Harga Transparan',
                description:
                  'Bandingkan harga dari berbagai apotek untuk mendapatkan penawaran terbaik',
              },
              {
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Lokasi Terdekat',
                description:
                  'Temukan apotek terdekat dengan navigasi yang akurat dan mudah digunakan',
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-xl mr-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.5 2L6.5 7h4v6l5-5h-4V2z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold">MediFind</h4>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Solusi terpercaya untuk kebutuhan obat dan kesehatan Anda.
              Temukan, bandingkan, dan dapatkan dengan mudah.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 MediFind. Semua hak dilindungi undang-undang.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
