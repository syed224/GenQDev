import { FC, forwardRef } from "react";
import { X } from "lucide-react";
import { useExitModal } from "@/store/useExitModal";

const Header: FC = () => {
  const { open } = useExitModal(); // Access the open function from the ExitModal state

  return (
    <header className="fixed top-0 lg:pt-[50px] pt-[20px] px-6 sm:px-4 flex gap-x-4 sm:gap-x-2 items-center justify-between max-w-[1140px] mx-auto w-full z-20">
      {/* Exit Icon */}
      <X
        onClick={open} // Trigger the ExitModal to open
        className="text-slate-500 hover:opacity-75 text-xl sm:text-lg transition cursor-pointer justify-self-start"
        aria-label="Exit the lesson"
      />
    </header>
  );
};

export default Header;