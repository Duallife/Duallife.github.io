import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Resume from "@/components/Resume";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto
    sm:px-10 px-5">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-black-100 bg-dot-white/[0.15] relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
      </div>
      <div className="max-w-7xl w-full relative z-10">
        <Nav />
        <Hero />
        <Grid />
        <Resume />
      </div>
    </main>
  );
}
