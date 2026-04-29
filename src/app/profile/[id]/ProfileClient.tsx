'use client';

/**
 * Profile Client Component
 *
 * Facebook-style profile page with cover photo.
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AuthHeader from '@/components/AuthHeader';
import type { User } from '@supabase/supabase-js';

interface CurrentUserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
}

interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  cover_photo_url: string | null;
  bio: string | null;
  is_public: boolean;
  is_premium: boolean;
  created_at: string;
}

interface Workout {
  id: string;
  name: string;
  total_volume_kg: number | null;
  total_sets: number | null;
  pr_count: number | null;
  duration_seconds: number | null;
}

interface Post {
  id: string;
  type: 'workout' | 'meal' | 'weight' | 'text';
  created_at: string;
  like_count: number;
  comment_count: number;
  workout?: Workout | null;
  meal?: {
    id: string;
    food_name: string;
    meal_type: string;
    calories_kcal: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    photo_url: string | null;
  } | null;
  weight?: {
    weight_kg: number;
    notes: string | null;
  } | null;
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

interface DashboardWorkoutSet {
  setNumber: number;
  weightKg: number | null;
  reps: number | null;
  isWarmup: boolean;
  isPr: boolean;
}

interface DashboardWorkoutExercise {
  id: string;
  name: string;
  sets: DashboardWorkoutSet[];
}

interface DashboardWorkout {
  id: string;
  name: string;
  durationSeconds: number | null;
  totalVolumeKg: number | null;
  totalSets: number | null;
  prCount: number | null;
  exercises: DashboardWorkoutExercise[];
}

interface DashboardData {
  targets: {
    target_kcal: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
  } | null;
  todayNutrition: {
    total_calories_kcal: number;
    total_protein_g: number;
    total_carbs_g: number;
    total_fat_g: number;
  } | null;
  foodLogs: FoodLog[];
  recentWorkouts: DashboardWorkout[];
}

interface ProfileClientProps {
  profile: Profile;
  currentUser: User | null;
  currentUserProfile: CurrentUserProfile | null;
  isOwnProfile: boolean;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  totalWorkouts: number;
  totalVolume: number;
  posts: Post[];
  dashboardData?: DashboardData | null;
}

export default function ProfileClient({
  profile,
  currentUser,
  currentUserProfile,
  isOwnProfile,
  isFollowing: initialIsFollowing,
  followersCount: initialFollowersCount,
  followingCount,
  totalWorkouts,
  totalVolume,
  posts,
  dashboardData,
}: ProfileClientProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'about'>(isOwnProfile ? 'dashboard' : 'posts');

  const handleFollow = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    const supabase = createClient();

    try {
      if (isFollowing) {
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', currentUser.id)
          .eq('following_id', profile.id);

        setIsFollowing(false);
        setFollowersCount((c) => c - 1);
      } else {
        await supabase
          .from('follows')
          .insert({ follower_id: currentUser.id, following_id: profile.id });

        setIsFollowing(true);
        setFollowersCount((c) => c + 1);
      }
    } catch (error) {
      console.error('Follow error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m`;
  };

  const formatWeight = (kg: number) => {
    if (kg >= 1000000) return `${(kg / 1000000).toFixed(1)}M kg`;
    if (kg >= 1000) return `${(kg / 1000).toFixed(0)}k kg`;
    return `${Math.round(kg)} kg`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getMealTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      snack: 'Snack',
    };
    return labels[type] || 'Meal';
  };

  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthHeader initialUser={currentUser} initialProfile={currentUserProfile} />

      <main className="pt-14">
        {/* Cover Photo */}
        <div className="relative">
          {profile.cover_photo_url ? (
            <div
              className="h-64 md:h-80 bg-cover bg-center"
              style={{ backgroundImage: `url(${profile.cover_photo_url})` }}
            />
          ) : (
            <div className="h-64 md:h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative -mt-24 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl">
                    <span className="text-white text-5xl font-bold">
                      {(profile.username || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    {profile.display_name || profile.username}
                    {profile.is_premium && (
                      <span className="text-yellow-500" title="Premium Member">⭐</span>
                    )}
                  </h1>
                  <p className="text-gray-500 text-lg">@{profile.username}</p>
                </div>

                <div className="flex gap-3">
                  {isOwnProfile ? (
                    <Link
                      href="/settings"
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit Profile
                    </Link>
                  ) : currentUser ? (
                    <>
                      <button
                        onClick={handleFollow}
                        disabled={isLoading}
                        className={`px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                          isFollowing
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            Following
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Follow
                          </>
                        )}
                      </button>
                      <button className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Sign in to Follow
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-gray-600 max-w-2xl mt-2">{profile.bio}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{followersCount}</span>
                <span className="text-gray-500">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{followingCount}</span>
                <span className="text-gray-500">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{totalWorkouts}</span>
                <span className="text-gray-500">Workouts</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{formatWeight(totalVolume)}</span>
                <span className="text-gray-500">Volume</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-1">
              {isOwnProfile && (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-6 py-3 font-medium transition-colors relative ${
                    activeTab === 'dashboard' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                  {activeTab === 'dashboard' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                  )}
                </button>
              )}
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === 'posts' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Posts
                {activeTab === 'posts' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === 'about' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                About
                {activeTab === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="pb-12">
            {/* Dashboard Tab - Only for own profile */}
            {activeTab === 'dashboard' && isOwnProfile && dashboardData && (
              <DashboardTabContent
                dashboardData={dashboardData}
                formatDuration={formatDuration}
                formatWeight={formatWeight}
                getMealTypeLabel={getMealTypeLabel}
              />
            )}

            {activeTab === 'posts' && (
              <div className="max-w-2xl">
                {posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                        {/* Post Header */}
                        <div className="flex items-center gap-3 p-4">
                          {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <span className="text-white font-bold">
                                {(profile.username || '?').charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{profile.display_name || profile.username}</p>
                            <p className="text-sm text-gray-500">{getTimeAgo(post.created_at)}</p>
                          </div>
                          <span className="text-2xl">
                            {post.type === 'workout' ? '💪' : post.type === 'meal' ? '🍽️' : '⚖️'}
                          </span>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-4">
                          {post.type === 'workout' && post.workout && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-lg text-gray-900">{post.workout.name}</h3>
                                {post.workout.pr_count && post.workout.pr_count > 0 && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                                    🏆 {post.workout.pr_count} PR{post.workout.pr_count > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-4 text-sm text-gray-500">
                                {post.workout.duration_seconds && (
                                  <span>⏱️ {formatDuration(post.workout.duration_seconds)}</span>
                                )}
                                {post.workout.total_volume_kg && (
                                  <span>🏋️ {formatWeight(post.workout.total_volume_kg)}</span>
                                )}
                                {post.workout.total_sets && (
                                  <span>{post.workout.total_sets} sets</span>
                                )}
                              </div>
                            </div>
                          )}

                          {post.type === 'meal' && post.meal && (
                            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                              {post.meal.photo_url && (
                                <img src={post.meal.photo_url} alt="" className="w-full h-64 object-cover" />
                              )}
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-bold text-gray-900">{post.meal.food_name}</h3>
                                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                    {getMealTypeLabel(post.meal.meal_type)}
                                  </span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                  <span className="text-gray-900 font-medium">{post.meal.calories_kcal} kcal</span>
                                  <span className="text-blue-600">P: {post.meal.protein_g}g</span>
                                  <span className="text-green-600">C: {post.meal.carbs_g}g</span>
                                  <span className="text-yellow-600">F: {post.meal.fat_g}g</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {post.type === 'weight' && post.weight && (
                            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
                              <p className="text-4xl font-bold text-gray-900">{post.weight.weight_kg} kg</p>
                              {post.weight.notes && (
                                <p className="text-gray-500 mt-2">{post.weight.notes}</p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Engagement */}
                        <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-100">
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            ❤️ {post.like_count}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            💬 {post.comment_count}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                    <div className="text-5xl mb-4">📭</div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-500">
                      {isOwnProfile
                        ? 'Start logging workouts and meals to share your progress!'
                        : `${profile.display_name || profile.username} hasn't posted anything yet.`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="max-w-2xl">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">About</h3>
                  <div className="space-y-4">
                    {profile.bio && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Bio</p>
                        <p className="text-gray-900">{profile.bio}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Member since</p>
                      <p className="text-gray-900">{memberSince}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Workouts</p>
                      <p className="text-gray-900">{totalWorkouts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Volume Lifted</p>
                      <p className="text-gray-900">{formatWeight(totalVolume)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Dashboard Tab Content Component
function DashboardTabContent({
  dashboardData,
  formatDuration,
  formatWeight,
  getMealTypeLabel,
}: {
  dashboardData: DashboardData;
  formatDuration: (seconds: number) => string;
  formatWeight: (kg: number) => string;
  getMealTypeLabel: (type: string) => string;
}) {
  const { targets, todayNutrition, foodLogs, recentWorkouts } = dashboardData;

  // Calculate macro percentages
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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Today's Nutrition */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🍽️ Today&apos;s Nutrition
        </h2>

        {/* Calories */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Calories</span>
            <span className="font-medium text-gray-900">
              {Math.round(caloriesConsumed)} / {caloriesTarget}
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all"
              style={{ width: `${caloriesPercent}%` }}
            />
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Protein', consumed: proteinConsumed, target: proteinTarget, percent: proteinPercent, color: 'bg-blue-500', textColor: 'text-blue-600' },
            { label: 'Carbs', consumed: carbsConsumed, target: carbsTarget, percent: carbsPercent, color: 'bg-green-500', textColor: 'text-green-600' },
            { label: 'Fat', consumed: fatConsumed, target: fatTarget, percent: fatPercent, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
          ].map((macro) => (
            <div key={macro.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className={macro.textColor}>{macro.label}</span>
                <span className="text-gray-600">{Math.round(macro.consumed)}g</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${macro.color} transition-all`}
                  style={{ width: `${macro.percent}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{macro.target}g goal</p>
            </div>
          ))}
        </div>

        {/* Today's Food Logs */}
        {foodLogs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Today&apos;s Meals</p>
            <div className="space-y-2">
              {foodLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium text-gray-900">{log.food_name}</span>
                    <span className="text-gray-400 ml-2">{getMealTypeLabel(log.meal_type)}</span>
                  </div>
                  <span className="text-gray-500">{log.calories_kcal} kcal</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {foodLogs.length === 0 && !todayNutrition && (
          <p className="text-gray-500 text-sm mt-4">
            No meals logged today. Open the app to start tracking!
          </p>
        )}
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          💪 Recent Workouts
        </h2>

        {recentWorkouts.length > 0 ? (
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{workout.name}</p>
                  {workout.prCount && workout.prCount > 0 && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                      🏆 {workout.prCount} PR{workout.prCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mb-2">
                  {workout.durationSeconds && (
                    <span>⏱️ {formatDuration(workout.durationSeconds)}</span>
                  )}
                  {workout.totalVolumeKg && (
                    <span>🏋️ {formatWeight(workout.totalVolumeKg)}</span>
                  )}
                  {workout.totalSets && <span>{workout.totalSets} sets</span>}
                </div>
                {workout.exercises.length > 0 && (
                  <div className="text-xs text-gray-400">
                    {workout.exercises.slice(0, 3).map(e => e.name).join(', ')}
                    {workout.exercises.length > 3 && ` +${workout.exercises.length - 3} more`}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No workouts yet. Open the app to start training!
          </p>
        )}
      </div>
    </div>
  );
}
