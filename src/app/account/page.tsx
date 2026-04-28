/**
 * Account Page
 *
 * Dashboard showing workout history, macros, feed, and account management.
 * Feed matches the app's activity feed (workouts, meals, weight logs).
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AccountClient from './AccountClient';

export const metadata = {
  title: 'My Dashboard | Kamaehu Gym',
  description: 'View your workouts, nutrition, and feed',
};

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, deleted_at')
    .eq('id', user.id)
    .single();

  // Fetch deletion request if any
  const { data: deletionRequest } = await supabase
    .from('account_deletion_requests')
    .select('*')
    .eq('user_id', user.id)
    .is('cancelled_at', null)
    .is('completed_at', null)
    .single();

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

  // Fetch recent food logs for today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const { data: foodLogs } = await supabase
    .from('food_logs')
    .select('id, food_name, meal_type, calories_kcal, protein_g, carbs_g, fat_g, logged_at')
    .eq('user_id', user.id)
    .gte('logged_at', startOfDay.toISOString())
    .order('logged_at', { ascending: false })
    .limit(10);

  // ========== ACTIVITY FEED (matching app behavior) ==========

  // Get following list
  const { data: follows } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.id);

  const followingIds = [user.id, ...(follows?.map(f => f.following_id) || [])];

  // Fetch workouts with exercises
  const { data: workoutsRaw } = await supabase
    .from('workouts')
    .select(`
      id,
      user_id,
      name,
      status,
      started_at,
      ended_at,
      duration_seconds,
      total_volume_kg,
      total_sets,
      total_reps,
      pr_count,
      notes,
      profiles!user_id (
        id,
        username,
        display_name,
        avatar_url
      ),
      workout_exercises (
        id,
        order_index,
        total_volume_kg,
        exercises!exercise_id (
          id,
          name,
          type,
          tracking_mode
        ),
        workout_sets (
          set_number,
          weight_kg,
          reps,
          is_warmup,
          is_pr,
          duration_seconds,
          distance_meters
        )
      )
    `)
    .in('user_id', followingIds)
    .eq('status', 'completed')
    .order('ended_at', { ascending: false })
    .limit(15);

  // Fetch food logs for feed (with photos)
  const { data: mealLogsRaw } = await supabase
    .from('food_logs')
    .select(`
      id,
      user_id,
      food_name,
      meal_type,
      calories_kcal,
      protein_g,
      carbs_g,
      fat_g,
      logged_at,
      photo_url,
      profiles!user_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .in('user_id', followingIds)
    .order('logged_at', { ascending: false })
    .limit(15);

  // Fetch weight posts
  const { data: weightPostsRaw } = await supabase
    .from('posts')
    .select(`
      id,
      user_id,
      type,
      text_content,
      media_urls,
      like_count,
      comment_count,
      created_at,
      profiles!user_id (
        id,
        username,
        display_name,
        avatar_url
      ),
      weight_logs!weight_log_id (
        id,
        weight_kg,
        logged_at
      )
    `)
    .in('user_id', followingIds)
    .eq('type', 'weight')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(10);

  // Get engagement data for workouts
  const workoutIds = (workoutsRaw || []).map((w: any) => w.id);
  const { data: workoutPosts } = workoutIds.length > 0
    ? await supabase
        .from('posts')
        .select('id, workout_id, like_count, comment_count')
        .in('workout_id', workoutIds)
    : { data: [] };

  // Get engagement data for meals
  const mealIds = (mealLogsRaw || []).map((m: any) => m.id);
  const { data: mealPosts } = mealIds.length > 0
    ? await supabase
        .from('posts')
        .select('id, food_log_id, like_count, comment_count')
        .in('food_log_id', mealIds)
    : { data: [] };

  // Build engagement maps
  const workoutEngagement = new Map((workoutPosts || []).map((p: any) => [
    p.workout_id,
    { likeCount: p.like_count || 0, commentCount: p.comment_count || 0 }
  ]));

  const mealEngagement = new Map((mealPosts || []).map((p: any) => [
    p.food_log_id,
    { likeCount: p.like_count || 0, commentCount: p.comment_count || 0 }
  ]));

  // Transform workouts into feed items
  const workoutFeedItems = (workoutsRaw || []).map((w: any) => {
    const author = Array.isArray(w.profiles) ? w.profiles[0] : w.profiles;
    const engagement = workoutEngagement.get(w.id) || { likeCount: 0, commentCount: 0 };

    return {
      id: `workout-${w.id}`,
      type: 'workout' as const,
      userId: w.user_id,
      author: {
        id: author?.id,
        username: author?.username,
        displayName: author?.display_name,
        avatarUrl: author?.avatar_url,
      },
      createdAt: w.ended_at || w.started_at,
      workout: {
        id: w.id,
        name: w.name,
        durationSeconds: w.duration_seconds,
        totalVolumeKg: w.total_volume_kg,
        totalSets: w.total_sets,
        totalReps: w.total_reps,
        prCount: w.pr_count,
        notes: w.notes,
        exercises: (w.workout_exercises || []).map((we: any) => {
          const exercise = Array.isArray(we.exercises) ? we.exercises[0] : we.exercises;
          return {
            id: we.id,
            name: exercise?.name || 'Unknown Exercise',
            trackingMode: exercise?.tracking_mode || 'weight_reps',
            totalVolume: we.total_volume_kg || 0,
            sets: (we.workout_sets || []).map((s: any) => ({
              setNumber: s.set_number,
              weightKg: s.weight_kg,
              reps: s.reps,
              isWarmup: s.is_warmup,
              isPr: s.is_pr,
              durationSeconds: s.duration_seconds,
              distanceMeters: s.distance_meters,
            })),
          };
        }),
      },
      likeCount: engagement.likeCount,
      commentCount: engagement.commentCount,
    };
  });

  // Transform meals into feed items
  const mealFeedItems = (mealLogsRaw || []).map((m: any) => {
    const author = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles;
    const engagement = mealEngagement.get(m.id) || { likeCount: 0, commentCount: 0 };

    return {
      id: `meal-${m.id}`,
      type: 'meal' as const,
      userId: m.user_id,
      author: {
        id: author?.id,
        username: author?.username,
        displayName: author?.display_name,
        avatarUrl: author?.avatar_url,
      },
      createdAt: m.logged_at,
      meal: {
        id: m.id,
        foodName: m.food_name,
        mealType: m.meal_type,
        calories: m.calories_kcal,
        protein: m.protein_g,
        carbs: m.carbs_g,
        fat: m.fat_g,
        photoUrl: m.photo_url,
      },
      likeCount: engagement.likeCount,
      commentCount: engagement.commentCount,
    };
  });

  // Transform weight posts into feed items
  const weightFeedItems = (weightPostsRaw || []).map((p: any) => {
    const author = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
    const weightLog = Array.isArray(p.weight_logs) ? p.weight_logs[0] : p.weight_logs;

    return {
      id: `weight-${p.id}`,
      type: 'weight' as const,
      userId: p.user_id,
      author: {
        id: author?.id,
        username: author?.username,
        displayName: author?.display_name,
        avatarUrl: author?.avatar_url,
      },
      createdAt: p.created_at,
      weight: {
        weightKg: weightLog?.weight_kg,
        textContent: p.text_content,
        mediaUrls: p.media_urls,
      },
      likeCount: p.like_count || 0,
      commentCount: p.comment_count || 0,
    };
  });

  // Combine and sort all feed items
  const activityFeed = [
    ...workoutFeedItems,
    ...mealFeedItems,
    ...weightFeedItems,
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   .slice(0, 20);

  // Recent workouts for dashboard (user's own)
  const userWorkouts = workoutFeedItems
    .filter(w => w.userId === user.id)
    .slice(0, 5)
    .map(w => w.workout);

  return (
    <AccountClient
      user={user}
      profile={profile}
      deletionRequest={deletionRequest}
      workouts={userWorkouts}
      todayNutrition={todayNutrition}
      targets={targets}
      foodLogs={foodLogs || []}
      activityFeed={activityFeed}
    />
  );
}
