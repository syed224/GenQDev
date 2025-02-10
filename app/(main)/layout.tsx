import { MobileSidebar } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { DarkModeProvider } from "@/components/DarkModeContext";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <MobileSidebar />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:ml-[256px] h-full pt-12 lg:pt-0">
        <section className="h-full max-w-[1056px] pt-6 mx-auto">
          {children}
        </section>
      </main>

      <section className="fixed bottom-6 right-5 block lg:hidden">
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </section>
    </DarkModeProvider>
  );
};

export default MainLayout;
