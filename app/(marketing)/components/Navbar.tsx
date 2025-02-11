import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

const Navbar = () => {
  return (
    <header className="h-20 w-full border-b-2 bg-white border-slate-200 px-4">
      <nav className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          {" "}
          <Image
            src="/newgenq.png"
            priority
            alt="genq"
            width={70}
            height={70}
          />
          {/* If you want to put some key word here please un comment the below line */}
          { <h1 className="text-2xl font-extrabold text-black tracking-wide">
            Gen-Q
          </h1> }
        </div>

        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-10",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              signUpFallbackRedirectUrl="/learn"
              fallbackRedirectUrl="/learn"
            >
              <Button size="lg" variant="secondary">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </nav>
    </header>
  );
};
export default Navbar;
