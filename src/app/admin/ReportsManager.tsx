'use client';

/**
 * Reports Manager Component
 *
 * Displays and manages user reports and post reports from the mobile app.
 * Actions: Review, Action (ban/remove), Dismiss
 */

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

// Types
export interface PostReport {
  id: string;
  reporter_id: string;
  post_id: string;
  reason: 'spam' | 'harassment' | 'sexual_content' | 'violence' | 'misinformation';
  details: string | null;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  reporter: { id: string; username: string; display_name: string | null; avatar_url: string | null } | null;
  post: {
    id: string;
    caption: string | null;
    media_urls: string[] | null;
    author: { id: string; username: string; display_name: string | null; avatar_url: string | null } | null;
  } | null;
}

export interface UserReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  reason: 'spam' | 'harassment' | 'sexual_content' | 'violence' | 'misinformation';
  details: string | null;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  reporter: { id: string; username: string; display_name: string | null; avatar_url: string | null } | null;
  reported_user: { id: string; username: string; display_name: string | null; avatar_url: string | null } | null;
}

interface ReportsManagerProps {
  postReports: PostReport[];
  userReports: UserReport[];
  stats: {
    totalPostReports: number;
    pendingPostReports: number;
    totalUserReports: number;
    pendingUserReports: number;
  };
}

type ReportType = 'posts' | 'users';
type StatusFilter = 'all' | 'pending' | 'reviewed' | 'actioned' | 'dismissed';

const REASON_LABELS: Record<string, { label: string; color: string }> = {
  spam: { label: 'Spam', color: 'bg-gray-100 text-gray-700' },
  harassment: { label: 'Harassment', color: 'bg-red-100 text-red-700' },
  sexual_content: { label: 'Sexual Content', color: 'bg-pink-100 text-pink-700' },
  violence: { label: 'Violence', color: 'bg-orange-100 text-orange-700' },
  misinformation: { label: 'Misinformation', color: 'bg-yellow-100 text-yellow-700' },
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  reviewed: { label: 'Reviewed', color: 'bg-blue-100 text-blue-700' },
  actioned: { label: 'Actioned', color: 'bg-green-100 text-green-700' },
  dismissed: { label: 'Dismissed', color: 'bg-gray-100 text-gray-500' },
};

