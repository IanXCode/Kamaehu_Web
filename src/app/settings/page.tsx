/**
 * Settings Page
 *
 * User settings and account management.
 */

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/sign-in');
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
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

  return (
    <SettingsClient
      user={user}
      profile={profile}
      deletionRequest={deletionRequest}
    />
  );
}
