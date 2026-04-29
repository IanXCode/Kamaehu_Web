'use client';

/**
 * Feed Client Component
 *
 * Facebook-style feed with sidebar widgets.
 */

import { useState } from 'react';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
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
}

interface Targets {
  target_kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

interface TodayNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Workout {
  id: string;
  name: string;
  total_volume_kg: number | null;
  total_sets: number | null;
  pr_count: number | null;
  duration_seconds: number | null;
  ended_at?: string;
}

interface Post {
  id: string;
  type: 'workout' | 'meal' | 'weight' | 'text';
  user_id: string;
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
  author?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface FeedClientProps {
  user: User;
  profile: Profile | null;
  targets: Targets | null;
  todayNutrition: TodayNutrition;
  recentWorkouts: Workout[];
  posts: Post[];
}

export default function FeedClient({
  user,
  profile,
  targets,
  todayNutrition,
  recentWorkouts,
  posts,
}: FeedClientProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover'>('feed');

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
      pre_workout: 'Pre-Workout',
      post_workout: 'Post-Workout',
    };
    return labels[type] || 'Meal';
  };

  // Calculate macro percentages
  const caloriePercent = targets ? Math.min(100, (todayNutrition.calories / targets.target_kcal) * 100) : 0;
  const proteinPercent = targets ? Math.min(100, (todayNutrition.protein / targets.protein_g) * 100) : 0;
  const carbsPercent = targets ? Math.min(100, (todayNutrition.carbs / targets.carbs_g) * 100) : 0;
  const fatPercent = targets ? Math.min(100, (todayNutrition.fat / targets.fat_g) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthHeader initialUser={user} initialProfile={profile} />

      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-20 space-y-4">
                {/* Profile Card */}
                <Link
                  href={`/profile/${profile?.id}`}
                  className="block bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow border border-gray-200"
                >
                  {profile?.cover_photo_url ? (
                    <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${profile.cover_photo_url})` }} />
                  ) : (
                    <div className="h-20 bg-gradient-to-r from-orange-500 to-orange-600" />
                  )}
                  <div className="px-4 pb-4 -mt-8">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-full border-4 border-white object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {(profile?.username || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 mt-2">{profile?.display_name || profile?.username}</h3>
                    <p className="text-sm text-gray-500">@{profile?.username}</p>
                  </div>
                </Link>

                {/* Quick Links */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <nav className="space-y-1">
                    <Link href="/feed" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-50 text-orange-600 font-medium">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      Home
                    </Link>
                    <Link href="/workouts" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Workouts
                    </Link>
                    <Link href="/nutrition" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Nutrition
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Feed */}
            <div className="flex-1 max-w-2xl">
              {/* Feed Tabs */}
              <div className="bg-white rounded-xl p-1 mb-6 flex border border-gray-200">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'feed' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Your Feed
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === 'discover' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Discover
                </button>
              </div>

              {/* Posts */}
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-gray-200">
                      {/* Post Header */}
                      <div className="flex items-center gap-3 p-4">
                        <Link href={`/profile/${post.author?.id}`}>
                          {post.author?.avatar_url ? (
                            <img src={post.author.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <span className="text-white font-bold">
                                {(post.author?.username || '?').charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </Link>
                        <div className="flex-1">
                          <Link href={`/profile/${post.author?.id}`} className="font-semibold text-gray-900 hover:underline">
                            {post.author?.display_name || post.author?.username || 'User'}
                          </Link>
                          <p className="text-sm text-gray-500">{getTimeAgo(post.created_at)}</p>
                        </div>
                        <span className="text-2xl">
                          {post.type === 'workout' ? '💪' : post.type === 'meal' ? '🍽️' : '⚖️'}
                        </span>
                      </div>

                      {/* Post Content */}
                      <div className="px-4 pb-4">
                        {/* Workout */}
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

                        {/* Meal */}
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

                        {/* Weight */}
                        {post.type === 'weight' && post.weight && (
                          <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
                            <p className="text-4xl font-bold text-gray-900">{post.weight.weight_kg} kg</p>
                            {post.weight.notes && (
                              <p className="text-gray-500 mt-2">{post.weight.notes}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-sm">{post.like_count}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">{post.comment_count}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors ml-auto">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                  <div className="text-5xl mb-4">📭</div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Your feed is empty</h3>
                  <p className="text-gray-500 mb-4">
                    Follow some people or log a workout to get started!
                  </p>
                  <Link href="/discover" className="inline-block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                    Discover Athletes
                  </Link>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <aside className="hidden xl:block w-80 flex-shrink-0">
              <div className="sticky top-20 space-y-4">
                {/* Today's Nutrition */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🍽️</span> Today's Nutrition
                  </h3>

                  {/* Calories */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Calories</span>
                      <span className="text-gray-900 font-medium">
                        {Math.round(todayNutrition.calories)} / {targets?.target_kcal || 2000}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        style={{ width: `${caloriePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-blue-600">Protein</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${proteinPercent}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{Math.round(todayNutrition.protein)}g</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-600">Carbs</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${carbsPercent}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{Math.round(todayNutrition.carbs)}g</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-yellow-600">Fat</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${fatPercent}%` }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{Math.round(todayNutrition.fat)}g</p>
                    </div>
                  </div>
                </div>

                {/* Recent Workouts */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>💪</span> This Week
                  </h3>
                  {recentWorkouts.length > 0 ? (
                    <div className="space-y-2">
                      {recentWorkouts.map((workout) => (
                        <div key={workout.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 text-sm">{workout.name}</p>
                            {workout.pr_count && workout.pr_count > 0 && (
                              <span className="text-yellow-600 text-xs">🏆 {workout.pr_count}</span>
                            )}
                          </div>
                          <div className="flex gap-3 text-xs text-gray-500 mt-1">
                            {workout.duration_seconds && <span>{formatDuration(workout.duration_seconds)}</span>}
                            {workout.total_volume_kg && <span>{formatWeight(workout.total_volume_kg)}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No workouts this week. Time to train!</p>
                  )}
                </div>

                {/* Download App CTA */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                  <h3 className="font-bold mb-2">Get the App</h3>
                  <p className="text-sm text-orange-100 mb-3">
                    Log workouts, track nutrition, and connect with athletes on the go.
                  </p>
                  <a
                    href="https://apps.apple.com/app/kamaehu-gym"
                    className="inline-block px-4 py-2 bg-white text-orange-500 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors"
                  >
                    Download for iOS
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
