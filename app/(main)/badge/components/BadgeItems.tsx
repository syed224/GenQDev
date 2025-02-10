"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserBadges } from "@/actions/badgeProgress";

type Badge = {
  id: number;
  name: string;
  description: string | null;
  requiredLessons: number;
  imageUrl: string;
};

const BadgeItems = ({ completedLessons }: { completedLessons: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<number[]>([]);
  const router = useRouter();

  const predefinedBadges: Badge[] = [
    {
      id: 1,
      name: "Newcomer Badge",
      description: "Earn this by completing 3 lessons",
      requiredLessons: 3,
      imageUrl: "/new-badge.svg"
    },
    {
      id: 2,
      name: "Rising Star Badge", 
      description: "Earn this by completing 10 lessons",
      requiredLessons: 10,
      imageUrl: "/risingstar-badge.svg"
    },
    {
      id: 3,
      name: "100 ???", 
      description: "Earn this by completing 100 lessons",
      requiredLessons: 100,
      imageUrl: "/moving.gif"
    }
  ];

  useEffect(() => {
    const fetchEarnedBadges = async () => {
      try {
        const userBadges = await getUserBadges();
        console.log("User Badges Data:", userBadges); // Check what we get from the backend

        // Ensure `userBadges` is an array before mapping
        if (!Array.isArray(userBadges)) {
          console.error("Expected userBadges to be an array, but got:", userBadges);
          return;
        }

        // Filter and map badge IDs
        const earnedBadgeIds = userBadges
          .filter((ub) => typeof ub.id === "number") // Ensure valid badge id
          .map((ub) => ub.id);

        console.log("Earned Badge IDs:", earnedBadgeIds); // Log earned badges
        setEarnedBadges(earnedBadgeIds);
      } catch (error) {
        console.error("Failed to fetch badges", error);
      }
    };

    fetchEarnedBadges();
  }, [completedLessons]);

  useEffect(() => {
    console.log("Completed Lessons:", completedLessons); // Log completed lessons
  }, [completedLessons]);

  const handleBadgeClick = (badge: Badge) => {
    // Log badge required lessons and current completed lessons for debugging
    console.log(`Checking badge: ${badge.name} (required: ${badge.requiredLessons}, completed: ${completedLessons})`);

    if (completedLessons >= badge.requiredLessons) {
      setSelectedBadge(badge);
      setIsModalOpen(true);
    } else {
      router.push("/learn");
    }
  };

  return (
    <div>
      <ul className="w-full">
        {predefinedBadges.map((badge) => {
          const isBadgeEarned = earnedBadges.includes(badge.id);
          console.log(`Badge Earned Check: ${badge.name} isEarned: ${isBadgeEarned}`); // Check if badge is earned

          return (
            <li
              key={badge.id}
              className="flex items-center w-full p-4 gap-x-4 border-t-2"
            >
              <Image
                src={badge.imageUrl}
                alt={badge.name}
                width={60}
                height={60}
                className={isBadgeEarned ? "opacity-100" : "opacity-20"}
              />
              <div className="flex-1">
                <p className="text-[color:var(--foreground)] text-base lg:text-xl font-bold">
                  {badge.name}
                </p>
                <p className="text-muted-foreground text-lg">
                  {badge.description}
                </p>
              </div>
              <button
                onClick={() => handleBadgeClick(badge)}
                disabled={isBadgeEarned}
                className={`${
                  isBadgeEarned ? "bg-green-500" : "bg-gray-300"
                } text-white p-2 rounded`}
              >
                {isBadgeEarned ? "Badge Earned" : "Complete Lessons"}
              </button>
            </li>
          );
        })}
      </ul>

      {isModalOpen && selectedBadge && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold text-center">{selectedBadge.name}</h2>
            <Image
              src={selectedBadge.imageUrl}
              alt={selectedBadge.name}
              width={300}
              height={300}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeItems;
