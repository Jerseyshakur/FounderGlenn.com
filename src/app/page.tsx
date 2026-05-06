import type { Metadata } from "next";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import HomepageCapture from "@/components/HomepageCapture";

export const metadata: Metadata = {
  title: "HOME",
  description: "Founder Glenn — Author, Physicist, and builder of systems for creators.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-white selection:text-black">
      <ScrollyCanvas />
      <Projects />
      <HomepageCapture />
    </main>
  );
}
