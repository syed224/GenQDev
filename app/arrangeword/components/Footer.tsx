import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { FC } from "react";


interface FooterProps {
  onCheck: () => void;
  onReset: () => void;
  onChangeWord: () => void;
  status: "none" | "wrong" | "correct";
  disabledCheck: boolean;
  disabledReset: boolean;
}

const Footer: FC<FooterProps> = ({
  onCheck,
  onReset,
  onChangeWord,
  status,
  disabledCheck,
  disabledReset,
}) => {
  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 w-full border-t-2 bg-white dark:bg-[#404040] text-white dark:text-black py-6 px-4 z-10 rounded-lg ",
        status === "correct" && "bg-green-100",
        status === "wrong" && "bg-red-100",
      )}
    >
      {/* Force row layout for both mobile & desktop */}
      <div className="max-w-[1140px] mx-auto flex flex-row justify-between items-center">
        {/* Status Message (Always on the left) */}
        <div className="text-left text-sm flex items-center">
          {status === "correct" && (
            <div className="text-green-500 font-bold  sm:text-xl flex items-center">
              <CheckCircle className="size-6 lg:size-10 mr-4" />
              Nicely done!
            </div>
          )}

          {status === "wrong" && (
            <div className="text-rose-500 font-bold  sm:text-xl flex items-center">
              <XCircle className="size-6 lg:size-10 mr-4" />
              Try again. You can do it!
            </div>
          )}
        </div>

        {/* Buttons Section (Always on the right) */}
        <div className="flex items-center">
          <Button
            disabled={disabledCheck}
            onClick={onCheck}
            size="lg"
            variant={status === "wrong" ? "danger" : "secondary"}
          >
            {status === "none" && "Check"}
            {status === "correct" && "Check Again"}
            {status === "wrong" && "Check Again"}
          </Button>
        </div>
      </div>
    </footer>
  );
};

  export default Footer;