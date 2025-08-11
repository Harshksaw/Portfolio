"use client";
import { useState, useEffect } from 'react';

interface VisitData {
  ts: string;
  path: string;
  referer: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  org: string | null;
  timezone: string | null;
  session_id: string | null;
  device_type: string;
  browser: string;
  os: string;
  is_bot: boolean;
  locale: string;
}

export default function VisitStats() {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('/api/admin/visits');
        if (!response.ok) {
          throw new Error('Failed to fetch visits');
        }
        const data = await response.json();
        setVisits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) return <div className="p-4">Loading visits...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const stats = {
    total: visits.length,
    unique: new Set(visits.map(v => v.session_id)).size,
    countries: new Set(visits.map(v => v.country).filter(Boolean)).size,
    mobile: visits.filter(v => v.device_type === 'mobile').length,
    desktop: visits.filter(v => v.device_type === 'desktop').length,
    bots: visits.filter(v => v.is_bot).length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Visit Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
          <div className="text-blue-600">Total Visits</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-800">{stats.unique}</div>
          <div className="text-green-600">Unique Sessions</div>
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
        <div className="bg-red-100 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-800">{stats.bots}</div>
          <div className="text-red-600">Bots</div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visits.slice(0, 20).map((visit, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(visit.ts).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {[visit.city, visit.region, visit.country].filter(Boolean).join(', ') || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="capitalize">{visit.device_type}</span>
                    {visit.is_bot && <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Bot</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {visit.browser} on {visit.os}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    {visit.referer || 'Direct'}
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
