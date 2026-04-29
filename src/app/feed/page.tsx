/**
 * Feed Page
 *
 * Facebook-style activity feed showing workouts, meals, and activity.
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FeedClient from './FeedClient';

export default async function FeedPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/sign-in');
  }

  // Fetch current user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch nutrition targets
  const { data: targets } = await supabase
    .from('calorie_targets')
    .select('target_kcal, protein_g, carbs_g, fat_g')
    .eq('user_id', user.id)
    .single();

  // Fetch today's nutrition summary
  const today = new Date().toISOString().split('T')[0];
  const { data: todayLogs } = await supabase
    .from('food_logs')
    .select('calories_kcal, protein_g, carbs_g, fat_g')
    .eq('user_id', user.id)
    .gte('logged_at', `${today}T00:00:00`)
    .lte('logged_at', `${today}T23:59:59`);

  const todayNutrition = todayLogs?.reduce(
    (acc, log) => ({
      calories: acc.calories + (log.calories_kcal || 0),
      protein: acc.protein + (log.protein_g || 0),
      carbs: acc.carbs + (log.carbs_g || 0),
      fat: acc.fat + (log.fat_g || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  ) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  // Fetch recent workouts (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data: recentWorkouts } = await supabase
    .from('workouts')
    .select('id, name, total_volume_kg, total_sets, pr_count, duration_seconds, ended_at')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .gte('ended_at', weekAgo.toISOString())
    .order('ended_at', { ascending: false })
    .limit(5);

  // Fetch activity feed (posts from followed users and own posts)
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id,
      type,
      user_id,
      created_at,
      like_count,
      comment_count,
      workout:workouts(id, name, total_volume_kg, total_sets, pr_count, duration_seconds),
      meal:food_logs(id, food_name, meal_type, calories_kcal, protein_g, carbs_g, fat_g, photo_url),
      weight:weight_logs(weight_kg, notes),
      author:profiles!posts_user_id_fkey(id, username, display_name, avatar_url)
    `)
    .or(`user_id.eq.${user.id},user_id.in.(select following_id from follows where follower_id = '${user.id}')`)
    .is('archived_at', null)
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <FeedClient
      user={user}
      profile={profile as any}
      targets={targets}
      todayNutrition={todayNutrition}
      recentWorkouts={recentWorkouts || []}
      posts={(posts || []) as any}
    />
  );
}
