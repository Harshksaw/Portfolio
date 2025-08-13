"use client";
import { useState, useEffect } from 'react';

interface VisitData {
  ts: string;
  path: string;
  city: string | null;
  country: string | null;
  location_source: 'gps' | 'ip' | 'denied';
  device_type: string;
  browser: string;
  os: string;
}

interface RealTimeStatsProps {
  visits: VisitData[];
}

export function RealTimeStats({ visits }: RealTimeStatsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentVisits, setRecentVisits] = useState<VisitData[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get visits from last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recent = visits.filter(visit => 
      new Date(visit.ts) > fiveMinutesAgo
    ).sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    
    setRecentVisits(recent);
  }, [visits]);

  const stats = {
    lastHour: visits.filter(visit => 
      new Date(visit.ts) > new Date(Date.now() - 60 * 60 * 1000)
    ).length,
    last5Minutes: recentVisits.length,
    lastMinute: visits.filter(visit => 
      new Date(visit.ts) > new Date(Date.now() - 60 * 1000)
    ).length,
    activeCountries: new Set(
      visits.filter(visit => 
        new Date(visit.ts) > new Date(Date.now() - 60 * 60 * 1000)
      ).map(v => v.country).filter(Boolean)
    ).size,
    gpsPercentage: visits.length > 0 
      ? (visits.filter(v => v.location_source === 'gps').length / visits.length) * 100 
      : 0
  };

  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  const ActivityPulse = ({ isActive }: { isActive: boolean }) => (
    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">⚡ Real-time Analytics</h2>
        <p className="text-gray-600">Live visitor activity • Updated: {currentTime.toLocaleTimeString()}</p>
      </div>

      {/* Real-time stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ActivityPulse isActive={stats.lastMinute > 0} />
            <span className="text-2xl">🔴</span>
          </div>
          <div className="text-2xl font-bold">{stats.lastMinute}</div>
          <div className="text-green-100 text-sm">Last minute</div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ActivityPulse isActive={stats.last5Minutes > 0} />
            <span className="text-2xl">⏱️</span>
          </div>
          <div className="text-2xl font-bold">{stats.last5Minutes}</div>
          <div className="text-blue-100 text-sm">Last 5 minutes</div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ActivityPulse isActive={stats.lastHour > 0} />
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-2xl font-bold">{stats.lastHour}</div>
          <div className="text-purple-100 text-sm">Last hour</div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ActivityPulse isActive={stats.activeCountries > 0} />
            <span className="text-2xl">🌍</span>
          </div>
          <div className="text-2xl font-bold">{stats.activeCountries}</div>
          <div className="text-orange-100 text-sm">Active countries</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ActivityPulse isActive={stats.gpsPercentage > 50} />
            <span className="text-2xl">🎯</span>
          </div>
          <div className="text-2xl font-bold">{stats.gpsPercentage.toFixed(0)}%</div>
          <div className="text-indigo-100 text-sm">GPS precision</div>
        </div>
      </div>

      {/* Live activity feed */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            🔴 Live Activity Feed
            <span className="ml-2 text-sm font-normal text-gray-500">
              (Last 5 minutes)
            </span>
          </h3>
        </div>
        
        {recentVisits.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">💤</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Recent Activity</h4>
            <p className="text-gray-500">No visits detected in the last 5 minutes</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {recentVisits.map((visit, index) => (
              <div 
                key={index}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index === 0 ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {visit.device_type === 'mobile' ? '📱' : '💻'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {[visit.city, visit.country].filter(Boolean).join(', ') || 'Unknown Location'}
                        </span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                          visit.location_source === 'gps' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {visit.location_source === 'gps' ? '🎯 GPS' : '🌐 IP'}
                        </span>
                        {index === 0 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                            🔴 LIVE
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {visit.path} • {visit.browser} on {visit.os}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {timeAgo(visit.ts)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Activity Timeline (Last Hour)</h3>
        <div className="space-y-4">
          {Array.from({ length: 12 }, (_, i) => {
            const minutesAgo = i * 5;
            const timeSlot = new Date(Date.now() - minutesAgo * 60 * 1000);
            const nextTimeSlot = new Date(Date.now() - (minutesAgo - 5) * 60 * 1000);
            
            const visitsInSlot = visits.filter(visit => {
              const visitTime = new Date(visit.ts);
              return visitTime >= timeSlot && visitTime < nextTimeSlot;
            }).length;

            const barWidth = visitsInSlot > 0 ? Math.max((visitsInSlot / Math.max(...Array.from({ length: 12 }, (_, j) => {
              const slotStart = new Date(Date.now() - j * 5 * 60 * 1000);
              const slotEnd = new Date(Date.now() - (j - 1) * 5 * 60 * 1000);
              return visits.filter(v => {
                const vTime = new Date(v.ts);
                return vTime >= slotStart && vTime < slotEnd;
              }).length;
            }))) * 100, 5) : 0;

            return (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-16 text-xs text-gray-500 text-right">
                  {timeSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${barWidth}%` }}
                  >
                    {visitsInSlot > 0 && (
                      <span className="text-white text-xs font-medium">
                        {visitsInSlot}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          }).reverse()}
        </div>
      </div>
    </div>
  );
}
