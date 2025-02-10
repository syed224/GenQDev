import { Metadata } from "next";
import { DarkModeProvider } from "@/components/DarkModeContext";

export const metadata: Metadata = {
  title: "GenQ | ArrangeWord Page",
  description: "Here, you can start your challenges right away!",
};

const LessonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DarkModeProvider>
      <main className="w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-4 py-20 sm:py-16">
        <section className="w-full max-w-7xl">{children}</section>
      </main>
    </DarkModeProvider>
  );
};

export default LessonLayout;
