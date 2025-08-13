"use client";
import { useMemo } from 'react';

interface VisitData {
  ts: string;
  path: string;
  city: string | null;
  country: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  device_type: string;
  browser: string;
  os: string;
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

interface ChartsProps {
  visits: VisitData[];
  cities: CityData[];
  pages: PageData[];
}

export function Charts({ visits, cities, pages }: ChartsProps) {
  const chartData = useMemo(() => {
    // Time distribution (hourly)
    const hourlyVisits = Array.from({ length: 24 }, (_, hour) => {
      const count = visits.filter(visit => 
        new Date(visit.ts).getHours() === hour
      ).length;
      return { hour, count };
    });

    // Daily distribution (last 7 days)
    const dailyVisits = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      const count = visits.filter(visit => 
        visit.ts.startsWith(dateStr)
      ).length;
      return { 
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), 
        count 
      };
    });

    // Device type distribution
    const deviceTypes = visits.reduce((acc, visit) => {
      acc[visit.device_type] = (acc[visit.device_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Browser distribution
    const browsers = visits.reduce((acc, visit) => {
      acc[visit.browser] = (acc[visit.browser] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Operating system distribution
    const operatingSystems = visits.reduce((acc, visit) => {
      acc[visit.os] = (acc[visit.os] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Location source distribution
    const locationSources = visits.reduce((acc, visit) => {
      acc[visit.location_source] = (acc[visit.location_source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Country distribution
    const countries = visits.reduce((acc, visit) => {
      if (visit.country) {
        acc[visit.country] = (acc[visit.country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      hourlyVisits,
      dailyVisits,
      deviceTypes,
      browsers,
      operatingSystems,
      locationSources,
      countries
    };
  }, [visits]);

  const BarChart = ({ data, title, color, maxItems = 10 }: {
    data: Array<{ label: string; value: number }> | Record<string, number>;
    title: string;
    color: string;
    maxItems?: number;
  }) => {
    const chartData = Array.isArray(data) 
      ? data 
      : Object.entries(data)
          .map(([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, maxItems);

    const maxValue = Math.max(...chartData.map(item => item.value));

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 text-sm text-gray-600 text-right mr-3 truncate">
                {item.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className={`${color} h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <span className="text-white text-xs font-medium">
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title, color }: {
    data: Array<{ label: string; value: number }>;
    title: string;
    color: string;
  }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item.value / maxValue) * 80
    }));

    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${path} ${command} ${point.x} ${point.y}`;
    }, '');

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={20 + i * 20}
                x2="100"
                y2={20 + i * 20}
                stroke="#f3f4f6"
                strokeWidth="0.5"
              />
            ))}
            
            {/* Area under curve */}
            <path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill={color.replace('bg-', '').includes('blue') ? '#3b82f620' : '#10b98120'}
              stroke="none"
            />
            
            {/* Line */}
            <path
              d={pathData}
              stroke={color.replace('bg-', '').includes('blue') ? '#3b82f6' : '#10b981'}
              strokeWidth="2"
              fill="none"
            />
            
            {/* Data points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="2"
                fill={color.replace('bg-', '').includes('blue') ? '#3b82f6' : '#10b981'}
              />
            ))}
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            {data.map((item, index) => (
              <span key={index} className="transform -rotate-45 origin-top-left">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DonutChart = ({ data, title }: {
    data: Record<string, number>;
    title: string;
  }) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    const sortedData = Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6);

    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
    ];

    let currentAngle = 0;
    const segments = sortedData.map(([label, value], index) => {
      const percentage = (value / total) * 100;
      const angle = (value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      const startX = 50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180);
      const startY = 50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180);
      const endX = 50 + 35 * Math.cos((endAngle - 90) * Math.PI / 180);
      const endY = 50 + 35 * Math.sin((endAngle - 90) * Math.PI / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      return {
        label,
        value,
        percentage,
        color: colors[index],
        path: `M 50 50 L ${startX} ${startY} A 35 35 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
      };
    });

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
              {/* Center hole */}
              <circle cx="50" cy="50" r="15" fill="white" />
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="flex-1 truncate">{segment.label}</span>
                <span className="font-medium ml-2">{segment.value}</span>
                <span className="text-gray-500 ml-1">
                  ({segment.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Analytics Charts</h2>
      </div>

      {/* Time-based charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart 
          data={chartData.dailyVisits.map(item => ({ label: item.date, value: item.count }))}
          title="📅 Daily Visits (Last 7 Days)"
          color="bg-blue-500"
        />
        <BarChart 
          data={chartData.hourlyVisits.map(item => ({ 
            label: `${item.hour}:00`, 
            value: item.count 
          }))}
          title="🕐 Hourly Distribution"
          color="bg-green-500"
        />
      </div>

      {/* Distribution charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonutChart 
          data={chartData.deviceTypes}
          title="📱 Device Types"
        />
        <DonutChart 
          data={chartData.locationSources}
          title="📍 Location Sources"
        />
        <DonutChart 
          data={chartData.browsers}
          title="🌐 Browsers"
        />
      </div>

      {/* Bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={chartData.countries}
          title="🌍 Top Countries"
          color="bg-purple-500"
          maxItems={8}
        />
        <BarChart 
          data={chartData.operatingSystems}
          title="💻 Operating Systems"
          color="bg-indigo-500"
          maxItems={8}
        />
      </div>

      {/* Pages and Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={pages.reduce((acc, page) => {
            acc[page.path] = page.visits;
            return acc;
          }, {} as Record<string, number>)}
          title="📄 Top Pages"
          color="bg-pink-500"
          maxItems={10}
        />
        <BarChart 
          data={cities.reduce((acc, city) => {
            acc[city.city] = city.visits;
            return acc;
          }, {} as Record<string, number>)}
          title="🏙️ Top Cities"
          color="bg-cyan-500"
          maxItems={10}
        />
      </div>
    </div>
  );
}
