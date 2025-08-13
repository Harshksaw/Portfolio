"use client";
import { useEffect, useRef } from 'react';

interface VisitData {
  ts: string;
  city: string | null;
  country: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  user_latitude?: number | null;
  user_longitude?: number | null;
  ip_latitude?: number | null;
  ip_longitude?: number | null;
  user_accuracy?: number | null;
  address?: string | null;
  district?: string | null;
}

interface LocationMapProps {
  visits: VisitData[];
}

export function LocationMap({ visits }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Filter visits with valid coordinates
  const validVisits = visits.filter(visit => {
    const lat = visit.location_source === 'gps' ? visit.user_latitude : visit.ip_latitude;
    const lng = visit.location_source === 'gps' ? visit.user_longitude : visit.ip_longitude;
    return lat && lng && lat !== 0 && lng !== 0;
  });

  const locationCounts = validVisits.reduce((acc, visit) => {
    const lat = visit.location_source === 'gps' ? visit.user_latitude : visit.ip_latitude;
    const lng = visit.location_source === 'gps' ? visit.user_longitude : visit.ip_longitude;
    const key = `${lat},${lng}`;
    
    if (!acc[key]) {
      acc[key] = {
        lat: lat!,
        lng: lng!,
        count: 0,
        location_source: visit.location_source,
        city: visit.city,
        country: visit.country,
        accuracy: visit.user_accuracy,
        address: visit.address,
        district: visit.district
      };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, any>);

  const locations = Object.values(locationCounts);

  // Calculate bounds
  const lats = locations.map(l => l.lat);
  const lngs = locations.map(l => l.lng);
  const minLat = lats.length > 0 ? Math.min(...lats) : 0;
  const maxLat = lats.length > 0 ? Math.max(...lats) : 0;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : 0;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : 0;

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    // Create a simple map using HTML/CSS for demonstration
    // In a real implementation, you'd use Google Maps or Mapbox
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Create a simple coordinate system
    const mapWidth = mapContainer.clientWidth;
    const mapHeight = 400;

    locations.forEach((location, index) => {
      const x = ((location.lng - minLng) / (maxLng - minLng)) * (mapWidth - 40) + 20;
      const y = ((maxLat - location.lat) / (maxLat - minLat)) * (mapHeight - 40) + 20;

      const marker = document.createElement('div');
      marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110`;
      marker.style.left = `${x}px`;
      marker.style.top = `${y}px`;
      
      const size = Math.min(Math.max(location.count * 8 + 12, 16), 32);
      const color = location.location_source === 'gps' ? 'bg-green-500' : 'bg-blue-500';
      
      marker.innerHTML = `
        <div class="${color} rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white font-bold text-xs" 
             style="width: ${size}px; height: ${size}px;" 
             title="${location.city}, ${location.country} (${location.count} visits)">
          ${location.count}
        </div>
      `;

      mapContainer.appendChild(marker);
    });
  }, [locations]);

  if (validVisits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Visitor Locations Map</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Location Data Available</h3>
          <p className="text-gray-500">
            No visits with valid coordinates found. Location data will appear here once visitors allow location access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🗺️ Visitor Locations Map</h2>
            <p className="text-gray-600 mt-1">
              {locations.length} unique locations • {validVisits.length} total visits with coordinates
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>GPS Locations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>IP Locations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simple coordinate-based map */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50" style={{ height: '400px' }}>
        <div ref={mapRef} className="absolute inset-0 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="absolute border-gray-300" style={{
                left: `${(i + 1) * 10}%`,
                top: 0,
                bottom: 0,
                borderLeft: '1px solid'
              }} />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="absolute border-gray-300" style={{
                top: `${(i + 1) * 12.5}%`,
                left: 0,
                right: 0,
                borderTop: '1px solid'
              }} />
            ))}
          </div>
        </div>
        
        {/* Coordinate info */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
          <div className="text-xs text-gray-600">
            <div>Lat: {minLat.toFixed(2)} to {maxLat.toFixed(2)}</div>
            <div>Lng: {minLng.toFixed(2)} to {maxLng.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Location details table */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Location Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coordinates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Accuracy</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations
                .sort((a, b) => b.count - a.count)
                .slice(0, 20)
                .map((location, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {location.city}, {location.country}
                      </div>
                      {location.address && location.address !== 'Unknown Address' && (
                        <div className="text-sm text-blue-600">📍 {location.address}</div>
                      )}
                      {location.district && location.district !== 'Unknown District' && (
                        <div className="text-sm text-green-600">🏘️ {location.district}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      location.location_source === 'gps' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {location.location_source === 'gps' ? '🎯 GPS' : '🌐 IP'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {location.count} visits
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.accuracy ? `±${location.accuracy}m` : 'N/A'}
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
