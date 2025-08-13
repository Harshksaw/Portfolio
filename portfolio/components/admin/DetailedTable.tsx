"use client";
import { useState } from 'react';

interface VisitData {
  ts: string;
  path: string;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  district: string | null;
  address: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  user_accuracy: number | null;
  browser: string;
  os: string;
  device_type: string;
  preferred_locale: string;
  user_latitude?: number | null;
  user_longitude?: number | null;
  ip_latitude?: number | null;
  ip_longitude?: number | null;
}

interface DetailedTableProps {
  visits: VisitData[];
}

export function DetailedTable({ visits }: DetailedTableProps) {
  const [sortField, setSortField] = useState<keyof VisitData>('ts');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterLocation, setFilterLocation] = useState<'all' | 'gps' | 'ip' | 'denied'>('all');
  const [filterDevice, setFilterDevice] = useState<'all' | 'mobile' | 'desktop' | 'tablet'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const handleSort = (field: keyof VisitData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredVisits = visits.filter(visit => {
    const matchesLocation = filterLocation === 'all' || visit.location_source === filterLocation;
    const matchesDevice = filterDevice === 'all' || visit.device_type === filterDevice;
    const matchesSearch = searchQuery === '' || 
      visit.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.district?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesLocation && matchesDevice && matchesSearch;
  });

  const sortedVisits = [...filteredVisits].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (sortField === 'ts') {
      const aTime = new Date(aValue as string).getTime();
      const bTime = new Date(bValue as string).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const paginatedVisits = sortedVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedVisits.length / itemsPerPage);

  const getSortIcon = (field: keyof VisitData) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📋 Detailed Visit Data</h2>
            <p className="text-gray-600 mt-1">
              {filteredVisits.length} of {visits.length} visits displayed
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                const csv = [
                  ['Timestamp', 'Path', 'Location', 'Location Type', 'Device', 'Browser', 'OS', 'Locale', 'Coordinates', 'Accuracy'],
                  ...sortedVisits.map(visit => [
                    visit.ts,
                    visit.path,
                    `${visit.city || 'Unknown'}, ${visit.country || 'Unknown'}`,
                    visit.location_source,
                    visit.device_type,
                    visit.browser,
                    visit.os,
                    visit.preferred_locale,
                    visit.location_source === 'gps' 
                      ? `${visit.user_latitude || 'N/A'}, ${visit.user_longitude || 'N/A'}`
                      : `${visit.ip_latitude || 'N/A'}, ${visit.ip_longitude || 'N/A'}`,
                    visit.user_accuracy ? `±${visit.user_accuracy}m` : 'N/A'
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `visit-data-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, path, browser..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="gps">🎯 GPS Only</option>
              <option value="ip">🌐 IP Only</option>
              <option value="denied">❌ Denied</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
            <select
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Devices</option>
              <option value="mobile">📱 Mobile</option>
              <option value="desktop">💻 Desktop</option>
              <option value="tablet">📱 Tablet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Items per page</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                const newItemsPerPage = parseInt(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ts')}
              >
                Timestamp {getSortIcon('ts')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('path')}
              >
                Path {getSortIcon('path')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordinates
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('device_type')}
              >
                Device {getSortIcon('device_type')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('browser')}
              >
                Browser/OS {getSortIcon('browser')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('preferred_locale')}
              >
                Locale {getSortIcon('preferred_locale')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVisits.map((visit, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="space-y-1">
                    <div>{new Date(visit.ts).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(visit.ts).toLocaleTimeString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {visit.path}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {[visit.city, visit.country].filter(Boolean).join(', ') || 'Unknown'}
                      </span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                        visit.location_source === 'gps' 
                          ? 'bg-green-100 text-green-800' 
                          : visit.location_source === 'ip'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {visit.location_source === 'gps' ? '🎯' : visit.location_source === 'ip' ? '🌐' : '❌'}
                      </span>
                    </div>
                    {(visit.address && visit.address !== 'Unknown Address') && (
                      <div className="text-xs text-blue-600">📍 {visit.address}</div>
                    )}
                    {(visit.district && visit.district !== 'Unknown District') && (
                      <div className="text-xs text-green-600">🏘️ {visit.district}</div>
                    )}
                    {(visit.postal_code && 
                      visit.postal_code !== 'Unknown GPS Postal' && 
                      visit.postal_code !== 'Unknown IP Postal') && (
                      <div className="text-xs text-purple-600">📮 {visit.postal_code}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                  <div className="space-y-1">
                    {visit.location_source === 'gps' ? (
                      <>
                        <div>{visit.user_latitude?.toFixed(4) || 'N/A'}, {visit.user_longitude?.toFixed(4) || 'N/A'}</div>
                        {visit.user_accuracy && (
                          <div className="text-xs text-green-600">±{visit.user_accuracy}m</div>
                        )}
                      </>
                    ) : (
                      <div>{visit.ip_latitude?.toFixed(4) || 'N/A'}, {visit.ip_longitude?.toFixed(4) || 'N/A'}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span>
                      {visit.device_type === 'mobile' ? '📱' : 
                       visit.device_type === 'desktop' ? '💻' : '📱'}
                    </span>
                    <span className="capitalize">{visit.device_type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="space-y-1">
                    <div className="font-medium">{visit.browser}</div>
                    <div className="text-xs text-gray-500">{visit.os}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {visit.preferred_locale}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVisits.length)} of {filteredVisits.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded-md text-sm font-medium ${
                    currentPage === pageNum
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
