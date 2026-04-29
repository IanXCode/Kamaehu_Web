'use client';

/**
 * Barcode Manager Component
 *
 * Admin tool for managing community barcode submissions:
 * - View all barcode products with search/filter
 * - Edit nutrition data
 * - Manually verify entries
 * - Delete entries
 */

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { CommunityBarcode } from './AdminDashboard';

interface BarcodeManagerProps {
  barcodes: CommunityBarcode[];
  stats: {
    total: number;
    verified: number;
    pending: number;
  };
}

export default function BarcodeManager({ barcodes: initialBarcodes, stats }: BarcodeManagerProps) {
  const [barcodes, setBarcodes] = useState(initialBarcodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [editingBarcode, setEditingBarcode] = useState<CommunityBarcode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Filter barcodes
  const filteredBarcodes = useMemo(() => {
    return barcodes.filter((bc) => {
      const searchLower = searchQuery.toLowerCase();
      if (searchQuery &&
          !bc.name.toLowerCase().includes(searchLower) &&
          !bc.barcode.includes(searchQuery) &&
          !(bc.brand?.toLowerCase().includes(searchLower))) {
        return false;
      }
      if (verifiedFilter === 'verified' && !bc.is_verified) {
        return false;
      }
      if (verifiedFilter === 'pending' && bc.is_verified) {
        return false;
      }
      return true;
    });
  }, [barcodes, searchQuery, verifiedFilter]);

  const handleVerify = async (barcode: CommunityBarcode) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('community_barcodes')
      .update({ is_verified: true })
      .eq('id', barcode.id);

    if (error) {
      console.error('Error verifying barcode:', error);
      alert('Failed to verify barcode');
    } else {
      setBarcodes(barcodes.map((bc) =>
        bc.id === barcode.id ? { ...bc, is_verified: true } : bc
      ));
    }
    setIsLoading(false);
  };

  const handleDelete = async (barcodeId: string) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('community_barcodes')
      .delete()
      .eq('id', barcodeId);

    if (error) {
      console.error('Error deleting barcode:', error);
      alert('Failed to delete barcode');
    } else {
      setBarcodes(barcodes.filter((bc) => bc.id !== barcodeId));
    }
    setDeleteConfirm(null);
    setIsLoading(false);
  };

  const handleSaveEdit = async (updatedBarcode: CommunityBarcode) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('community_barcodes')
      .update({
        name: updatedBarcode.name,
        brand: updatedBarcode.brand,
        serving_size: updatedBarcode.serving_size,
        serving_unit: updatedBarcode.serving_unit,
        servings_per_container: updatedBarcode.servings_per_container,
        calories_kcal: updatedBarcode.calories_kcal,
        protein_g: updatedBarcode.protein_g,
        carbs_g: updatedBarcode.carbs_g,
        fat_g: updatedBarcode.fat_g,
        fiber_g: updatedBarcode.fiber_g,
        sugar_g: updatedBarcode.sugar_g,
        sodium_mg: updatedBarcode.sodium_mg,
        is_verified: updatedBarcode.is_verified,
      })
      .eq('id', updatedBarcode.id);

    if (error) {
      console.error('Error updating barcode:', error);
      alert('Failed to update barcode');
    } else {
      setBarcodes(barcodes.map((bc) =>
        bc.id === updatedBarcode.id ? updatedBarcode : bc
      ));
      setEditingBarcode(null);
    }
    setIsLoading(false);
  };

  // Calculate top contributors
  const topContributors = useMemo(() => {
    const contributors: Record<string, { username: string; count: number }> = {};
    barcodes.forEach((bc) => {
      if (bc.submitter) {
        if (!contributors[bc.submitted_by!]) {
          contributors[bc.submitted_by!] = { username: bc.submitter.username, count: 0 };
        }
        contributors[bc.submitted_by!].count++;
      }
    });
    return Object.entries(contributors)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([id, data]) => ({ id, ...data }));
  }, [barcodes]);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Products" value={stats.total} icon="📦" />
        <StatCard title="Verified" value={stats.verified} subtitle="Community approved" icon="✅" />
        <StatCard title="Pending" value={stats.pending} subtitle="Needs verification" icon="⏳" />
        <StatCard
          title="Top Contributor"
          value={topContributors[0]?.username || 'N/A'}
          subtitle={topContributors[0] ? `${topContributors[0].count} submissions` : undefined}
          icon="🏆"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name, barcode, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Verified Filter */}
          <div className="flex gap-2">
            {(['all', 'verified', 'pending'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setVerifiedFilter(filter)}
                className={`px-4 py-2 text-sm rounded-lg transition ${
                  verifiedFilter === filter
                    ? 'bg-orange-500 text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'verified' ? 'Verified' : 'Pending'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barcode List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Barcode</th>
                <th className="px-4 py-3 font-medium">Macros</th>
                <th className="px-4 py-3 font-medium">Submitter</th>
                <th className="px-4 py-3 font-medium">Votes</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBarcodes.map((barcode) => (
                <tr key={barcode.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {barcode.photo_url ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={barcode.photo_url}
                            alt={barcode.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{barcode.name}</p>
                        {barcode.brand && (
                          <p className="text-xs text-gray-500">{barcode.brand}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{barcode.barcode}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs space-y-0.5">
                      <p><span className="text-gray-500">Cal:</span> <span className="font-medium">{barcode.calories_kcal}</span></p>
                      <p>
                        <span className="text-blue-600">P:{barcode.protein_g}g</span>{' '}
                        <span className="text-green-600">C:{barcode.carbs_g}g</span>{' '}
                        <span className="text-orange-600">F:{barcode.fat_g}g</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {barcode.submitter ? (
                      <span className="text-gray-600">@{barcode.submitter.username}</span>
                    ) : (
                      <span className="text-gray-400">Unknown</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <span className="text-green-600">{barcode.vote_count}</span>
                      <span className="text-gray-400">/ {barcode.verification_threshold}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {barcode.is_verified ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!barcode.is_verified && (
                        <button
                          onClick={() => handleVerify(barcode)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => setEditingBarcode(barcode)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(barcode.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBarcodes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No barcode products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBarcode && (
        <EditBarcodeModal
          barcode={editingBarcode}
          onSave={handleSaveEdit}
          onClose={() => setEditingBarcode(null)}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Barcode Entry?</h3>
            <p className="text-gray-600 mb-6">
              This will remove this product from the community database. Users who have logged this food will still have their entries.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit Barcode Modal
function EditBarcodeModal({
  barcode,
  onSave,
  onClose,
  isLoading,
}: {
  barcode: CommunityBarcode;
  onSave: (barcode: CommunityBarcode) => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState(barcode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Barcode Product</h2>
          <p className="text-sm text-gray-500 mt-1">Barcode: {barcode.barcode}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name & Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                value={form.brand || ''}
                onChange={(e) => setForm({ ...form, brand: e.target.value || null })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Serving Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
              <input
                type="number"
                step="0.01"
                value={form.serving_size}
                onChange={(e) => setForm({ ...form, serving_size: parseFloat(e.target.value) || 0 })}
                required
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                type="text"
                value={form.serving_unit}
                onChange={(e) => setForm({ ...form, serving_unit: e.target.value })}
                required
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servings/Container</label>
              <input
                type="number"
                step="0.01"
                value={form.servings_per_container || ''}
                onChange={(e) => setForm({ ...form, servings_per_container: parseFloat(e.target.value) || null })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Main Macros */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Nutrition (per serving)</h4>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Calories</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.calories_kcal}
                  onChange={(e) => setForm({ ...form, calories_kcal: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full bg-white text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-blue-600 mb-1">Protein (g)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.protein_g}
                  onChange={(e) => setForm({ ...form, protein_g: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full bg-white text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-green-600 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.carbs_g}
                  onChange={(e) => setForm({ ...form, carbs_g: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full bg-white text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-orange-600 mb-1">Fat (g)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.fat_g}
                  onChange={(e) => setForm({ ...form, fat_g: parseFloat(e.target.value) || 0 })}
                  required
                  className="w-full bg-white text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Optional Nutrition */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiber (g)</label>
              <input
                type="number"
                step="0.01"
                value={form.fiber_g || ''}
                onChange={(e) => setForm({ ...form, fiber_g: parseFloat(e.target.value) || null })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sugar (g)</label>
              <input
                type="number"
                step="0.01"
                value={form.sugar_g || ''}
                onChange={(e) => setForm({ ...form, sugar_g: parseFloat(e.target.value) || null })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sodium (mg)</label>
              <input
                type="number"
                step="0.01"
                value={form.sodium_mg || ''}
                onChange={(e) => setForm({ ...form, sodium_mg: parseFloat(e.target.value) || null })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Verified Toggle */}
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_verified}
              onChange={(e) => setForm({ ...form, is_verified: e.target.checked })}
              className="w-4 h-4 text-green-500 rounded focus:ring-green-500"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Verified</p>
              <p className="text-xs text-gray-500">Mark this entry as verified by admin</p>
            </div>
          </label>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
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
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
