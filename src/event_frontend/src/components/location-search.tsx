'use client';

import React, { useState } from 'react';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps {
  onSelectLocation: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectLocation,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}`
      );
      const data: Location[] = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error fetching location:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location: Location) => {
    onSelectLocation({
      address: location.display_name,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
    });
    setQuery(location.display_name);
    setResults([]); // clear suggestion setelah pilih
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Browser tidak mendukung geolokasi.');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const locationData = {
            address: data.display_name || 'Lokasi tidak diketahui',
            lat: latitude,
            lng: longitude,
          };

          onSelectLocation(locationData);
          setQuery(locationData.address);
        } catch (err) {
          console.error('Error reverse geocoding:', err);
        } finally {
          setGettingLocation(false);
        }
      },
      (err) => {
        console.error('Error getting geolocation:', err);
        setGettingLocation(false);
      }
    );
  };

  return (
    <div className="w-full h-full space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Cari lokasi..."
          className="flex-1 px-4 text-black py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleGetCurrentLocation}
          disabled={gettingLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {gettingLocation ? 'Mendapatkan...' : 'Lokasi Saya'}
        </button>
      </div>

      {loading && <p className="text-sm text-gray-800">Mencari...</p>}

      {results.length > 0 && (
        <ul className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto bg-white shadow">
          {results.map((loc, i) => (
            <li
              key={i}
              onClick={() => handleSelect(loc)}
              className="px-4 py-2 cursor-pointer text-gray-800 hover:bg-blue-100"
            >
              {loc.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
