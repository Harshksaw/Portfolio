"use client";
import { useEffect, useRef, useState } from 'react';
import { VisitData } from '@/types';

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

interface InteractiveMapProps {
  visits: VisitData[];
}

export function InteractiveMap({ visits }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
        address: visit.precise_address,
        district: visit.precise_district,
        visits: []
      };
    }
    acc[key].count++;
    acc[key].visits.push(visit);
    return acc;
  }, {} as Record<string, any>);

  const locations = Object.values(locationCounts);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    // Simple map visualization without Google Maps dependency
    const initSimpleMap = () => {
      if (!mapRef.current) return;

      // Calculate bounds for positioning
      const lats = locations.map(l => l.lat);
      const lngs = locations.map(l => l.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      mapRef.current.innerHTML = `
        <div class="interactive-map-container relative w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 rounded-lg overflow-hidden">
          <!-- Map Background with Grid -->
          <div class="absolute inset-0">
            <svg class="w-full h-full opacity-20">
              ${Array.from({ length: 10 }, (_, i) => `
                <line x1="${(i + 1) * 10}%" y1="0%" x2="${(i + 1) * 10}%" y2="100%" stroke="#cbd5e1" stroke-width="1"/>
              `).join('')}
              ${Array.from({ length: 8 }, (_, i) => `
                <line x1="0%" y1="${(i + 1) * 12.5}%" x2="100%" y2="${(i + 1) * 12.5}%" stroke="#cbd5e1" stroke-width="1"/>
              `).join('')}
            </svg>
          </div>

          <!-- Location Markers -->
          <div class="absolute inset-0 p-4">
            ${locations.map((location, index) => {
              const x = locations.length > 1 
                ? ((location.lng - minLng) / (maxLng - minLng)) * 80 + 10
                : 50;
              const y = locations.length > 1
                ? ((maxLat - location.lat) / (maxLat - minLat)) * 70 + 15
                : 50;
              
              const size = Math.min(Math.max(location.count * 6 + 16, 20), 40);
              const color = location.location_source === 'gps' ? '#10b981' : '#3b82f6';
              
              return `
                <div class="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                     style="left: ${x}%; top: ${y}%;">
                  <div class="relative">
                    <!-- Marker Circle -->
                    <div class="rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs transition-transform group-hover:scale-110"
                         style="width: ${size}px; height: ${size}px; background-color: ${color};">
                      ${location.count}
                    </div>
                    
                    <!-- Accuracy Ring for GPS -->
                    ${location.location_source === 'gps' && location.accuracy ? `
                      <div class="absolute inset-0 rounded-full border-2 border-green-300 opacity-50 animate-pulse"
                           style="width: ${size + 8}px; height: ${size + 8}px; left: -4px; top: -4px;"></div>
                    ` : ''}
                    
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      <div class="font-semibold">${location.city}, ${location.country}</div>
                      <div class="text-gray-300">${location.count} visits • ${location.location_source === 'gps' ? '🎯 GPS' : '🌐 IP'}</div>
                      ${location.accuracy ? `<div class="text-green-300">±${location.accuracy}m accuracy</div>` : ''}
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Map Info Overlay -->
          <div class="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
            <h3 class="font-semibold text-gray-800 mb-1">📍 Location Map</h3>
            <div class="text-xs text-gray-600 space-y-1">
              <div>${locations.length} unique locations</div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>GPS (${locations.filter(l => l.location_source === 'gps').length})</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>IP (${locations.filter(l => l.location_source === 'ip').length})</span>
              </div>
            </div>
          </div>

          <!-- Coordinate Display -->
          ${locations.length > 0 ? `
            <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg">
              <div class="text-xs text-gray-600 font-mono">
                <div>Lat: ${minLat.toFixed(3)} → ${maxLat.toFixed(3)}</div>
                <div>Lng: ${minLng.toFixed(3)} → ${maxLng.toFixed(3)}</div>
              </div>
            </div>
          ` : ''}
        </div>
      `;
      setMapLoaded(true);
    };

    initSimpleMap();
  }, [locations]);

  if (validVisits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Interactive Location Map</h2>
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
            <h2 className="text-2xl font-bold text-gray-900">�️ Interactive Location Map</h2>
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

      {/* Map Container */}
      <div className="relative" style={{ height: '500px' }}>
        <div ref={mapRef} className="w-full h-full">
          {!mapLoaded && (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading interactive map...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location Summary */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{locations.length}</div>
            <div className="text-sm text-gray-600">Unique Locations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {locations.filter(l => l.location_source === 'gps').length}
            </div>
            <div className="text-sm text-gray-600">GPS Tracked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {new Set(locations.map(l => l.country)).size}
            </div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {locations.reduce((sum, l) => sum + l.count, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Visits</div>
          </div>
        </div>
      </div>
    </div>
  );
}
