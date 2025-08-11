"use client";
import { useState, useEffect } from 'react';

interface VisitData {
  ts: string;
  path: string;
  city: string | null;
  region: string | null;
  country: string | null;
  browser: string;
  os: string;
  device_type: string;
  preferred_locale: string;
}

interface CityData {
  city: string;
  visits: number;
}

interface PageData {
  path: string;
  visits: number;
}

export default function VisitStats() {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitsRes, citiesRes, pagesRes] = await Promise.all([
          fetch('/api/admin/pg/recent'),
          fetch('/api/admin/pg/cities'),
          fetch('/api/admin/pg/pages')
        ]);

        if (!visitsRes.ok || !citiesRes.ok || !pagesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [visitsData, citiesData, pagesData] = await Promise.all([
          visitsRes.json(),
          citiesRes.json(),
          pagesRes.json()
        ]);

        setVisits(visitsData);
        setCities(citiesData);
        setPages(pagesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading visits...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const stats = {
    total: visits.length,
    countries: new Set(visits.map(v => v.country).filter(Boolean)).size,
    mobile: visits.filter(v => v.device_type === 'mobile').length,
    desktop: visits.filter(v => v.device_type === 'desktop').length,
    totalCities: cities.length,
    totalPages: pages.length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Visit Analytics (Today)</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
          <div className="text-blue-600">Total Visits</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">{stats.totalCities}</div>
          <div className="text-green-600">Cities</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-800">{stats.countries}</div>
          <div className="text-purple-600">Countries</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-800">{stats.mobile}</div>
          <div className="text-orange-600">Mobile</div>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-indigo-800">{stats.desktop}</div>
          <div className="text-indigo-600">Desktop</div>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-pink-800">{stats.totalPages}</div>
          <div className="text-pink-600">Pages</div>
        </div>
      </div>

      {/* Cities Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Top Cities</h2>
          </div>
          <div className="p-4">
            {cities.slice(0, 10).map((city, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="font-medium">{city.city}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{city.visits}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Top Pages</h2>
          </div>
          <div className="p-4">
            {pages.slice(0, 10).map((page, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="font-medium font-mono text-sm">{page.path}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{page.visits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visits Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Recent Visits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locale</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.slice(0, 20).map((visit, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(visit.ts).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {visit.path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {[visit.city, visit.region, visit.country].filter(Boolean).join(', ') || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="capitalize">{visit.device_type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.browser} on {visit.os}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visit.preferred_locale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
