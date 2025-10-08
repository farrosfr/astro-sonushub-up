// File: src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'jbhbj';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Set cookie jika login berhasil
    cookies.set('session-token', 'user-is-logged-in', {
      path: '/',
      httpOnly: true, // Cookie tidak bisa diakses oleh JavaScript di browser
      secure: import.meta.env.PROD, // Hanya kirim cookie melalui HTTPS di mode produksi
      maxAge: 60 * 60 * 24, // Masa berlaku 1 hari
    });
    // Arahkan ke halaman utama
    return redirect('/');
  }

  // Jika gagal, kembali ke halaman login dengan pesan error
  return redirect('/login?error=Username atau Password salah');
};