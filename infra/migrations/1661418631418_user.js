exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS "user" (
    "id" UUID PRIMARY KEY,
    "id_type" VARCHAR(60) NOT NULL,
    "password" TEXT NOT NULL,  
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
     UNIQUE("id_type")
);
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS "user";
    `);
};
