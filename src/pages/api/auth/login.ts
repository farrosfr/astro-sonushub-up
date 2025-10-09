import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const token = formData.get('token')?.toString();

  const secretToken = import.meta.env.AUTH_TOKEN;

  if (!secretToken) {
    return new Response("Authentication token not configured on the server.", { status: 500 });
  }

  if (token === secretToken) {
    cookies.set('auth-session', 'user-is-logged-in', {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD, // Only send over HTTPS in production
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });
    return redirect('/');
  } else {
    return redirect('/auth?error=Token yang Anda masukkan salah');
  }
};