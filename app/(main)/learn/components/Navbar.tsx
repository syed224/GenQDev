import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export const Navbar = ({ title }: Props) => {
  return (
    <nav className="sticky top-0 bg-white dark:bg-[#404040] pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-[color:var(--foreground)] lg:z-50">
      <Link href="/courses">
        <Button variant="secondary" size="sm">
          <ChevronLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          <span className="ml-2 ">courses</span>
        </Button>
      </Link>

      <h1 className="text-lg font-bold text-[color:var(--foreground)]">{title}</h1>

      <div />
    </nav>
  );
};
