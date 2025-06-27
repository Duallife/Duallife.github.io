export const contentDataCN = [
  {
    title: "教育",
    items: [
      {
        title: "哥伦比亚大学",
        subTitle: "机械工程硕士",
        date: "2024年9月 - 现在",
        description: `• 肌肉骨骼生物力学实验室 - 人体关节摩擦测试仪研究助理
                      • 课程：机器人学、控制理论、运动学、以人为本的设计`,
      },
      {
        title: "香港科技大学",
        subTitle: "综合系统与设计学士",
        date: "2020年9月 - 2024年6月",
        description: `• 奖学金：新世界发展奖学金、ROA奖学金
                      • 课程：CAD、有限元分析、静力学和动力学、机电一体化、产品设计、编程、机械系统、流体力学`,
      },
      {
        title: "机械工程附属课程",
        subTitle: "伦敦大学学院",
        date: "2022年9月 - 2023年6月",
        description: `• 课程：材料学、机电一体化控制系统、机器人学、流体动力学、生物力学。`,
      },
    ],
  },
  {
    title: "工作经验",
    items: [
      {
        title: "Pointfit科技有限公司",
        subTitle: "产品设计工程师",
        date: "2022年6月 - 2025年6月",
        description: `• 负责便携式生物标志物检测设备的设计和原型制作、材料选择和测试。用户体验设计。
                      • 设备原型制作、物料清单创建、设备测试、原型展示，并与香港理工大学进行测试。
                      • 参与向客户展示（ASICS、Nike、Adidas、香港政府、香港理工大学等）。
                      • 凭借新设计的产品获得ASICS加速器3.0大奖。`,
      },
      {
        title: "苹果公司",
        subTitle: "iPhone产品设计实习生",
        date: "2023年7月 - 2023年10月",
        description: `• 负责调查iPhone大规模生产的装配问题，并在富士康工厂进行现场工作。
                      • 完成一个副项目，为iPhone设计风险预生产检查编程了一个应用程序。
                      • 参与夹具和外壳设计，旨在提高整体生产质量和良率。
                      • 负责某个零件的大规模生产装配调整，故障率从>7%降至<2%。
                      • 使用各种检查方法（CT、X射线、力测试等）检查设计和装配问题。`,
      },
      {
        title: "香港科技大学 - ISD",
        subTitle: "研究助理",
        date: "2021年6月 - 2022年6月",
        description: `• 负责自自动化渔业平台用于藤壶养殖的机电一体化设计。
                      • 研究和测试材料在恶劣环境（海洋条件）下的机械性能。
                      • 参与自动化平台的设计、组装、控制系统编程和原型测试。`,
      },
    ],
  },
  {
    title: "项目",
    items: [
      {
        title: "F.I.R.S (外墙安装机器人系统)",
        date: "2024年9月 - 2024年5月",
        description: `• 负责机器人和外墙结构的机械设计和固件。
                      • 利用外墙攀爬机器人安装外墙太阳能板，降低高空作业风险。
                      • 新加坡工程创新挑战赛冠军。香港ASMPT铜奖。香港科技园孵化计划。`,
        href: "https://ssac-dev.hkust.edu.hk/facade-installation-robotic-system-firs",
        website: "F.I.R.S项目网站 (香港科技大学)",
      },
      {
        title: "超低成本6自由度机械臂",
        date: "2024年6月 - 2024年6月",
        description: `• 从头到尾设计6轴机械臂，配备三种不同的内部3D打印摆线减速机。
                      • 完整开发算法，包括正向和逆向运动学以及嵌入式系统屏幕UI。可通过ROS2控制。
                      • 参考3D打印机设计开环电机以降低成本。高比例水刀切割避免CNC零件。`,
        href: "https://github.com/Duallife/Six_Dof_Arm",
        website: "6自由度机械臂Github repo",
      },
    ],
  },
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