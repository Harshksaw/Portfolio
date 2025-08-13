"use client";
import { useState, useEffect } from 'react';

import { DetailedTable } from './admin/DetailedTable';

import { VisitData, CityData, PageData, AreaData } from '@/types';
import { Charts } from './admin/Charts';
import { LocationInsights } from './admin/LocationInsights';
import { RealTimeStats } from './admin/RealTimeStats';
import { StatsCards } from './admin/StatsCards';

export default function AdminDashboard() {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [areas, setAreas] = useState<AreaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitsRes, citiesRes, pagesRes, areasRes] = await Promise.all([
          fetch('/api/admin/pg/recent'),
          fetch('/api/admin/pg/cities'),
          fetch('/api/admin/pg/pages'),
          fetch('/api/admin/pg/areas')
        ]);

        if (!visitsRes.ok || !citiesRes.ok || !pagesRes.ok || !areasRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [visitsData, citiesData, pagesData, areasData] = await Promise.all([
          visitsRes.json(),
          citiesRes.json(),
          pagesRes.json(),
          areasRes.json()
        ]);

        setVisits(visitsData);
        setCities(citiesData);
        setPages(pagesData);
        setAreas(areasData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'locations', label: 'Locations & Map', icon: '🗺️' },
    { id: 'detailed', label: 'Detailed Data', icon: '📋' },
    { id: 'analytics', label: 'Charts & Analytics', icon: '📈' },
    { id: 'realtime', label: 'Real-time', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📊 Portfolio Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive visitor tracking with GPS precision
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <StatsCards visits={visits} cities={cities} pages={pages} areas={areas} />
            <LocationInsights visits={visits} cities={cities} areas={areas} />
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-8">
            <LocationInsights visits={visits} cities={cities} areas={areas} />
          </div>
        )}

        {activeTab === 'detailed' && (
          <DetailedTable visits={visits} />
        )}

        {activeTab === 'analytics' && (
          <Charts visits={visits} cities={cities} pages={pages} />
        )}

        {activeTab === 'realtime' && (
          <RealTimeStats visits={visits} />
        )}
      </div>
    </div>
  );
}
