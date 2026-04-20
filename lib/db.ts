import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

const hasDbParts = Boolean(DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME);
const connectionString = hasDbParts
  ? `postgresql://${encodeURIComponent(DB_USER!)}:${encodeURIComponent(
      DB_PASSWORD!
    )}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
  : DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Configura DATABASE_URL o DB_USER/DB_PASSWORD/DB_HOST/DB_PORT/DB_NAME."
  );
}

const pool =
  global.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export { pool };
