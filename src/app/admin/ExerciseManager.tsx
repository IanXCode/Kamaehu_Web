'use client';

/**
 * Exercise Manager Component
 *
 * Admin tool for managing exercises:
 * - View all exercises with search/filter
 * - Edit exercise details
 * - Make user exercises "official" (is_system = true)
 * - Delete exercises
 */

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { Exercise } from './AdminDashboard';

interface ExerciseManagerProps {
  exercises: Exercise[];
  stats: {
    total: number;
    official: number;
    userCreated: number;
  };
}

const EXERCISE_TYPES = ['strength', 'cardio', 'flexibility', 'plyometric', 'calisthenics'];
const EQUIPMENT_TYPES = ['barbell', 'dumbbell', 'kettlebell', 'cable', 'machine', 'bodyweight', 'band', 'other', 'none'];

export default function ExerciseManager({ exercises: initialExercises, stats }: ExerciseManagerProps) {
  const [exercises, setExercises] = useState(initialExercises);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'official' | 'user'>('all');
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      if (searchQuery && !ex.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (typeFilter !== 'all' && ex.type !== typeFilter) {
        return false;
      }
      if (statusFilter === 'official' && !ex.is_system) {
        return false;
      }
      if (statusFilter === 'user' && ex.is_system) {
        return false;
      }
      return true;
    });
  }, [exercises, searchQuery, typeFilter, statusFilter]);

  const handleMakeOfficial = async (exercise: Exercise) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('exercises')
      .update({ is_system: true, is_public: true })
      .eq('id', exercise.id);

    if (error) {
      console.error('Error making exercise official:', error);
      alert('Failed to make exercise official');
    } else {
      setExercises(exercises.map((ex) =>
        ex.id === exercise.id ? { ...ex, is_system: true, is_public: true } : ex
      ));
    }
    setIsLoading(false);
  };

  const handleDelete = async (exerciseId: string) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', exerciseId);

    if (error) {
      console.error('Error deleting exercise:', error);
      alert('Failed to delete exercise');
    } else {
      setExercises(exercises.filter((ex) => ex.id !== exerciseId));
    }
    setDeleteConfirm(null);
    setIsLoading(false);
  };

  const handleSaveEdit = async (updatedExercise: Exercise) => {
    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('exercises')
      .update({
        name: updatedExercise.name,
        description: updatedExercise.description,
        instructions: updatedExercise.instructions,
        type: updatedExercise.type,
        equipment: updatedExercise.equipment,
        is_system: updatedExercise.is_system,
        is_public: updatedExercise.is_public,
        thumbnail_url: updatedExercise.thumbnail_url,
        video_url: updatedExercise.video_url,
      })
      .eq('id', updatedExercise.id);

    if (error) {
      console.error('Error updating exercise:', error);
      alert('Failed to update exercise');
    } else {
      setExercises(exercises.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      ));
      setEditingExercise(null);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Exercises" value={stats.total} icon="💪" />
        <StatCard title="Official" value={stats.official} subtitle="System exercises" icon="✅" />
        <StatCard title="User Created" value={stats.userCreated} subtitle="Community submissions" icon="👤" />
        <StatCard
          title="Pending Review"
          value={exercises.filter((ex) => !ex.is_system && ex.is_public).length}
          subtitle="Public but not official"
          icon="⏳"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-gray-50 text-gray-900 rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {EXERCISE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'official', 'user'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 text-sm rounded-lg transition ${
                  statusFilter === filter
                    ? 'bg-orange-500 text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'official' ? 'Official' : 'User Created'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-medium">Exercise</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Equipment</th>
                <th className="px-4 py-3 font-medium">Creator</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExercises.map((exercise) => (
                <tr key={exercise.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {exercise.thumbnail_url ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={exercise.thumbnail_url}
                            alt={exercise.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          💪
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{exercise.name}</p>
                        {exercise.description && (
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">
                            {exercise.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {exercise.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{exercise.equipment}</td>
                  <td className="px-4 py-3">
                    {exercise.creator ? (
                      <span className="text-gray-600">
                        @{exercise.creator.username}
                      </span>
                    ) : (
                      <span className="text-gray-400">System</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {exercise.is_system ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Official
                      </span>
                    ) : exercise.is_public ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Private
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!exercise.is_system && (
                        <button
                          onClick={() => handleMakeOfficial(exercise)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition"
                        >
                          Make Official
                        </button>
                      )}
                      <button
                        onClick={() => setEditingExercise(exercise)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(exercise.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExercises.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No exercises found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingExercise && (
        <EditExerciseModal
          exercise={editingExercise}
          onSave={handleSaveEdit}
          onClose={() => setEditingExercise(null)}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Exercise?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. All workout history using this exercise will reference a deleted exercise.
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

// Edit Exercise Modal
function EditExerciseModal({
  exercise,
  onSave,
  onClose,
  isLoading,
}: {
  exercise: Exercise;
  onSave: (exercise: Exercise) => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState(exercise);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Exercise</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value || null })}
              rows={2}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea
              value={form.instructions || ''}
              onChange={(e) => setForm({ ...form, instructions: e.target.value || null })}
              rows={3}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Type & Equipment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {EXERCISE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
              <select
                value={form.equipment}
                onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {EQUIPMENT_TYPES.map((eq) => (
                  <option key={eq} value={eq}>
                    {eq.charAt(0).toUpperCase() + eq.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_system}
                onChange={(e) => setForm({ ...form, is_system: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Official Exercise</p>
                <p className="text-xs text-gray-500">System-level exercise</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_public}
                onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Public</p>
                <p className="text-xs text-gray-500">Visible to all users</p>
              </div>
            </label>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
            <div className="flex gap-3">
              {form.thumbnail_url && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={form.thumbnail_url}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <input
                type="url"
                value={form.thumbnail_url || ''}
                onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value || null })}
                placeholder="https://..."
                className="flex-1 bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              type="url"
              value={form.video_url || ''}
              onChange={(e) => setForm({ ...form, video_url: e.target.value || null })}
              placeholder="https://..."
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

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
