import Image from "next/image";
import Link from "next/link";

import { sidebarItems } from "@/constants";
import { cn } from "@/lib/utils";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { SidebarItem } from "./SidebarItem";
import { buttonVariants } from "./ui/button";
import { Loader } from "lucide-react";
import { isAdmin } from "@/lib/admin";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => (
  <aside
    className={cn(
      "h-full lg:w-[256px] lg:fixed bg-gradient-to-b from-darkblue to-skyblue  flex left-0 top-0 px-4 border-r-2 flex-col",
      className
    )}
  >
    <Link href="/">
      {/* old size for the image width={190} height={190} */}
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
        <Image
          src="/newgenq.png"
          priority
          alt="genq"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          GenQ
        </h1> 
      </div>
    </Link>

    <div className="flex flex-col gap-y-2 flex-1">
      {sidebarItems.map((item) => (
        <SidebarItem
          label={item.label}
          href={item.link}
          iconSrc={item.iconSrc}
          key={item.label}
        />
      ))}

      {isAdmin() && (
        <SidebarItem label="Admin console" href="/admin" iconSrc="/boy.svg" />
      )}
      {/* <DownloadAppButton /> */}
    </div>

    {/*  <div className="py-4 px-2 flex justify-between items-center">
      <ClerkLoading>
        <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
      </ClerkLoading>

      <ClerkLoaded>
        <div className="relative flex h-[60px] items-center sm:max-lg:justify-center lg:block">
          <UserButton
            appearance={{
              elements: {
                rootBox: "w-full sm:max-lg:w-auto",
                userButtonAvatarBox: "size-10",
                userButtonTrigger: cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full h-auto justify-start py-2 px-4 sm:max-lg:w-auto sm:max-lg:px-2"
                ),
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
        <span className="pointer-events-none absolute ml-20 font-bold uppercase sm:max-lg:sr-only">
          My Profile
        </span>
        <DownloadAppButton />
      </ClerkLoaded>
    </div> */}

    <div className="hidden lg:block">
      <div className="relative flex h-[60px] mb-5 items-center sm:max-lg:justify-center">
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: {
                rootBox: "w-full sm:max-lg:w-auto",
                userButtonAvatarBox: "size-10",
                userButtonTrigger: cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full h-auto justify-start py-2 px-4 sm:max-lg:w-auto sm:max-lg:px-2 "
                ),
              },
            }}
          />
        </ClerkLoaded>
        <span className="pointer-events-none text-slate-500 absolute ml-20 font-bold uppercase sm:max-lg:sr-only">
          My Profile
        </span>
      </div>
    </div>

    <div className="flex flex-col text-slate-50 items-center max-[380px]:text-xs text-sm lg:text-xs mb-4 pt-4 border-t-2">
      <p className="whitespace-nowrap justify-center flex items-center gap-1">
        Made with
        <Image
          src="/heart.svg"
          alt="Love"
          height={10}
          width={10}
          className="animate-ping inline mx-1"
        />
        by <span className="text-slate-50 font-black">Telaga Biru Digital</span>
      </p>

      <p className="whitespace-nowrap">
        &copy; {new Date().getFullYear()}, All rights reserved.
      </p>
    </div>
  </aside>
);
