import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Resume from "@/components/Resume";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BoxesCore } from "@/components/ui/background-boxes";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto
    sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <BackgroundBeams className="h-screen"/>
        {/* <BoxesCore className="h-screen absolute z-10000" /> */}
        <Nav />
        <Hero />
        <Grid />
        <Resume />
      </div>
    </main>
  );
}
