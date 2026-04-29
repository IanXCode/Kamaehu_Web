'use client';

/**
 * Admin Dashboard Client Component
 *
 * Tab-based admin panel with:
 * - Location Analytics: User map for gym placement
 * - Exercises: Manage all exercises
 * - Barcode Products: Manage community barcode submissions
 */

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import ExerciseManager from './ExerciseManager';
import BarcodeManager from './BarcodeManager';
import ReportsManager, { PostReport, UserReport } from './ReportsManager';
import type { User } from '@supabase/supabase-js';

// Dynamically import the map component to avoid SSR issues with Leaflet
const UserMap = dynamic(() => import('./UserMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

// Types
interface UserLocation {
  id: string;
  username: string;
  displayName: string | null;
  latitude: number;
  longitude: number;
  city: string | null;
  region: string | null;
  country: string | null;
  capturedAt: string | null;
  isPremium: boolean;
  createdAt: string;
}

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  instructions: string | null;
  type: string;
  equipment: string;
  is_system: boolean;
  is_public: boolean;
  created_by: string | null;
  creator: { id: string; username: string; display_name: string | null } | null;
  thumbnail_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommunityBarcode {
  id: string;
  barcode: string;
  barcode_format: string;
  name: string;
  brand: string | null;
  serving_size: number;
  serving_unit: string;
  servings_per_container: number | null;
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number | null;
  sugar_g: number | null;
  sodium_mg: number | null;
  submitted_by: string | null;
  submitter: { id: string; username: string; display_name: string | null } | null;
  photo_url: string | null;
  vote_count: number;
  is_verified: boolean;
  verification_threshold: number;
  created_at: string;
  updated_at: string;
}

interface AdminDashboardProps {
  user: User;
  profile: Profile;
  locations: UserLocation[];
  totalUsers: number;
  usersWithLocation: number;
  premiumUsers: number;
  exercises: Exercise[];
  exerciseStats: {
    total: number;
    official: number;
    userCreated: number;
  };
  barcodes: CommunityBarcode[];
  barcodeStats: {
    total: number;
    verified: number;
    pending: number;
  };
  postReports: PostReport[];
  userReports: UserReport[];
  reportStats: {
    totalPostReports: number;
    pendingPostReports: number;
    totalUserReports: number;
    pendingUserReports: number;
  };
}

type Tab = 'locations' | 'exercises' | 'barcodes' | 'reports';

export default function AdminDashboard({
  user,
  profile,
  locations,
  totalUsers,
  usersWithLocation,
  premiumUsers,
  exercises,
  exerciseStats,
  barcodes,
  barcodeStats,
  postReports,
  userReports,
  reportStats,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('locations');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [premiumFilter, setPremiumFilter] = useState<'all' | 'premium' | 'free'>('all');

  // Calculate country and region statistics
  const countryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    locations.forEach((loc) => {
      const country = loc.country || 'Unknown';
      stats[country] = (stats[country] || 0) + 1;
    });
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => ({ country, count }));
  }, [locations]);

  const regionStats = useMemo(() => {
    const stats: Record<string, number> = {};
    locations
      .filter((loc) => selectedCountry === 'all' || loc.country === selectedCountry)
      .forEach((loc) => {
        const region = loc.region || 'Unknown';
        stats[region] = (stats[region] || 0) + 1;
      });
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .map(([region, count]) => ({ region, count }));
  }, [locations, selectedCountry]);

  const cityStats = useMemo(() => {
    const stats: Record<string, { count: number; lat: number; lng: number }> = {};
    locations
      .filter((loc) => {
        if (selectedCountry !== 'all' && loc.country !== selectedCountry) return false;
        if (selectedRegion !== 'all' && loc.region !== selectedRegion) return false;
        return true;
      })
      .forEach((loc) => {
        const city = loc.city || 'Unknown';
        if (!stats[city]) {
          stats[city] = { count: 0, lat: loc.latitude, lng: loc.longitude };
        }
        stats[city].count += 1;
      });
    return Object.entries(stats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([city, data]) => ({ city, ...data }));
  }, [locations, selectedCountry, selectedRegion]);

  // Filter locations for the map
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      if (selectedCountry !== 'all' && loc.country !== selectedCountry) return false;
      if (selectedRegion !== 'all' && loc.region !== selectedRegion) return false;
      if (premiumFilter === 'premium' && !loc.isPremium) return false;
      if (premiumFilter === 'free' && loc.isPremium) return false;
      return true;
    });
  }, [locations, selectedCountry, selectedRegion, premiumFilter]);

  const pendingReportsCount = reportStats.pendingPostReports + reportStats.pendingUserReports;

  const tabs: { id: Tab; label: string; icon: string; count?: number; urgent?: boolean }[] = [
    { id: 'locations', label: 'Location Analytics', icon: '📍', count: usersWithLocation },
    { id: 'exercises', label: 'Exercises', icon: '💪', count: exerciseStats.total },
    { id: 'barcodes', label: 'Barcode Products', icon: '📦', count: barcodeStats.total },
    { id: 'reports', label: 'Reports', icon: '🚨', count: pendingReportsCount, urgent: pendingReportsCount > 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader initialUser={user} initialProfile={profile} />

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage users, exercises, and barcode products</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition"
            >
              &larr; Back to site
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 flex gap-1 border-b border-gray-200 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    tab.urgent
                      ? 'bg-red-100 text-red-600'
                      : activeTab === tab.id
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'locations' && (
          <LocationAnalytics
            locations={locations}
            filteredLocations={filteredLocations}
            totalUsers={totalUsers}
            usersWithLocation={usersWithLocation}
            premiumUsers={premiumUsers}
            countryStats={countryStats}
            regionStats={regionStats}
            cityStats={cityStats}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            premiumFilter={premiumFilter}
            setPremiumFilter={setPremiumFilter}
          />
        )}

        {activeTab === 'exercises' && (
          <ExerciseManager
            exercises={exercises}
            stats={exerciseStats}
          />
        )}

        {activeTab === 'barcodes' && (
          <BarcodeManager
            barcodes={barcodes}
            stats={barcodeStats}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsManager
            postReports={postReports}
            userReports={userReports}
            stats={reportStats}
          />
        )}
      </div>
    </div>
  );
}

