/**
 * Admin Dashboard
 *
 * Analytics dashboard with:
 * - User location data for gym placement decisions
 * - Exercise management (view, edit, make official, delete)
 * - Barcode product management (view, edit, verify, delete)
 * - Reports management (view, action user & post reports)
 *
 * Protected page - requires authentication via is_admin flag in profiles.
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/sign-in');
  }

  // Check if user is admin from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/');
  }

  // Fetch user location data (including premium status)
  const { data: locations, error: locationsError } = await supabase
    .from('profiles')
    .select('id, username, display_name, initial_latitude, initial_longitude, location_city, location_region, location_country, location_captured_at, is_premium, created_at')
    .not('initial_latitude', 'is', null)
    .not('initial_longitude', 'is', null)
    .eq('is_onboarded', true)
    .order('location_captured_at', { ascending: false });

  if (locationsError) {
    console.error('Error fetching locations:', locationsError);
  }

  // Fetch total user stats
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_onboarded', true);

  const { count: usersWithLocation } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_onboarded', true)
    .not('initial_latitude', 'is', null);

  const { count: premiumUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_onboarded', true)
    .eq('is_premium', true);

  // Fetch exercises with creator info
  const { data: exercises, error: exercisesError } = await supabase
    .from('exercises')
    .select(`
      id,
      name,
      description,
      instructions,
      type,
      equipment,
      is_system,
      is_public,
      created_by,
      thumbnail_url,
      video_url,
      created_at,
      updated_at,
      creator:profiles!created_by(id, username, display_name)
    `)
    .order('created_at', { ascending: false });

  if (exercisesError) {
    console.error('Error fetching exercises:', exercisesError);
  }

  // Exercise stats
  const { count: totalExercises } = await supabase
    .from('exercises')
    .select('*', { count: 'exact', head: true });

  const { count: officialExercises } = await supabase
    .from('exercises')
    .select('*', { count: 'exact', head: true })
    .eq('is_system', true);

  const { count: userExercises } = await supabase
    .from('exercises')
    .select('*', { count: 'exact', head: true })
    .eq('is_system', false);

  // Fetch community barcodes with submitter info
  const { data: barcodes, error: barcodesError } = await supabase
    .from('community_barcodes')
    .select(`
      id,
      barcode,
      barcode_format,
      name,
      brand,
      serving_size,
      serving_unit,
      servings_per_container,
      calories_kcal,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      sugar_g,
      sodium_mg,
      submitted_by,
      photo_url,
      vote_count,
      is_verified,
      verification_threshold,
      created_at,
      updated_at,
      submitter:profiles!submitted_by(id, username, display_name)
    `)
    .order('created_at', { ascending: false });

  if (barcodesError) {
    console.error('Error fetching barcodes:', barcodesError);
  }

  // Barcode stats
  const { count: totalBarcodes } = await supabase
    .from('community_barcodes')
    .select('*', { count: 'exact', head: true });

  const { count: verifiedBarcodes } = await supabase
    .from('community_barcodes')
    .select('*', { count: 'exact', head: true })
    .eq('is_verified', true);

  const { count: pendingBarcodes } = await supabase
    .from('community_barcodes')
    .select('*', { count: 'exact', head: true })
    .eq('is_verified', false);

  // Fetch post reports with reporter and post info
  const { data: postReports, error: postReportsError } = await supabase
    .from('post_reports')
    .select(`
      id,
      reporter_id,
      post_id,
      reason,
      details,
      status,
      reviewed_at,
      reviewed_by,
      created_at,
      reporter:profiles!reporter_id(id, username, display_name, avatar_url),
      post:posts!post_id(
        id,
        caption,
        media_urls,
        author:profiles!user_id(id, username, display_name, avatar_url)
      )
    `)
    .order('created_at', { ascending: false });

  if (postReportsError) {
    console.error('Error fetching post reports:', postReportsError);
  }

  // Fetch user reports with reporter and reported user info
  const { data: userReports, error: userReportsError } = await supabase
    .from('user_reports')
    .select(`
      id,
      reporter_id,
      reported_user_id,
      reason,
      details,
      status,
      reviewed_at,
      reviewed_by,
      created_at,
      reporter:profiles!reporter_id(id, username, display_name, avatar_url),
      reported_user:profiles!reported_user_id(id, username, display_name, avatar_url)
    `)
    .order('created_at', { ascending: false });

  if (userReportsError) {
    console.error('Error fetching user reports:', userReportsError);
  }

  // Report stats
  const { count: totalPostReports } = await supabase
    .from('post_reports')
    .select('*', { count: 'exact', head: true });

  const { count: pendingPostReports } = await supabase
    .from('post_reports')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: totalUserReports } = await supabase
    .from('user_reports')
    .select('*', { count: 'exact', head: true });

  const { count: pendingUserReports } = await supabase
    .from('user_reports')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Format locations for the map
  const mapLocations = (locations || []).map((loc: any) => ({
    id: loc.id,
    username: loc.username || 'Unknown',
    displayName: loc.display_name,
    latitude: parseFloat(loc.initial_latitude),
    longitude: parseFloat(loc.initial_longitude),
    city: loc.location_city,
    region: loc.location_region,
    country: loc.location_country,
    capturedAt: loc.location_captured_at,
    isPremium: loc.is_premium || false,
    createdAt: loc.created_at,
  }));

  return (
    <AdminDashboard
      user={user}
      profile={profile}
      locations={mapLocations}
      totalUsers={totalUsers || 0}
      usersWithLocation={usersWithLocation || 0}
      premiumUsers={premiumUsers || 0}
      exercises={(exercises || []) as any}
      exerciseStats={{
        total: totalExercises || 0,
        official: officialExercises || 0,
        userCreated: userExercises || 0,
      }}
      barcodes={(barcodes || []) as any}
      barcodeStats={{
        total: totalBarcodes || 0,
        verified: verifiedBarcodes || 0,
        pending: pendingBarcodes || 0,
      }}
      postReports={(postReports || []) as any}
      userReports={(userReports || []) as any}
      reportStats={{
        totalPostReports: totalPostReports || 0,
        pendingPostReports: pendingPostReports || 0,
        totalUserReports: totalUserReports || 0,
        pendingUserReports: pendingUserReports || 0,
      }}
    />
  );
}
