import type { APIRoute } from 'astro';
import mysql from 'mysql2/promise';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const dataString = formData.get('data_update')?.toString();

  if (!dataString) {
    return new Response("Data tidak ditemukan", { status: 400 });
  }

  const dataUntukUpdate = JSON.parse(dataString);
  const db = await mysql.createConnection({
      host: import.meta.env.DB_HOST,
      user: import.meta.env.DB_USER,
      password: import.meta.env.DB_PASSWORD,
      database: import.meta.env.DB_NAME,
  });

  try {
    await db.beginTransaction();
    for (const item of dataUntukUpdate) {
      const hargaBaru = item.harga_baru;
      const id = item.id;
      const stock = item.stock;
      const unit = item.unit;
      const min_qty = item.min_qty;

      await db.execute(
        'UPDATE products SET lowest_price = ?, highest_price = ?, stock = ?, unit = ?, min_qty = ? WHERE id = ?',
        [hargaBaru, hargaBaru, stock, unit, min_qty, id]
      );
      await db.execute('UPDATE product_variations SET price = ? WHERE product_id = ?', [hargaBaru, id]);
    }
    await db.commit();
    await db.end();
    return redirect('/selesai'); // Redirect ke halaman sukses
  } catch (error) {
    await db.rollback();
    await db.end();
    console.error(error);
    let errorMessage = "Terjadi galat yang tidak diketahui";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(`Gagal menyimpan data ke database: ${errorMessage}`, { status: 500 });
  }
};