// Location Analytics Tab Content
function LocationAnalytics({
  locations,
  filteredLocations,
  totalUsers,
  usersWithLocation,
  premiumUsers,
  countryStats,
  regionStats,
  cityStats,
  selectedCountry,
  setSelectedCountry,
  selectedRegion,
  setSelectedRegion,
  premiumFilter,
  setPremiumFilter,
}: {
  locations: UserLocation[];
  filteredLocations: UserLocation[];
  totalUsers: number;
  usersWithLocation: number;
  premiumUsers: number;
  countryStats: { country: string; count: number }[];
  regionStats: { region: string; count: number }[];
  cityStats: { city: string; count: number; lat: number; lng: number }[];
  selectedCountry: string;
  setSelectedCountry: (v: string) => void;
  selectedRegion: string;
  setSelectedRegion: (v: string) => void;
  premiumFilter: 'all' | 'premium' | 'free';
  setPremiumFilter: (v: 'all' | 'premium' | 'free') => void;
}) {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Users" value={totalUsers} icon="👤" />
        <StatCard
          title="With Location"
          value={usersWithLocation}
          subtitle={`${((usersWithLocation / totalUsers) * 100).toFixed(1)}% tracked`}
          icon="📍"
        />
        <StatCard
          title="Premium"
          value={premiumUsers}
          subtitle={`${((premiumUsers / totalUsers) * 100).toFixed(1)}% conversion`}
          icon="⭐"
        />
        <StatCard title="Countries" value={countryStats.length} icon="🌍" />
        <StatCard
          title="Top City"
          value={cityStats[0]?.city || 'N/A'}
          subtitle={cityStats[0] ? `${cityStats[0].count} users` : undefined}
          icon="🏙️"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Locations</h2>
            <UserMap locations={filteredLocations} />
            <p className="text-sm text-gray-500 mt-3">
              Showing {filteredLocations.length} users
              {selectedCountry !== 'all' && ` in ${selectedCountry}`}
              {selectedRegion !== 'all' && `, ${selectedRegion}`}
            </p>
          </div>
        </div>

        {/* Filters & Stats Sidebar */}
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedRegion('all');
                  }}
                  className="w-full bg-gray-50 text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Countries</option>
                  {countryStats.map(({ country, count }) => (
                    <option key={country} value={country}>
                      {country} ({count})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCountry !== 'all' && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Regions</option>
                    {regionStats.map(({ region, count }) => (
                      <option key={region} value={region}>
                        {region} ({count})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Premium Filter */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">User Type</label>
                <div className="flex gap-2">
                  {(['all', 'premium', 'free'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPremiumFilter(filter)}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg transition ${
                        premiumFilter === filter
                          ? filter === 'premium'
                            ? 'bg-yellow-400 text-black font-medium'
                            : 'bg-orange-500 text-white font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter === 'all' ? 'All' : filter === 'premium' ? '⭐ Premium' : 'Free'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Cities */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-3">
              Top Cities
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Potential gym locations)
              </span>
            </h3>
            <div className="space-y-2">
              {cityStats.map(({ city, count }, index) => (
                <div
                  key={city}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold ${
                        index === 0
                          ? 'text-yellow-500'
                          : index === 1
                          ? 'text-gray-400'
                          : index === 2
                          ? 'text-orange-600'
                          : 'text-gray-400'
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-900">{city}</span>
                  </div>
                  <span className="text-sm text-orange-500 font-semibold">{count} users</span>
                </div>
              ))}
              {cityStats.length === 0 && (
                <p className="text-sm text-gray-500">No data available</p>
              )}
            </div>
          </div>

          {/* Country Breakdown */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-3">By Country</h3>
            <div className="space-y-2">
              {countryStats.slice(0, 5).map(({ country, count }) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{country}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(count / locations.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="mt-8 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Recent Users with Location</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Region</th>
                <th className="pb-3 font-medium">Country</th>
                <th className="pb-3 font-medium">Captured</th>
              </tr>
            </thead>
            <tbody>
              {locations.slice(0, 10).map((loc) => (
                <tr key={loc.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-900">
                    {loc.displayName || loc.username}
                    <span className="text-gray-500 text-xs ml-2">@{loc.username}</span>
                    {loc.isPremium && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                        ⭐ Premium
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-gray-600">{loc.city || '-'}</td>
                  <td className="py-3 text-gray-600">{loc.region || '-'}</td>
                  <td className="py-3 text-gray-600">{loc.country || '-'}</td>
                  <td className="py-3 text-gray-500">
                    {loc.capturedAt ? new Date(loc.capturedAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-orange-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
