import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import Items from "./components/Items";
import { UserProgress } from "@/components/UserProgress";
import { Promo } from "@/components/Promo";
import { Quests } from "@/components/Quests";

export const metadata = {
  title: "GenQ | Shopping page",
  description:
    "Spend your points on cool stuff, or Get pro for unlimited hearts.",
};

const ShopPage = async () => {
  const userProgressPromise = getUserProgress();
  const userSubscriptionPromise = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressPromise,
    userSubscriptionPromise,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <main className="flex gap-12 px-6">
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/shop.svg" alt="Shop" height={90} width={90} />

          <h1 className="text-center font-bold text-[color:var(--foreground)] text-2xl my-6">
            Advance Courses
          </h1>

          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff.
          </p>

          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />

        {!userSubscription?.isActive && <Promo />}

        <Quests points={userProgress.points} />
      </StickyWrapper>
    </main>
  );
};
export default ShopPage;
