import { TimelineItem } from '@/components/ui/gantt-timeline';

export const timelineItems: TimelineItem[] = [
  // Education items
  {
    id: 'hkust',
    title: 'HKUST',
    organization: 'BSc - Integrative System and Design',
    date: 'Sept 2020 - Jun 2024',
    description: '• Scholarships: Chinachem Promovership Scholarships, ROA scholarship.\n• Courseworks: CAD, FEA, Static and Dynamic, Mechatronic, Product design, Programming, Mechanical system, Fluid Mechanics',
    type: 'education'
  },
  {
    id: 'hkust-ra',
    title: 'HKUST - ISD',
    organization: 'Research Assistant',
    date: 'Jun 2021 - Jun 2022',
    description: '• Responsible for the mechatronic design of a self-automated fishery platform for barnacle agriculturing.\n• Research & test on material for mechanical property under harsh environment (sea condition).\n• Engage in design, assembly, control system programming, and prototype testing of the automated platform.',
    type: 'work'
  },
  {
    id: 'pointfit',
    title: 'Pointfit Tech Ltd',
    organization: 'Product design engineer',
    date: 'Jun 2022 - Jun 2025',
    description: '• Responsible for designing & prototyping a portable biomarker detection device, material selection & testing. UX design.\n• Device prototyping, BOM creation, device testing, Prototype showcasing, and conducting testing with HK PolyU.\n• Engaged in presentations to clients(ASICS, Nike, Adidas, HK Government, HK PolyU, etc).\n• Crowned as Grand Winner Prize of ASICS accelerator 3.0 with the newly designed product.',
    type: 'work'
  },
  {
    id: 'apple',
    title: 'Apple Inc',
    organization: 'iPhone Product design intern',
    date: 'Jul 2023 - Oct 2023',
    description: '• Responsible for investigating assembly issues for mass production (iPhone), and on-site work in the Foxconn factory.\n• Finish a side project, programmed an app for pre-production inspection for design risks for iPhone.\n• Participate in fixture & housing design, aim improving overall production quality and yield.\n• Responsible for mass production assembly adjustment of a part, FR rate drop from >7% to <2%.\n• Inspect design & assembly issues using various inspection methods (CT, X-ray, force test, etc).',
    type: 'work'
  },
  {
    id: 'ucl',
    title: 'University College London',
    organization: 'Affiliate Mechanical Engineering',
    date: 'Sept 2022 - Jun 2023',
    description: '• Materials, Mechatronic control system, Robotics, Hydrodynamics, Biomechanics.',
    type: 'education'
  },
  {
    id: 'columbia',
    title: 'Columbia University',
    organization: 'M.S. - Mechanical Engineering',
    date: 'Sept 2024 - Jun 2025',
    description: '• Concentration in Robotics and Control',
    type: 'education'
  },
  {
    id: 'mbl',
    title: 'MBL Lab',
    organization: 'Columbia University - Musculoskeletal Biomechanics Lab',
    date: 'Oct 2024 - Jun 2025',
    description: '• Research assistant for friction tester on human joints',
    type: 'work'
  }
]; 