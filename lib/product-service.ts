import { pool } from "@/lib/db";

export type ProductRecord = {
  name: string;
  unit_price: number;
  sku: string;
};

export async function listProducts(): Promise<ProductRecord[]> {
  const result = await pool.query<ProductRecord>(
    "select name, unit_price, sku from yolanda_gomez.products order by name"
  );

  return result.rows.map((row: ProductRecord) => ({
    ...row,
    unit_price: Number(row.unit_price),
  }));
}
