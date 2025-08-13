interface VisitData {
  ts: string;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  district: string | null;
  address: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  user_accuracy: number | null;
  device_type: string;
}

interface CityData {
  city: string;
  location_source: string;
  visits: number;
}

interface AreaData {
  address: string;
  district: string;
  postal_code: string;
  city: string;
  location_source: string;
  avg_accuracy: number | null;
  visits: number;
}

interface LocationInsightsProps {
  visits: VisitData[];
  cities: CityData[];
  areas: AreaData[];
}

export function LocationInsights({ visits, cities, areas }: LocationInsightsProps) {
  const insights = {
    totalLocations: cities.length,
    gpsLocations: visits.filter(v => v.location_source === 'gps').length,
    ipLocations: visits.filter(v => v.location_source === 'ip').length,
    deniedLocations: visits.filter(v => v.location_source === 'denied').length,
    uniqueCountries: new Set(visits.map(v => v.country).filter(Boolean)).size,
    avgGpsAccuracy: visits
      .filter(v => v.user_accuracy)
      .reduce((sum, v) => sum + (v.user_accuracy || 0), 0) / 
      visits.filter(v => v.user_accuracy).length || 0,
    mostAccurateLocation: visits
      .filter(v => v.user_accuracy)
      .sort((a, b) => (a.user_accuracy || 0) - (b.user_accuracy || 0))[0],
    mostVisitedCity: cities.sort((a, b) => b.visits - a.visits)[0],
    preciseAreas: areas.filter(a => a.location_source === 'gps').length
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">🎯 Location Insights</h2>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🌍</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-800">{insights.uniqueCountries}</div>
            </div>
          </div>
          <div className="text-blue-700 font-medium">Countries</div>
          <div className="text-blue-600 text-sm">Across {insights.totalLocations} cities</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎯</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-800">{insights.gpsLocations}</div>
            </div>
          </div>
          <div className="text-green-700 font-medium">GPS Locations</div>
          <div className="text-green-600 text-sm">
            {((insights.gpsLocations / visits.length) * 100).toFixed(1)}% of visits
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">📍</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-800">
                {insights.avgGpsAccuracy > 0 ? `±${insights.avgGpsAccuracy.toFixed(0)}m` : 'N/A'}
              </div>
            </div>
          </div>
          <div className="text-purple-700 font-medium">Avg GPS Accuracy</div>
          <div className="text-purple-600 text-sm">Location precision</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🗺️</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-800">{insights.preciseAreas}</div>
            </div>
          </div>
          <div className="text-orange-700 font-medium">Precise Areas</div>
          <div className="text-orange-600 text-sm">GPS-tracked locations</div>
        </div>
      </div>

      {/* Location Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Cities */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">🏙️ Top Cities</h3>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {cities.slice(0, 12).map((city, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex-1">
                  <span className="font-medium">{city.city}</span>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium mr-2 ${
                      city.location_source === 'gps' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {city.location_source === 'gps' ? '🎯' : '🌐'}
                    </span>
                    {city.location_source === 'gps' ? 'GPS tracked' : 'IP-based'}
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {city.visits}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Precise Locations */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">📍 Precise Locations</h3>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {areas
              .filter(area => area.location_source === 'gps')
              .slice(0, 10)
              .map((area, index) => (
              <div key={index} className="py-2 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <div className="font-medium text-sm">
                      {area.address !== 'Unknown Address' ? area.address : area.district}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {area.postal_code !== 'Unknown GPS Postal' && area.postal_code !== 'Unknown IP Postal' && (
                        <span>{area.postal_code} • </span>
                      )}
                      {area.city}
                      {area.avg_accuracy && (
                        <span className="ml-2 text-green-600">±{area.avg_accuracy.toFixed(0)}m</span>
                      )}
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {area.visits}
                  </span>
                </div>
              </div>
            ))}
            {areas.filter(area => area.location_source === 'gps').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🎯</div>
                <div>No GPS locations yet</div>
                <div className="text-sm">Visitors need to allow location access</div>
              </div>
            )}
          </div>
        </div>

        {/* Location Stats */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">📊 Location Statistics</h3>
          </div>
          <div className="p-4 space-y-4">
            {/* Location source breakdown */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Location Sources</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">🎯 GPS</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(insights.gpsLocations / visits.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{insights.gpsLocations}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">🌐 IP</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(insights.ipLocations / visits.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{insights.ipLocations}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">❌ Denied</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(insights.deniedLocations / visits.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{insights.deniedLocations}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Most visited city */}
            {insights.mostVisitedCity && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">🥇 Most Visited City</div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900">{insights.mostVisitedCity.city}</div>
                  <div className="text-blue-700 text-sm">{insights.mostVisitedCity.visits} visits</div>
                  <div className="text-blue-600 text-xs">
                    {insights.mostVisitedCity.location_source === 'gps' ? '🎯 GPS tracked' : '🌐 IP-based'}
                  </div>
                </div>
              </div>
            )}

            {/* Most accurate location */}
            {insights.mostAccurateLocation && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">🎯 Most Accurate GPS</div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-900">
                    {insights.mostAccurateLocation.city}, {insights.mostAccurateLocation.country}
                  </div>
                  <div className="text-green-700 text-sm">
                    ±{insights.mostAccurateLocation.user_accuracy}m accuracy
                  </div>
                  {insights.mostAccurateLocation.address && 
                   insights.mostAccurateLocation.address !== 'Unknown Address' && (
                    <div className="text-green-600 text-xs mt-1">
                      📍 {insights.mostAccurateLocation.address}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
