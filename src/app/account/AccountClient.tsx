'use client';

/**
 * Account Client Component
 *
 * Dashboard with workouts, nutrition, feed (matching app), and account management.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// ============================================================================
// TYPES
// ============================================================================

interface Profile {
  id: string;
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

interface WorkoutSet {
  setNumber: number;
  weightKg: number | null;
  reps: number | null;
  isWarmup: boolean;
  isPr: boolean;
  durationSeconds: number | null;
  distanceMeters: number | null;
}

interface WorkoutExercise {
  id: string;
  name: string;
  trackingMode: string;
  totalVolume: number;
  sets: WorkoutSet[];
}

interface Workout {
  id: string;
  name: string;
  durationSeconds: number | null;
  totalVolumeKg: number | null;
  totalSets: number | null;
  totalReps: number | null;
  prCount: number | null;
  notes: string | null;
  exercises: WorkoutExercise[];
}

interface NutritionSummary {
  total_calories_kcal: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
}

interface Targets {
  target_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

interface FoodLog {
  id: string;
  food_name: string;
  meal_type: string;
  calories_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  logged_at: string;
}

interface Author {
  id: string;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
}

interface MealData {
  id: string;
  foodName: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  photoUrl: string | null;
}

interface WeightData {
  weightKg: number | null;
  textContent: string | null;
  mediaUrls: string[] | null;
}

interface ActivityFeedItem {
  id: string;
  type: 'workout' | 'meal' | 'weight';
  userId: string;
  author: Author;
  createdAt: string;
  workout?: Workout;
  meal?: MealData;
  weight?: WeightData;
  likeCount: number;
  commentCount: number;
}

interface AccountClientProps {
  user: User;
  profile: Profile | null;
  deletionRequest: DeletionRequest | null;
  workouts: Workout[];
  todayNutrition: NutritionSummary | null;
  targets: Targets | null;
  foodLogs: FoodLog[];
  activityFeed: ActivityFeedItem[];
}

const DELETION_REASONS = [
  { label: "I don't use the app anymore", value: 'not_using' },
  { label: "I'm switching to a different app", value: 'switching' },
  { label: 'Privacy concerns', value: 'privacy' },
  { label: 'Too many notifications', value: 'notifications' },
  { label: 'Other', value: 'other' },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function AccountClient({
  user,
  profile,
  deletionRequest: initialDeletionRequest,
  workouts,
  todayNutrition,
  targets,
  foodLogs,
  activityFeed,
}: AccountClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'feed' | 'settings'>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [deletionRequest, setDeletionRequest] = useState(initialDeletionRequest);

  // ============================================================================
  // HELPERS
  // ============================================================================

  const handleSignOut = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  };

  const formatWeight = (kg: number) => `${Math.round(kg).toLocaleString()} kg`;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const getDaysRemaining = (dateString: string) => {
    const deletionDate = new Date(dateString);
    const now = new Date();
    const diffTime = deletionDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack',
      pre_workout: 'Pre-Workout',
      post_workout: 'Post-Workout',
    };
    return labels[type] || 'Meal';
  };

  // ============================================================================
  // DELETION HANDLERS
  // ============================================================================

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
      setSuccess('Account deletion scheduled.');
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
      setSuccess('Deletion cancelled.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImmediately = async () => {
    if (!confirm('This will permanently delete your account. Are you sure?')) return;
    if (!confirm('Final warning: All data will be lost. Continue?')) return;

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

  // ============================================================================
  // MACRO CALCULATIONS
  // ============================================================================

  const caloriesConsumed = todayNutrition?.total_calories_kcal || 0;
  const caloriesTarget = targets?.target_kcal || 2000;
  const caloriesPercent = Math.min(100, (caloriesConsumed / caloriesTarget) * 100);

  const proteinConsumed = todayNutrition?.total_protein_g || 0;
  const proteinTarget = targets?.protein_g || 150;
  const proteinPercent = Math.min(100, (proteinConsumed / proteinTarget) * 100);

  const carbsConsumed = todayNutrition?.total_carbs_g || 0;
  const carbsTarget = targets?.carbs_g || 200;
  const carbsPercent = Math.min(100, (carbsConsumed / carbsTarget) * 100);

  const fatConsumed = todayNutrition?.total_fat_g || 0;
  const fatTarget = targets?.fat_g || 65;
  const fatPercent = Math.min(100, (fatConsumed / fatTarget) * 100);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">K</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">Kamaehu Gym</span>
          </Link>
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">
                  {(profile?.username || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <button onClick={handleSignOut} className="text-foreground-muted hover:text-foreground text-sm font-medium">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
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

        {/* Deletion Warning */}
        {deletionRequest && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-yellow-500">Account deletion scheduled</p>
                <p className="text-sm text-foreground-muted">{getDaysRemaining(deletionRequest.scheduled_deletion_at)} days remaining</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCancelDeletion} disabled={isLoading} className="px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium">Keep Account</button>
              <button onClick={handleDeleteImmediately} disabled={isLoading} className="px-4 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white">Delete Now</button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-background-secondary rounded-xl p-1">
          {(['dashboard', 'feed', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-primary text-white' : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ================================================================ */}
        {/* DASHBOARD TAB */}
        {/* ================================================================ */}
        {activeTab === 'dashboard' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Macros */}
            <div className="tribal-card">
              <h2 className="text-lg font-bold mb-4">🍽️ Today&apos;s Nutrition</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Calories</span>
                  <span className="font-medium">{Math.round(caloriesConsumed)} / {caloriesTarget}</span>
                </div>
                <div className="h-3 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${caloriesPercent}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Protein', consumed: proteinConsumed, target: proteinTarget, percent: proteinPercent, color: 'bg-protein text-protein' },
                  { label: 'Carbs', consumed: carbsConsumed, target: carbsTarget, percent: carbsPercent, color: 'bg-carbs text-carbs' },
                  { label: 'Fat', consumed: fatConsumed, target: fatTarget, percent: fatPercent, color: 'bg-fat text-fat' },
                ].map((macro) => (
                  <div key={macro.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={macro.color.split(' ')[1]}>{macro.label}</span>
                      <span>{Math.round(macro.consumed)}g</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div className={`h-full ${macro.color.split(' ')[0]}`} style={{ width: `${macro.percent}%` }} />
                    </div>
                    <p className="text-xs text-foreground-muted mt-1">{macro.target}g goal</p>
                  </div>
                ))}
              </div>
              {foodLogs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-sm text-foreground-muted mb-2">Today&apos;s Meals</p>
                  <div className="space-y-2">
                    {foodLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{log.food_name}</span>
                          <span className="text-foreground-muted ml-2">{getMealTypeLabel(log.meal_type)}</span>
                        </div>
                        <span className="text-foreground-muted">{log.calories_kcal} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {foodLogs.length === 0 && !todayNutrition && (
                <p className="text-foreground-muted text-sm mt-4">No meals logged today. Open the app to start tracking!</p>
              )}
            </div>

            {/* Recent Workouts */}
            <div className="tribal-card">
              <h2 className="text-lg font-bold mb-4">💪 Recent Workouts</h2>
              {workouts.length > 0 ? (
                <div className="space-y-3">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="p-3 bg-background-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{workout.name}</p>
                        {workout.prCount && workout.prCount > 0 && (
                          <span className="px-2 py-0.5 bg-trophy/20 rounded-full text-xs font-medium text-trophy">
                            🏆 {workout.prCount} PR{workout.prCount > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-xs text-foreground-muted">
                        {workout.durationSeconds && <span>{formatDuration(workout.durationSeconds)}</span>}
                        {workout.totalVolumeKg && <span>{formatWeight(workout.totalVolumeKg)}</span>}
                        {workout.totalSets && <span>{workout.totalSets} sets</span>}
                      </div>
                      {workout.exercises.length > 0 && (
                        <div className="mt-2 text-xs text-foreground-muted">
                          {workout.exercises.slice(0, 3).map(e => e.name).join(', ')}
                          {workout.exercises.length > 3 && ` +${workout.exercises.length - 3} more`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-foreground-muted text-sm">No workouts yet. Open the app to start training!</p>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* FEED TAB */}
        {/* ================================================================ */}
        {activeTab === 'feed' && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-lg font-bold mb-4">Activity Feed</h2>
            {activityFeed.length > 0 ? (
              <div className="space-y-4">
                {activityFeed.map((item) => (
                  <div key={item.id} className="tribal-card">
                    {/* Author Header */}
                    <div className="flex items-center gap-3 mb-3">
                      {item.author?.avatarUrl ? (
                        <img src={item.author.avatarUrl} alt="" className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {(item.author?.username || '?').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.author?.displayName || item.author?.username || 'User'}</p>
                        <p className="text-xs text-foreground-muted">{getTimeAgo(item.createdAt)}</p>
                      </div>
                      <span className="text-2xl">
                        {item.type === 'workout' ? '💪' : item.type === 'meal' ? '🍽️' : '⚖️'}
                      </span>
                    </div>

                    {/* Workout Content */}
                    {item.type === 'workout' && item.workout && (
                      <div className="bg-background-secondary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg">{item.workout.name}</h3>
                          {item.workout.prCount && item.workout.prCount > 0 && (
                            <span className="px-2 py-1 bg-trophy/20 rounded-full text-xs font-medium text-trophy">
                              🏆 {item.workout.prCount} PR{item.workout.prCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-4 text-sm text-foreground-muted mb-3">
                          {item.workout.durationSeconds && <span>⏱️ {formatDuration(item.workout.durationSeconds)}</span>}
                          {item.workout.totalVolumeKg && <span>🏋️ {formatWeight(item.workout.totalVolumeKg)}</span>}
                          {item.workout.totalSets && <span>{item.workout.totalSets} sets</span>}
                        </div>
                        {/* Exercises */}
                        {item.workout.exercises.length > 0 && (
                          <div className="space-y-2">
                            {item.workout.exercises.slice(0, 4).map((exercise) => (
                              <div key={exercise.id} className="bg-background/50 rounded-lg p-3">
                                <p className="font-medium text-sm mb-1">{exercise.name}</p>
                                <div className="flex flex-wrap gap-2">
                                  {exercise.sets.filter(s => !s.isWarmup).slice(0, 5).map((set, idx) => (
                                    <span
                                      key={idx}
                                      className={`text-xs px-2 py-1 rounded ${set.isPr ? 'bg-trophy/20 text-trophy font-bold' : 'bg-foreground/5'}`}
                                    >
                                      {set.weightKg ? `${set.weightKg}kg × ${set.reps}` : set.reps ? `${set.reps} reps` : '-'}
                                      {set.isPr && ' 🏆'}
                                    </span>
                                  ))}
                                  {exercise.sets.filter(s => !s.isWarmup).length > 5 && (
                                    <span className="text-xs text-foreground-muted">+{exercise.sets.filter(s => !s.isWarmup).length - 5} more</span>
                                  )}
                                </div>
                              </div>
                            ))}
                            {item.workout.exercises.length > 4 && (
                              <p className="text-xs text-foreground-muted text-center">+{item.workout.exercises.length - 4} more exercises</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Meal Content */}
                    {item.type === 'meal' && item.meal && (
                      <div className="bg-background-secondary rounded-lg p-4">
                        {item.meal.photoUrl && (
                          <img src={item.meal.photoUrl} alt="" className="w-full h-48 object-cover rounded-lg mb-3" />
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{item.meal.foodName}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {getMealTypeLabel(item.meal.mealType)}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="font-medium">{item.meal.calories} kcal</span>
                          <span className="text-protein">P: {item.meal.protein}g</span>
                          <span className="text-carbs">C: {item.meal.carbs}g</span>
                          <span className="text-fat">F: {item.meal.fat}g</span>
                        </div>
                      </div>
                    )}

                    {/* Weight Content */}
                    {item.type === 'weight' && item.weight && (
                      <div className="bg-background-secondary rounded-lg p-4">
                        {item.weight.mediaUrls && item.weight.mediaUrls.length > 0 && (
                          <img src={item.weight.mediaUrls[0]} alt="" className="w-full h-48 object-cover rounded-lg mb-3" />
                        )}
                        <div className="text-center">
                          <p className="text-3xl font-bold">{item.weight.weightKg} kg</p>
                          {item.weight.textContent && (
                            <p className="text-foreground-muted mt-2">{item.weight.textContent}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Engagement */}
                    <div className="flex items-center gap-4 text-sm text-foreground-muted mt-3 pt-3 border-t border-foreground/10">
                      <span>❤️ {item.likeCount}</span>
                      <span>💬 {item.commentCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tribal-card text-center py-8">
                <p className="text-4xl mb-2">📭</p>
                <p className="text-foreground-muted">No activity yet. Follow people in the app to see their workouts and meals!</p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* SETTINGS TAB */}
        {/* ================================================================ */}
        {activeTab === 'settings' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="tribal-card">
              <h2 className="text-lg font-bold mb-4">Profile</h2>
              <div className="flex items-center gap-4">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-full" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-2xl font-bold">
                      {(profile?.username || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{profile?.display_name || profile?.username || 'User'}</p>
                  <p className="text-foreground-muted">@{profile?.username || 'user'}</p>
                  <p className="text-foreground-muted text-sm">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-foreground-muted mt-4">To edit your profile, use the Kamaehu Gym app.</p>
            </div>

            {!deletionRequest && (
              <div className="tribal-card border border-red-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🗑️</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-red-500 mb-1">Delete Account</h2>
                    <p className="text-foreground-muted text-sm mb-4">Permanently delete your account and all data.</p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Delete Account</h2>
              <button onClick={() => setShowDeleteModal(false)} className="w-10 h-10 rounded-full hover:bg-foreground/10 flex items-center justify-center">✕</button>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="font-semibold text-red-500 mb-1">⚠️ This action is permanent</p>
              <p className="text-sm text-foreground-muted">All your workouts, nutrition logs, and data will be permanently deleted.</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground-muted mb-3">WHY ARE YOU LEAVING?</label>
              <div className="space-y-2">
                {DELETION_REASONS.map((reason) => (
                  <label key={reason.value} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${selectedReason === reason.value ? 'border-primary bg-primary/5' : 'border-transparent bg-background-secondary'}`}>
                    <input type="radio" name="reason" value={reason.value} checked={selectedReason === reason.value} onChange={(e) => setSelectedReason(e.target.value)} className="accent-primary" />
                    <span>{reason.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-4 py-3 rounded-lg bg-background-secondary font-medium">Cancel</button>
              <button onClick={handleRequestDeletion} disabled={!selectedReason || isLoading} className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium disabled:opacity-50">
                {isLoading ? 'Processing...' : 'Request Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
