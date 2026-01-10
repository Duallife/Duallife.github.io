export const contentData = [
  {
    title: "Education",
    items: [
      {
        title: "Columbia University",
        subTitle: "M.S. - Mechanical Engineering",
        date: "Sept 2024 - May 2025",
        description: `• Courseworks: Robotics, Control, Kinematics, Human centered design`,
      },
      {
        title: "The Hong Kong University of Science and Technology",
        subTitle: "BSc - Integrative System and Design",
        date: "Sept 2020 - Jun 2024",
        description: `• Scholarships: Chinachem Promovership Scholarships, ROA scholarship
                      • Courseworks: CAD, FEA, Static and Dynamic, Mechatronic, Product design, Programming, Mechanical system, Fluid Mechanics`,
      },
      {
        title: "Affiliate Mechanical Engineering",
        subTitle: "University College London",
        date: "Sept 2022 - Jun 2023",
        description: `• Courseworks: Materials, Mechatronic control system, Robotics, Hydrodynamics, Biomechanics.`,
      },
    ],
  },
  {
    title: "Work Experience",
    items: [
      {
        title: "Insta 360",
        subTitle: "Mechanical Engineer",
        date: "Jul 2025 - Now",
      },
      {
        title: "Pointfit Tech Ltd",
        subTitle: "Product design engineer",
        date: "Jun 2022 - Now",
        description: `• Responsible for designing & prototyping a portable biomarker detection device, material selection & testing. UX design.
                      • Device prototyping, BOM creation, device testing, Prototype showcasing, and conducting testing with HK PolyU.
                      • Engaged in presentations to clients(ASICS, Nike, Adidas, HK Government, HK PolyU, etc).
                      • Crowned as Grand Winner Prize of ASICS accelerator 3.0 with the newly designed product.`,
      },
      {
        title: "Columbia University - Musculoskeletal Biomechanics Lab",
        subTitle: "Research Assistant",
        date: "Oct 2024 - May 2025",
        description: `• Human joint friction tester research assistant`,
      },
      {
        title: "Apple Inc",
        subTitle: "iPhone Product design intern",
        date: "Jul 2023 - Oct 2023",
        description: `• Responsible for investigating assembly issues for mass production (iPhone), and on-site work in the Foxconn factory.
                      • Finish a side project, programmed an app for pre-production inspection for design risks for iPhone.
                      • Participate in fixture & housing design, aim improving overall production quality and yield.
                      • Responsible for mass production assembly adjustment of a part, FR rate drop from >7% to <2%.
                      • Inspect design & assembly issues using various inspection methods (CT, X-ray, force test, etc).`,
      },
      {
        title: "The Hong Kong University of Science and Technology - ISD",
        subTitle: "Research Assistant",
        date: "Jun 2021 - Jun 2022",
        description: `• Responsible for the mechatronic design of a self-automated fishery platform for barnacle agriculturing.
                      • Research & test on material for mechanical property under harsh environment (sea condition).
                      • Engage in design, assembly, control system programming, and prototype testing of the automated platform.`,
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        title: "F.I.R.S (Facade Installation Robotic System)",
        date: "Sept 2024 - May 2024",
        description: `• Responsible for the mechanical design and firmware of the robot and outer wall structure.
                      • Utilizing facade climbing robot to install solar panels on facade, reducing risks of working at height.
                      • Engineering Innovation Challenge (Singapore) champion. Hong Kong ASMPT bronze award. HKSTP Inccubation Program.`,
        href: "https://ssac-dev.hkust.edu.hk/facade-installation-robotic-system-firs",
        website: "F.I.R.S Project Website (HKUST)",
      },
      {
        title: "Ultra Low Cost 6-DOF Robotic Arm",
        date: "Now 2024 - June 2024",
        description: `• Overall design of the 6-Axis robot arm from top to bottom, with three different inhouse 3dprinted cycloid gearbox.
                      • Full development of algorithm, with front and inverse kinematic and Screen UI for embedded system. Controllable with ROS2.
                      • Open loop motor design taking reference from 3D printer to reduce cost. High percentage of waterjet to avoid CNC parts.`,
        href: "https://github.com/Duallife/Six_Dof_Arm",
        website: "6Dof Arm Github Repository",
      },
    ],
  },
  // {
  //   title: "Skills",
  //   items: [
  //     {
  //       description: `• Responsible for the mechanical design and firmware of the robot and outer wall structure.
  //                     • Utilizing facade climbing robot to install solar panels on facade, reducing risks of working at height.
  //                     • Engineering Innovation Challenge (Singapore) champion. Hong Kong ASMPT bronze award. HKSTP Inccubation Program.`,
  //     },
  //   ],
  // },
];

export type Content = {
  title: string;
  items: {
    title?: string;
    subTitle?: string;
    date?: string;
    description?: string;
    href?: string;
    website?: string;
  }[];
};

export type ContentData = Content[];