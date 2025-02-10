import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

import { dataToInsert } from "@/constants";

import { badges } from "@/db/schema";

const initialBadges = [
  {
    name: "Newcomer Badge",
    description: "Earn this by completing 3 lessons",
    requiredLessons: 3,
    imageUrl: "/new-badge.svg"
  },
  {
    name: "Rising Star Badge",
    description: "Earn this by completing 10 lessons",
    requiredLessons: 10,
    imageUrl: "/risingstar-badge.svg"
  }
];

export const seedBadges = async () => {
  for (const badge of initialBadges) {
    await db.insert(badges).values(badge).onConflictDoNothing();
  }
};

seedBadges();

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

(async () => {
  try {
    console.log("Seeding db");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.units);
    await db.delete(schema.lessons);

    await db.insert(schema.courses).values(dataToInsert.languages);

    await db.insert(schema.units).values(dataToInsert.units);

    await db.insert(schema.lessons).values(dataToInsert.lessons);

    await db.insert(schema.challenges).values(dataToInsert.challenges as any);

    await db
      .insert(schema.challengeOptions)
      .values(dataToInsert.challengeOptions);
    
      await db.insert(badges).values([
        {
          name: "Newcomer Badge",
          description: "Complete 3 lessons",
          requiredLessons: 3,
          imageUrl: "/img/icon/newcomer-badge.svg",
        },
        {
          name: "Rising Star Badge",
          description: "Complete 10 lessons",
          requiredLessons: 10,
          imageUrl: "/img/icon/risingstar-badge.svg",
        },
      ]);
        

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
})();
