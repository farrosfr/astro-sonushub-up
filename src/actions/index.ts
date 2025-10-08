// File: src/actions/index.ts
import { defineAction } from 'astro:actions';
import { z } from 'zod'; // <-- PERBAIKAN: Impor 'z' dari 'zod'

// Username & Pass sederhana
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'sonu_updater_2025';

export const server = {
  login: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    // Tipe argumen akan diinferensikan secara otomatis oleh Astro dari 'input' di atas
    handler: async ({ username, password }, { cookies }) => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        cookies.set('session-token', 'user-is-logged-in', {
          path: '/',
          httpOnly: true,
          secure: import.meta.env.PROD,
          maxAge: 60 * 60 * 24, // 1 hari
        });
        return {
          redirect: '/',
        };
      }
      // Jika gagal, kembalikan pesan error
      return { error: 'Username atau Password salah.' };
    },
  }),
};