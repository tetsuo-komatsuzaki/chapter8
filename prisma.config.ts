import "dotenv/config";
import { defineConfig, env } from "prisma/config";
console.log("DIRECT_URL (process.env):", process.env.DIRECT_URL);
console.log("DIRECT_URL (env):", env("DIRECT_URL"));

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"), // ここを、DIRECT_URLに変更。
  },
});