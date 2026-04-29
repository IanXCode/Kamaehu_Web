/**
 * Account Page - Redirects to Profile
 *
 * The account dashboard functionality has been moved to the profile page.
 * This page redirects users to their own profile.
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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

  // Redirect to user's profile page
  redirect(`/profile/${user.id}`);
}
