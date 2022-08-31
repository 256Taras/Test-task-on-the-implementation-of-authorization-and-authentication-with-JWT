exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "user_refresh_token" (
    "id" UUID PRIMARY KEY,
    "ppid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS "user_refresh_token";
    `);
};
