'use client';

/**
 * Settings Client Component
 *
 * Facebook-style settings page with account management.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  cover_photo_url: string | null;
  bio: string | null;
  is_public: boolean;
  is_admin: boolean;
  is_premium: boolean;
}

interface DeletionRequest {
  id: string;
  scheduled_deletion_at: string;
}

interface SettingsClientProps {
  user: User;
  profile: Profile | null;
  deletionRequest: DeletionRequest | null;
}

const DELETION_REASONS = [
  { label: "I don't use the app anymore", value: 'not_using' },
  { label: "I'm switching to a different app", value: 'switching' },
  { label: 'Privacy concerns', value: 'privacy' },
  { label: 'Too many notifications', value: 'notifications' },
  { label: 'Other', value: 'other' },
];

export default function SettingsClient({ user, profile, deletionRequest: initialDeletionRequest }: SettingsClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [deletionRequest, setDeletionRequest] = useState(initialDeletionRequest);

  const getDaysRemaining = (dateString: string) => {
    const deletionDate = new Date(dateString);
    const now = new Date();
    const diffTime = deletionDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const handleRequestDeletion = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('request_account_deletion', {
        reason_text: selectedReason || null,
      });
      if (error) throw error;
      if (!data.success) throw new Error(data.message);

      const { data: newRequest } = await supabase
        .from('account_deletion_requests')
        .select('*')
        .eq('user_id', user.id)
        .is('cancelled_at', null)
        .is('completed_at', null)
        .single();

      setDeletionRequest(newRequest);
      setShowDeleteModal(false);
      setSuccess('Account deletion scheduled. You have 14 days to change your mind.');
    } catch (err: any) {
      setError(err.message || 'Failed to request deletion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDeletion = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.rpc('cancel_account_deletion');
      setDeletionRequest(null);
      setSuccess('Deletion cancelled. Your account is safe.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImmediately = async () => {
    if (!confirm('This will permanently delete your account and all data. Are you absolutely sure?')) return;
    if (!confirm('FINAL WARNING: This cannot be undone. All your workouts, meals, and data will be permanently deleted. Continue?')) return;

    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.rpc('delete_account_immediately');
      await supabase.auth.signOut();
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader initialUser={user} initialProfile={profile} />

      <main className="pt-14">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account and preferences</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Deletion Warning */}
          {deletionRequest && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">⚠️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-700 text-lg">Account Deletion Scheduled</h3>
                  <p className="text-gray-700 mt-1">
                    Your account will be permanently deleted in {getDaysRemaining(deletionRequest.scheduled_deletion_at)} days.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleCancelDeletion}
                      disabled={isLoading}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Keep My Account
                    </button>
                    <button
                      onClick={handleDeleteImmediately}
                      disabled={isLoading}
                      className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Delete Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {(profile?.username || user.email || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{profile?.display_name || profile?.username || 'User'}</h3>
                    <p className="text-gray-500">@{profile?.username || 'user'}</p>
                    <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                    {profile?.is_premium && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <span>⭐</span> Premium Member
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 p-3 bg-gray-100 rounded-lg">
                  To edit your profile, please use the Kamaehu Gym mobile app.
                </p>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Privacy
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Profile Visibility</p>
                    <p className="text-sm text-gray-500">Control who can see your profile and activity</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile?.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {profile?.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Account
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                <Link href={`/profile/${user.id}`} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">My Profile & Dashboard</p>
                    <p className="text-sm text-gray-500">View your profile, nutrition, and workouts</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <div className="p-6">
                  <p className="font-medium text-gray-900">Download Your Data</p>
                  <p className="text-sm text-gray-500 mb-3">Get a copy of all your Kamaehu data</p>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    Request Data Export
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            {!deletionRequest && (
              <div className="bg-white rounded-xl overflow-hidden border border-red-200 shadow-sm">
                <div className="p-6 border-b border-red-200 bg-red-50">
                  <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Danger Zone
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Delete Account</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-medium transition-colors"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Delete Account</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="font-semibold text-red-600 mb-1">This action is permanent</p>
                <p className="text-sm text-gray-700">All your workouts, nutrition logs, progress photos, and data will be permanently deleted after 14 days.</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Why are you leaving?
                </label>
                <div className="space-y-2">
                  {DELETION_REASONS.map((reason) => (
                    <label
                      key={reason.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedReason === reason.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason.value}
                        checked={selectedReason === reason.value}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="accent-orange-500"
                      />
                      <span className="text-gray-900">{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestDeletion}
                  disabled={!selectedReason || isLoading}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Schedule Deletion'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
