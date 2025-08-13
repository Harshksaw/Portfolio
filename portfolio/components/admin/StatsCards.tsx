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
}

interface CityData {
  city: string;
  location_source: string;
  visits: number;
}

interface PageData {
  path: string;
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

interface StatsCardsProps {
  visits: VisitData[];
  cities: CityData[];
  pages: PageData[];
  areas: AreaData[];
}

export function StatsCards({ visits, cities, pages, areas }: StatsCardsProps) {
  const stats = {
    total: visits.length,
    countries: new Set(visits.map(v => v.country).filter(Boolean)).size,
    mobile: visits.filter(v => v.device_type === 'mobile').length,
    desktop: visits.filter(v => v.device_type === 'desktop').length,
    tablet: visits.filter(v => v.device_type === 'tablet').length,
    gpsLocations: visits.filter(v => v.location_source === 'gps').length,
    ipLocations: visits.filter(v => v.location_source === 'ip').length,
    deniedLocations: visits.filter(v => v.location_source === 'denied').length,
    totalCities: cities.length,
    totalPages: pages.length,
    totalAreas: areas.length,
    browsers: new Set(visits.map(v => v.browser)).size,
    operatingSystems: new Set(visits.map(v => v.os)).size,
    locales: new Set(visits.map(v => v.preferred_locale)).size,
    avgAccuracy: visits
      .filter(v => v.user_accuracy)
      .reduce((sum, v) => sum + (v.user_accuracy || 0), 0) / 
      visits.filter(v => v.user_accuracy).length || 0
  };

  const cards = [
    {
      title: 'Total Visits',
      value: stats.total.toLocaleString(),
      icon: '👥',
      color: 'blue',
      subtitle: 'All time visits'
    },
    {
      title: 'Unique Cities',
      value: stats.totalCities.toLocaleString(),
      icon: '🏙️',
      color: 'green',
      subtitle: `In ${stats.countries} countries`
    },
    {
      title: 'GPS Locations',
      value: stats.gpsLocations.toLocaleString(),
      icon: '🎯',
      color: 'purple',
      subtitle: `${((stats.gpsLocations / stats.total) * 100).toFixed(1)}% precision`
    },
    {
      title: 'Mobile Visitors',
      value: stats.mobile.toLocaleString(),
      icon: '📱',
      color: 'orange',
      subtitle: `${((stats.mobile / stats.total) * 100).toFixed(1)}% mobile`
    },
    {
      title: 'Desktop Visitors',
      value: stats.desktop.toLocaleString(),
      icon: '💻',
      color: 'indigo',
      subtitle: `${((stats.desktop / stats.total) * 100).toFixed(1)}% desktop`
    },
    {
      title: 'Pages Visited',
      value: stats.totalPages.toLocaleString(),
      icon: '📄',
      color: 'pink',
      subtitle: 'Unique pages'
    },
    {
      title: 'Browser Types',
      value: stats.browsers.toLocaleString(),
      icon: '🌐',
      color: 'yellow',
      subtitle: 'Different browsers'
    },
    {
      title: 'Operating Systems',
      value: stats.operatingSystems.toLocaleString(),
      icon: '💾',
      color: 'red',
      subtitle: 'Different OS'
    },
    {
      title: 'Languages',
      value: stats.locales.toLocaleString(),
      icon: '🌍',
      color: 'teal',
      subtitle: 'Different locales'
    },
    {
      title: 'GPS Accuracy',
      value: stats.avgAccuracy > 0 ? `±${stats.avgAccuracy.toFixed(0)}m` : 'N/A',
      icon: '📍',
      color: 'emerald',
      subtitle: 'Average precision'
    },
    {
      title: 'Precise Areas',
      value: stats.totalAreas.toLocaleString(),
      icon: '🗺️',
      color: 'cyan',
      subtitle: 'GPS-tracked locations'
    },
    {
      title: 'Location Sources',
      value: `${stats.gpsLocations}/${stats.ipLocations}/${stats.deniedLocations}`,
      icon: '📊',
      color: 'gray',
      subtitle: 'GPS/IP/Denied'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    pink: 'bg-pink-50 border-pink-200 text-pink-700',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    teal: 'bg-teal-50 border-teal-200 text-teal-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Analytics Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 hover:shadow-lg transition-all duration-200 ${
              colorClasses[card.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <div className="text-right">
                <div className="text-2xl font-bold">{card.value}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-sm">{card.title}</div>
              <div className="text-xs opacity-75">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
