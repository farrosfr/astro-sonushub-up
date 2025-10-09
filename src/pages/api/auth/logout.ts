import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('auth-session', { path: '/' });
  return redirect('/auth');
};