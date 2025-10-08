// File: src/pages/api/auth/logout.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Hapus cookie session
  cookies.delete('session-token', {
    path: '/',
  });
  // Arahkan ke halaman login
  return redirect('/login');
};