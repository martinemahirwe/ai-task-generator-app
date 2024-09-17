import { type Config } from "drizzle-kit";

import { config } from 'dotenv';

config({ path: '.env.local' });

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: ["openai-quiz-app_*"],
} satisfies Config;
