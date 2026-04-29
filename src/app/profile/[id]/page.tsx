/**
 * User Profile Page
 *
 * Facebook-style profile with cover photo and activity.
 */

import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import ProfileClient from './ProfileClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  // Fetch current user's profile for the header
  let currentUserProfile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url, is_admin')
      .eq('id', user.id)
      .single();
    currentUserProfile = data;
  }

  // Fetch profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !profile) {
    notFound();
  }

  // Check if this is the current user's profile
  const isOwnProfile = user?.id === id;

  // Check if current user follows this profile
  let isFollowing = false;
  let followersCount = 0;
  let followingCount = 0;

  if (user) {
    const { data: followData } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', id)
      .single();

    isFollowing = !!followData;
  }

  // Get follower/following counts
  const { count: followers } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', id);

  const { count: following } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', id);

  followersCount = followers || 0;
  followingCount = following || 0;

  // Get workout stats
  const { count: totalWorkouts } = await supabase
    .from('workouts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id)
    .eq('status', 'completed');

  const { data: volumeData } = await supabase
    .from('workouts')
    .select('total_volume_kg')
    .eq('user_id', id)
    .eq('status', 'completed');

  const totalVolume = volumeData?.reduce((sum, w) => sum + (w.total_volume_kg || 0), 0) || 0;

  // If viewing own profile, fetch dashboard data
  let dashboardData = null;
  if (isOwnProfile && user) {
    // Fetch calorie targets
    const { data: targets } = await supabase
      .from('calorie_targets')
      .select('target_kcal, protein_g, carbs_g, fat_g')
      .eq('user_id', user.id)
      .single();

    // Fetch today's nutrition
    const today = new Date().toISOString().split('T')[0];
    const { data: todayNutrition } = await supabase
      .from('daily_nutrition_summary')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    // Fetch today's food logs
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { data: foodLogs } = await supabase
      .from('food_logs')
      .select('id, food_name, meal_type, calories_kcal, protein_g, carbs_g, fat_g, logged_at')
      .eq('user_id', user.id)
      .gte('logged_at', startOfDay.toISOString())
      .order('logged_at', { ascending: false })
      .limit(10);

    // Fetch recent workouts with exercises
    const { data: recentWorkouts } = await supabase
      .from('workouts')
      .select(`
        id,
        name,
        status,
        started_at,
        ended_at,
        duration_seconds,
        total_volume_kg,
        total_sets,
        total_reps,
        pr_count,
        workout_exercises (
          id,
          order_index,
          exercises!exercise_id (
            id,
            name
          ),
          workout_sets (
            set_number,
            weight_kg,
            reps,
            is_warmup,
            is_pr
          )
        )
      `)
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('ended_at', { ascending: false })
      .limit(5);

    dashboardData = {
      targets,
      todayNutrition,
      foodLogs: foodLogs || [],
      recentWorkouts: (recentWorkouts || []).map((w: any) => ({
        id: w.id,
        name: w.name,
        durationSeconds: w.duration_seconds,
        totalVolumeKg: w.total_volume_kg,
        totalSets: w.total_sets,
        prCount: w.pr_count,
        exercises: (w.workout_exercises || []).map((we: any) => {
          const exercise = Array.isArray(we.exercises) ? we.exercises[0] : we.exercises;
          return {
            id: we.id,
            name: exercise?.name || 'Unknown Exercise',
            sets: (we.workout_sets || []).map((s: any) => ({
              setNumber: s.set_number,
              weightKg: s.weight_kg,
              reps: s.reps,
              isWarmup: s.is_warmup,
              isPr: s.is_pr,
            })),
          };
        }),
      })),
    };
  }

  // Get recent posts
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      type,
      created_at,
      like_count,
      comment_count,
      workout:workouts(id, name, total_volume_kg, total_sets, pr_count, duration_seconds),
      meal:food_logs(id, food_name, meal_type, calories_kcal, protein_g, carbs_g, fat_g, photo_url),
      weight:weight_logs(weight_kg, notes)
    `)
    .eq('user_id', id)
    .is('archived_at', null)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <ProfileClient
      profile={profile as any}
      currentUser={user}
      currentUserProfile={currentUserProfile as any}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      followersCount={followersCount}
      followingCount={followingCount}
      totalWorkouts={totalWorkouts || 0}
      totalVolume={totalVolume}
      posts={(posts || []) as any}
      dashboardData={dashboardData}
    />
  );
}
