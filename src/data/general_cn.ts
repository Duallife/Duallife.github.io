export type Skills = {
    cad: string[];
    dataAnalysis: string[];
    product: string[];
    programming: string[];
    electronic: string[];
    languages: string[];
};

export type Contact = {
    label: string;
    value: string;
    href: string;
    icon: string;
};

export type GeneralData = {
    name: string;
    avatar: string;
    jobTitle: string;
    website: string;
    about: string;
    skills: Skills;
    contacts: Contact[];
};

export const generalDataCN: GeneralData = {
    name: "谢睿楷",
    avatar: "./vercel.svg",
    jobTitle: "机械工程师",
    website: "https://duallife.github.io/",
    about:
        `你好，我是谢睿楷，来自香港的机械工程师，于哥伦比亚大学研究生毕业，现正就职于影石insta360担任结构工程师一职。
        我的专长包括CAD、结构设计、有限元分析，同时我也了解电路，PCB设计和以及控制算法和机器人学。`,
    skills: {
        cad: [
            "Solidworks",
            "UG",
            "Creo",
            "Fusion360",
            "Rhino",
        ],
        dataAnalysis: [
            "MATLAB",
            "Simulink",
            "Ansys - 静态和模态分析",
        ],
        product: [
            "Blender",
            "Keyshot",
        ],
        programming: [
            "Python C++ Javascript",
            "ROS2",
            "ReactJs",
            "计算机视觉和路径规划"
        ],
        electronic: [
            "PCB设计 (Altium, KiCad)",
            "嵌入式系统编程 (STM32, ESP32)",
            "电源系统设计"
        ],
        languages: [
            "英语 (专业)",
            "普通话 (母语)",
            "粤语 (母语)",
        ]
    },
    contacts: [
        {
            label: "邮箱",
            value: "ricky.t2738@gmail.com",
            href: "mailto:ricky.t2738@gmail.com",
            icon: "mail",
        },
        {
            label: "Github",
            value: "Duallife",
            href: "https://github.com/Duallife",
            icon: "github",
        },
        {
            label: "Linkedin",
            value: "谢睿楷 (Ricky) Tse",
            href: "https://www.linkedin.com/in/yui-kai-tse-499029231/",
            icon: "linkedin",
        },
        {
            label: "哔哩哔哩",
            value: "三柒加一",
            href: "https://space.bilibili.com/8533793",
            icon: "bilibili",
        },
    ],
}; 