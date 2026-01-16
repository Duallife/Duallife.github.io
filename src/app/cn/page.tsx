import FooterCN from "@/components/Footer_cn";
import GridCN from "@/components/ui/Grid_cn";
import HeroCN from "@/components/Hero_cn";
import NavCN from "@/components/Nav_cn";
import ResumeCN from "@/components/Resume_cn";
import RobotArmShowcase from "@/components/RobotArmShowcase";

export default function HomeCN() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto
    sm:px-10 px-5">
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-black-100 bg-dot-white/[0.3] relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
      </div>
      <div className="max-w-7xl w-full relative z-10">
        <NavCN />
        <HeroCN />
        <GridCN />
        <RobotArmShowcase language="cn" />
        <ResumeCN />
        <FooterCN />
      </div>
    </main>
  );
} 