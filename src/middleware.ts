// File: src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Cek jika user mencoba mengakses halaman yang dilindungi (bukan halaman login)
  if (!context.url.pathname.startsWith('/login') && !context.url.pathname.startsWith('/api/auth/login')) {
    // Dapatkan cookie session
    const sessionCookie = context.cookies.get('session-token');

    // Jika tidak ada cookie, tendang ke halaman login
    if (!sessionCookie) {
      return context.redirect('/login');
    }
    
    // Anda bisa menambahkan validasi token di sini jika perlu
    // Untuk saat ini, keberadaan cookie sudah cukup
  }

  // Lanjutkan ke halaman yang diminta jika user sudah login atau sedang di halaman login
  return next();
});