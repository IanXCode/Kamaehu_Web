'use client';

/**
 * Account Client Component
 *
 * Handles the interactive parts of the account page.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface Profile {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  deleted_at: string | null;
}

interface DeletionRequest {
  id: string;
  user_id: string;
  reason: string | null;
  scheduled_deletion_at: string;
  cancelled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

interface AccountClientProps {
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

export default function AccountClient({
  user,
  profile,
  deletionRequest: initialDeletionRequest,
}: AccountClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState('');
  const [deletionRequest, setDeletionRequest] = useState(initialDeletionRequest);

  const handleSignOut = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (dateString: string) => {
    const deletionDate = new Date(dateString);
    const now = new Date();
    const diffTime = deletionDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleRequestDeletion = async () => {
    setIsLoading(true);
    setError(null);

    const reason = selectedReason === 'other' ? otherReason : selectedReason;

    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('request_account_deletion', {
        reason_text: reason || null,
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.message || 'Failed to request account deletion');
      }

      // Fetch the updated deletion request
      const { data: newRequest } = await supabase
        .from('account_deletion_requests')
        .select('*')
        .eq('user_id', user.id)
        .is('cancelled_at', null)
        .is('completed_at', null)
        .single();

      setDeletionRequest(newRequest);
      setShowDeleteModal(false);
      setSuccess('Account deletion scheduled. You have 30 days to cancel.');
    } catch (err: any) {
      setError(err.message || 'Failed to request account deletion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDeletion = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('cancel_account_deletion');

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.message || 'Failed to cancel account deletion');
      }

      setDeletionRequest(null);
      setSuccess('Account deletion cancelled. Your account is safe.');
    } catch (err: any) {
      setError(err.message || 'Failed to cancel account deletion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImmediately = async () => {
    if (!confirm('Are you absolutely sure? This will permanently delete your account immediately. This action cannot be undone.')) {
      return;
    }

    if (!confirm('Final warning: All your data will be permanently deleted. Click OK to proceed.')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc('delete_account_immediately');

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete account');
      }

      await supabase.auth.signOut();
      router.push('/?deleted=true');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">K</span>
            </div>
            <span className="text-xl font-bold gradient-text">Kamaehu</span>
          </Link>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="text-foreground-muted hover:text-foreground text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-500 text-sm">{success}</p>
          </div>
        )}

        {/* Account Info */}
        <div className="tribal-card shadow-lg mb-8">
          <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
          <p className="text-foreground-muted mb-6">
            Manage your Kamaehu account
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-background-secondary rounded-lg">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">
                    {(profile?.username || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">
                  {profile?.display_name || profile?.username || 'User'}
                </p>
                <p className="text-foreground-muted text-sm">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Deletion */}
        {deletionRequest && (
          <div className="tribal-card shadow-lg mb-8 border-2 border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-yellow-500 mb-1">
                  Account Deletion Scheduled
                </h2>
                <p className="text-foreground-muted mb-4">
                  Your account is scheduled to be deleted on{' '}
                  <strong className="text-foreground">
                    {formatDate(deletionRequest.scheduled_deletion_at)}
                  </strong>
                  .
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <span className="text-4xl font-bold text-yellow-500">
                      {getDaysRemaining(deletionRequest.scheduled_deletion_at)}
                    </span>
                    <p className="text-foreground-muted text-sm">days remaining</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCancelDeletion}
                    disabled={isLoading}
                    className="btn-island bg-gradient-to-r from-green-500 to-green-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Cancelling...' : 'Keep My Account'}
                  </button>
                  <button
                    onClick={handleDeleteImmediately}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Delete Now Instead
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Section */}
        {!deletionRequest && (
          <div className="tribal-card shadow-lg border border-red-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-500 mb-1">Delete Account</h2>
                <p className="text-foreground-muted mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-6 py-3 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-colors"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Delete Account</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-500 mb-1">This action is permanent</p>
                    <p className="text-sm text-foreground-muted">
                      Once your account is deleted, all your data including workouts, meals, progress photos,
                      and social connections will be permanently removed and cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground-muted mb-3">
                  WHY ARE YOU LEAVING?
                </label>
                <div className="space-y-2">
                  {DELETION_REASONS.map((reason) => (
                    <label
                      key={reason.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedReason === reason.value
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent bg-background-secondary hover:border-primary/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason.value}
                        checked={selectedReason === reason.value}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-5 h-5 accent-primary"
                      />
                      <span>{reason.label}</span>
                    </label>
                  ))}
                </div>

                {selectedReason === 'other' && (
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Please tell us why you're leaving..."
                    className="w-full mt-3 px-4 py-3 rounded-lg bg-background-secondary border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    rows={3}
                    maxLength={500}
                  />
                )}
              </div>

              {/* Info */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <p className="font-semibold text-blue-500 mb-2">30-Day Grace Period</p>
                <p className="text-sm text-foreground-muted">
                  After requesting deletion, you&apos;ll have 30 days to change your mind.
                  During this time, you can continue using the app and cancel the deletion at any time.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 rounded-full bg-background-secondary font-semibold hover:bg-foreground/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestDeletion}
                  disabled={!selectedReason || isLoading}
                  className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Request Deletion
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
