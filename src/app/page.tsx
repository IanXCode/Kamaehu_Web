import { createClient } from "@/lib/supabase/server";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const supabase = await createClient();

  // Check auth server-side
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url, is_admin')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return <HomeClient initialUser={user} initialProfile={profile} />;
}
