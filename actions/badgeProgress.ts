"use server";

import db from "@/db/drizzle";
import { badges, userBadges, userProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Check and award badges based on completed lessons
export const checkAndAwardBadges = async (completedLessons: number) => {
  const { userId } = auth();
  if (!userId) return [];

  const availableBadges = await db.select().from(badges);
  const earnedBadges: number[] = [];

  for (const badge of availableBadges) {
    if (completedLessons >= badge.requiredLessons) {
      // Check if badge is already earned
      const existingBadge = await db
        .select()
        .from(userBadges)
        .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeId, badge.id)));

      if (existingBadge.length === 0) {
        // Award the badge
        await db.insert(userBadges).values({
          userId,
          badgeId: badge.id,
        });
        earnedBadges.push(badge.id);
      }
    }
  }

  return earnedBadges;
};

// Fetch badges and include the earned status
export const getUserBadges = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const allBadges = await db.select().from(badges);
  const earnedBadges = await db
    .select()
    .from(userBadges)
    .where(eq(userBadges.userId, userId));

  return allBadges.map((badge) => ({
    ...badge,
    isEarned: earnedBadges.some((eb) => eb.badgeId === badge.id), // Check if badge is earned
  }));
};
