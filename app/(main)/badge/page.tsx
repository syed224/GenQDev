"use client"; // ✅ Ensure this is here

import BadgeItems from "./components/BadgeItems";
import Image from "next/image";
import { useState, useEffect } from "react";
import { checkAndAwardBadges } from "@/actions/badgeProgress";

const BadgePage = () => {
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    // Fetch the latest completed lessons count
    const fetchLessonData = async () => {
      try {
        const lessons = await checkAndAwardBadges(completedLessons);
        setCompletedLessons(lessons.length);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessonData();
  }, []);

  return (
    <main className="flex flex-col items-center gap-8 px-6 py-8">
      {/* 🏆 Add Trophy Icon */}
      <Image
        src="/trophy.svg"
        alt="Achievements Trophy"
        height={90}
        width={90}
      />
      <h1 className="text-center font-bold text-[color:var(--foreground)] text-2xl">
        Your Achievements
      </h1>
      <p className="text-muted-foreground text-center text-lg mb-4">
        You've made great progress! Check out your badges.
      </p>

      {/* ✅ Pass completedLessons prop */}
      <BadgeItems completedLessons={completedLessons} />
    </main>
  );
};

export default BadgePage;