export default function ReportsManager({ postReports: initialPostReports, userReports: initialUserReports, stats }: ReportsManagerProps) {
  const [reportType, setReportType] = useState<ReportType>('posts');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [postReports, setPostReports] = useState(initialPostReports);
  const [userReports, setUserReports] = useState(initialUserReports);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<PostReport | UserReport | null>(null);

  const supabase = createClient();

  // Filter reports
  const filteredPostReports = useMemo(() => {
    return postReports.filter(report => {
      if (statusFilter !== 'all' && report.status !== statusFilter) return false;
      return true;
    });
  }, [postReports, statusFilter]);

  const filteredUserReports = useMemo(() => {
    return userReports.filter(report => {
      if (statusFilter !== 'all' && report.status !== statusFilter) return false;
      return true;
    });
  }, [userReports, statusFilter]);

  // Update report status
  const updateReportStatus = async (
    reportId: string,
    newStatus: 'reviewed' | 'actioned' | 'dismissed',
    isPostReport: boolean
  ) => {
    setLoading(reportId);
    try {
      const table = isPostReport ? 'post_reports' : 'user_reports';
      const { error } = await supabase
        .from(table)
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', reportId);

      if (error) throw error;

      // Update local state
      if (isPostReport) {
        setPostReports(prev => prev.map(r =>
          r.id === reportId ? { ...r, status: newStatus, reviewed_at: new Date().toISOString() } : r
        ));
      } else {
        setUserReports(prev => prev.map(r =>
          r.id === reportId ? { ...r, status: newStatus, reviewed_at: new Date().toISOString() } : r
        ));
      }
      setSelectedReport(null);
    } catch (error) {
      console.error('Error updating report:', error);
      alert('Failed to update report');
    } finally {
      setLoading(null);
    }
  };

  // Delete the reported post
  const deletePost = async (postId: string, reportId: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;

    setLoading(reportId);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Mark report as actioned
      await updateReportStatus(reportId, 'actioned', true);

      // Remove from local state
      setPostReports(prev => prev.filter(r => r.post_id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setLoading(null);
    }
  };

  const pendingPostCount = postReports.filter(r => r.status === 'pending').length;
  const pendingUserCount = userReports.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Post Reports"
          value={stats.totalPostReports}
          subtitle={`${stats.pendingPostReports} pending`}
          icon="📝"
          urgent={stats.pendingPostReports > 0}
        />
        <StatCard
          title="User Reports"
          value={stats.totalUserReports}
          subtitle={`${stats.pendingUserReports} pending`}
          icon="👤"
          urgent={stats.pendingUserReports > 0}
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingPostReports + stats.pendingUserReports}
          icon="⏳"
          urgent={stats.pendingPostReports + stats.pendingUserReports > 0}
        />
        <StatCard
          title="Actioned Today"
          value={
            [...postReports, ...userReports].filter(
              r => r.status === 'actioned' &&
                r.reviewed_at &&
                new Date(r.reviewed_at).toDateString() === new Date().toDateString()
            ).length
          }
          icon="✅"
        />
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setReportType('posts')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              reportType === 'posts'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Post Reports
            {pendingPostCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                {pendingPostCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setReportType('users')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition ${
              reportType === 'users'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            User Reports
            {pendingUserCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                {pendingUserCount}
              </span>
            )}
          </button>
        </div>

        {/* Status Filter */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-2">
            {(['all', 'pending', 'reviewed', 'actioned', 'dismissed'] as StatusFilter[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  statusFilter === status
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : STATUS_LABELS[status].label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports List */}
        <div className="divide-y divide-gray-100">
          {reportType === 'posts' ? (
            filteredPostReports.length > 0 ? (
              filteredPostReports.map((report) => (
                <PostReportRow
                  key={report.id}
                  report={report}
                  loading={loading === report.id}
                  onAction={(status) => updateReportStatus(report.id, status, true)}
                  onDelete={() => report.post && deletePost(report.post.id, report.id)}
                  onSelect={() => setSelectedReport(report)}
                />
              ))
            ) : (
              <EmptyState type="post" filter={statusFilter} />
            )
          ) : (
            filteredUserReports.length > 0 ? (
              filteredUserReports.map((report) => (
                <UserReportRow
                  key={report.id}
                  report={report}
                  loading={loading === report.id}
                  onAction={(status) => updateReportStatus(report.id, status, false)}
                  onSelect={() => setSelectedReport(report)}
                />
              ))
            ) : (
              <EmptyState type="user" filter={statusFilter} />
            )
          )}
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          isPostReport={'post_id' in selectedReport}
          onClose={() => setSelectedReport(null)}
          onAction={(status) => updateReportStatus(selectedReport.id, status, 'post_id' in selectedReport)}
          onDelete={'post' in selectedReport && selectedReport.post ? () => deletePost(selectedReport.post!.id, selectedReport.id) : undefined}
          loading={loading === selectedReport.id}
        />
      )}
    </div>
  );
}

// Post Report Row
function PostReportRow({
  report,
  loading,
  onAction,
  onDelete,
  onSelect,
}: {
  report: PostReport;
  loading: boolean;
  onAction: (status: 'reviewed' | 'actioned' | 'dismissed') => void;
  onDelete: () => void;
  onSelect: () => void;
}) {
  const reason = REASON_LABELS[report.reason] || { label: report.reason, color: 'bg-gray-100 text-gray-700' };
  const status = STATUS_LABELS[report.status] || { label: report.status, color: 'bg-gray-100 text-gray-500' };

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex items-start gap-4">
        {/* Post Preview */}
        <div
          className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden cursor-pointer"
          onClick={onSelect}
        >
          {report.post?.media_urls?.[0] ? (
            <Image
              src={report.post.media_urls[0]}
              alt="Post"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>

        {/* Report Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs rounded-full ${reason.color}`}>
              {reason.label}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>

          <p className="text-sm text-gray-900 truncate">
            <span className="font-medium">@{report.reporter?.username || 'Unknown'}</span>
            {' reported '}
            <span className="font-medium">@{report.post?.author?.username || 'Unknown'}</span>
            &apos;s post
          </p>

          {report.details && (
            <p className="text-sm text-gray-500 truncate mt-1">&ldquo;{report.details}&rdquo;</p>
          )}

          <p className="text-xs text-gray-400 mt-1">
            {new Date(report.created_at).toLocaleDateString()} at{' '}
            {new Date(report.created_at).toLocaleTimeString()}
          </p>
        </div>

        {/* Actions */}
        {report.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction('dismissed')}
              disabled={loading}
              className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              Dismiss
            </button>
            <button
              onClick={onDelete}
              disabled={loading}
              className="px-3 py-1.5 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// User Report Row
function UserReportRow({
  report,
  loading,
  onAction,
  onSelect,
}: {
  report: UserReport;
  loading: boolean;
  onAction: (status: 'reviewed' | 'actioned' | 'dismissed') => void;
  onSelect: () => void;
}) {
  const reason = REASON_LABELS[report.reason] || { label: report.reason, color: 'bg-gray-100 text-gray-700' };
  const status = STATUS_LABELS[report.status] || { label: report.status, color: 'bg-gray-100 text-gray-500' };

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex items-start gap-4">
        {/* User Avatar */}
        <div
          className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden cursor-pointer"
          onClick={onSelect}
        >
          {report.reported_user?.avatar_url ? (
            <Image
              src={report.reported_user.avatar_url}
              alt={report.reported_user.username}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
              👤
            </div>
          )}
        </div>

        {/* Report Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs rounded-full ${reason.color}`}>
              {reason.label}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>

          <p className="text-sm text-gray-900">
            <span className="font-medium">@{report.reporter?.username || 'Unknown'}</span>
            {' reported '}
            <span className="font-medium">@{report.reported_user?.username || 'Unknown'}</span>
          </p>

          {report.details && (
            <p className="text-sm text-gray-500 truncate mt-1">&ldquo;{report.details}&rdquo;</p>
          )}

          <p className="text-xs text-gray-400 mt-1">
            {new Date(report.created_at).toLocaleDateString()} at{' '}
            {new Date(report.created_at).toLocaleTimeString()}
          </p>
        </div>

        {/* Actions */}
        {report.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction('dismissed')}
              disabled={loading}
              className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              Dismiss
            </button>
            <button
              onClick={() => onAction('actioned')}
              disabled={loading}
              className="px-3 py-1.5 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              Take Action
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Report Detail Modal
function ReportDetailModal({
  report,
  isPostReport,
  onClose,
  onAction,
  onDelete,
  loading,
}: {
  report: PostReport | UserReport;
  isPostReport: boolean;
  onClose: () => void;
  onAction: (status: 'reviewed' | 'actioned' | 'dismissed') => void;
  onDelete?: () => void;
  loading: boolean;
}) {
  const reason = REASON_LABELS[report.reason] || { label: report.reason, color: 'bg-gray-100 text-gray-700' };
  const status = STATUS_LABELS[report.status] || { label: report.status, color: 'bg-gray-100 text-gray-500' };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Report Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Status Badges */}
          <div className="flex gap-2">
            <span className={`px-2 py-0.5 text-xs rounded-full ${reason.color}`}>
              {reason.label}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Reporter */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Reported by</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                {report.reporter?.avatar_url ? (
                  <Image
                    src={report.reporter.avatar_url}
                    alt={report.reporter.username}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {report.reporter?.display_name || report.reporter?.username || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500">@{report.reporter?.username || 'unknown'}</p>
              </div>
            </div>
          </div>

          {/* Reported Content */}
          {isPostReport ? (
            <div>
              <p className="text-xs text-gray-500 mb-1">Reported Post</p>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
                    {(report as PostReport).post?.author?.avatar_url ? (
                      <Image
                        src={(report as PostReport).post!.author!.avatar_url!}
                        alt=""
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">👤</div>
                    )}
                  </div>
                  <p className="text-sm font-medium">
                    @{(report as PostReport).post?.author?.username || 'unknown'}
                  </p>
                </div>
                {(report as PostReport).post?.media_urls?.[0] && (
                  <Image
                    src={(report as PostReport).post!.media_urls![0]}
                    alt="Post"
                    width={400}
                    height={300}
                    className="w-full rounded-lg mb-2"
                  />
                )}
                {(report as PostReport).post?.caption && (
                  <p className="text-sm text-gray-700">{(report as PostReport).post!.caption}</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-500 mb-1">Reported User</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                  {(report as UserReport).reported_user?.avatar_url ? (
                    <Image
                      src={(report as UserReport).reported_user!.avatar_url!}
                      alt=""
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">👤</div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {(report as UserReport).reported_user?.display_name ||
                      (report as UserReport).reported_user?.username ||
                      'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{(report as UserReport).reported_user?.username || 'unknown'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          {report.details && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Additional Details</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{report.details}</p>
            </div>
          )}

          {/* Timestamp */}
          <div>
            <p className="text-xs text-gray-500">
              Reported on {new Date(report.created_at).toLocaleDateString()} at{' '}
              {new Date(report.created_at).toLocaleTimeString()}
            </p>
            {report.reviewed_at && (
              <p className="text-xs text-gray-500">
                Reviewed on {new Date(report.reviewed_at).toLocaleDateString()} at{' '}
                {new Date(report.reviewed_at).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {report.status === 'pending' && (
          <div className="p-4 border-t border-gray-200 flex gap-2 justify-end">
            <button
              onClick={() => onAction('dismissed')}
              disabled={loading}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              Dismiss
            </button>
            <button
              onClick={() => onAction('reviewed')}
              disabled={loading}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Mark Reviewed
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                disabled={loading}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
              >
                Delete Post
              </button>
            )}
            {!isPostReport && (
              <button
                onClick={() => onAction('actioned')}
                disabled={loading}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
              >
                Take Action
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Empty State
function EmptyState({ type, filter }: { type: 'post' | 'user'; filter: StatusFilter }) {
  return (
    <div className="p-8 text-center">
      <p className="text-4xl mb-2">{filter === 'pending' ? '✨' : '📋'}</p>
      <p className="text-gray-500">
        {filter === 'pending'
          ? `No pending ${type} reports`
          : `No ${filter === 'all' ? '' : filter} ${type} reports found`}
      </p>
    </div>
  );
}

// Stat Card
function StatCard({
  title,
  value,
  subtitle,
  icon,
  urgent,
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: string;
  urgent?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl p-4 border shadow-sm ${urgent ? 'border-red-200' : 'border-gray-200'}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-xl font-bold ${urgent ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
          {subtitle && <p className={`text-xs ${urgent ? 'text-red-500' : 'text-orange-500'}`}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
