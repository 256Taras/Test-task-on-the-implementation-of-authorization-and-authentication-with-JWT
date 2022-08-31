exports.up = (pgm) => {
  pgm.sql(`
    ALTER TABLE "user_refresh_token"
    ADD COLUMN  "user_id" UUID REFERENCES "user"(id) ON DELETE CASCADE;
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
   ALTER TABLE "user_refresh_token"
   DROP COLUMN "user_id";
    `);
};
