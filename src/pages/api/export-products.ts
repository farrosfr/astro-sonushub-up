import type { APIRoute } from 'astro';
import mysql from 'mysql2/promise';
import Papa from 'papaparse';

// This endpoint exports all products to a CSV file.
export const GET: APIRoute = async () => {
  try {
    const db = await mysql.createConnection({
      host: import.meta.env.DB_HOST,
      user: import.meta.env.DB_USER,
      password: import.meta.env.DB_PASSWORD,
      database: import.meta.env.DB_NAME,
    });

    const [rows]: any[] = await db.execute(
      "SELECT id AS id_produk, name AS nama_produk FROM products ORDER BY name ASC"
    );
    
    await db.end();

    // Convert JSON to CSV
    const csv = Papa.unparse(rows, {
        header: true,
    });

    // Return CSV file as a response
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="daftar_produk_sonushub.csv"',
      },
    });

  } catch (error) {
    console.error(error);
    let message = "Terjadi kesalahan saat mengambil data produk.";
    if (error instanceof Error) {
        message = error.message;
    }
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};