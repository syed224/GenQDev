"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDarkMode } from "@/components/DarkModeContext";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ul className="w-full">
      {/* Alphazoo Section */}
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/genq.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-[color:var(--foreground)] text-base lg:text-xl font-bold">
            Alphazoo
          </p>
        </div>
        <Link href="/comingSoon">
          <Button>
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>Coming Soon</p>
            </div>
          </Button>
        </Link>
      </li>

      {/* GENQ AI Section */}
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-[color:var(--foreground)] text-base lg:text-xl font-bold">
            GENQ AI
          </p>
        </div>
        <Link href="/aiquest">
          <Button>
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>Coming Soon</p>
            </div>
          </Button>
        </Link>
      </li>

      {/* Dark Mode Toggle */}
      <li className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image
          src={isDarkMode ? "/darkmode.svg" : "/lightmode.svg"}
          alt="Darkmode"
          width={60}
          height={60}
        />
        <div className="flex-1">
          <p className="text-[color:var(--foreground)] text-base lg:text-xl font-bold">
            DARK MODE
          </p>
        </div>
        <Button onClick={toggleDarkMode}>
          <div className="flex items-center">
            <p>{isDarkMode ? "Disable" : "Enable"} Dark Mode</p>
          </div>
        </Button>
      </li>
    </ul>
  );
};

export default Items;
