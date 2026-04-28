/**
 * Account Page
 *
 * Allows users to manage their account settings.
 * Includes account deletion as required by Apple/Google.
 */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AccountClient from './AccountClient';

export const metadata = {
  title: 'Account Settings | Kamaehu',
  description: 'Manage your Kamaehu account settings',
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
    .select('username, display_name, avatar_url, deleted_at')
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
    <AccountClient
      user={user}
      profile={profile}
      deletionRequest={deletionRequest}
    />
  );
}
