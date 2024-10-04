import { messages as m } from '@55lbs/i18n';
import { supabase } from '@55lbs/supabase-client';

export async function getHeaderInfos() {
  const session = (await supabase.auth.getSession()).data.session;

  function getGretting() {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      return m.goodMorning();
    } else if (hour < 18) {
      return m.goodAfternoon();
    }

    return m.goodEvening();
  }

  const greeting = getGretting();

  const avatar = session?.user.user_metadata.avatar_url;
  const name = session?.user.user_metadata.name;

  return {
    greeting,
    avatar,
    name,
  };
}
