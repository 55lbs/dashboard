import { defineMiddleware } from 'astro:middleware';
import { supabase } from '@55lbs/supabase-client';
import micromatch from 'micromatch';

const langMicromatch = '/(en|pt-br)(|/)';
const protectedRoutes = [`${langMicromatch}dashboard(|/)`];
const redirectRoutes = [`${langMicromatch}login(|/)`];
const proptectedAPIRoutes = ['/api/guestbook(|/)'];

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    // console.log({
    //   url: url.pathname,
    //   protectedRoutes: micromatch.isMatch(url.pathname, protectedRoutes),
    //   redirectRoutes: micromatch.isMatch(url.pathname, redirectRoutes),
    //   proptectedAPIRoutes: micromatch.isMatch(
    //     url.pathname,
    //     proptectedAPIRoutes,
    //   ),
    // });

    const lang = locals.paraglide.lang;

    if (micromatch.isMatch(url.pathname, ['/(|/)', langMicromatch])) {
      const accessToken = cookies.get('sb-access-token');
      const refreshToken = cookies.get('sb-refresh-token');

      if (!accessToken || !refreshToken) {
        return redirect(`/${lang}/login`);
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        cookies.delete('sb-access-token', {
          path: '/',
        });
        cookies.delete('sb-refresh-token', {
          path: '/',
        });
        return redirect(`/${lang}/login`);
      }

      return redirect(`/${lang}/dashboard`);
    }

    if (micromatch.isMatch(url.pathname, protectedRoutes)) {
      const accessToken = cookies.get('sb-access-token');
      const refreshToken = cookies.get('sb-refresh-token');

      if (!accessToken || !refreshToken) {
        return redirect(`/${lang}/login`);
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        cookies.delete('sb-access-token', {
          path: '/',
        });
        cookies.delete('sb-refresh-token', {
          path: '/',
        });
        return redirect(`/${lang}/login`);
      }

      locals.email = data.user?.email!;
      cookies.set('sb-access-token', data?.session?.access_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      });
      cookies.set('sb-refresh-token', data?.session?.refresh_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      });
    }

    if (micromatch.isMatch(url.pathname, redirectRoutes)) {
      const accessToken = cookies.get('sb-access-token');
      const refreshToken = cookies.get('sb-refresh-token');

      if (accessToken && refreshToken) {
        return redirect(`/${lang}/dashboard`);
      }
    }

    if (micromatch.isMatch(url.pathname, proptectedAPIRoutes)) {
      const accessToken = cookies.get('sb-access-token');
      const refreshToken = cookies.get('sb-refresh-token');

      // Check for tokens
      if (!accessToken || !refreshToken) {
        return new Response(
          JSON.stringify({
            error: 'Unauthorized',
          }),
          { status: 401 },
        );
      }

      // Verify the tokens
      const { error } = await supabase.auth.setSession({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
      });

      if (error) {
        return new Response(
          JSON.stringify({
            error: 'Unauthorized',
          }),
          { status: 401 },
        );
      }
    }

    return next();
  },
);
