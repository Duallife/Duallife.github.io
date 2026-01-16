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

export const generalData: GeneralData = {
    name: "Ricky Tse",
    avatar: "./vercel.svg",
    jobTitle: "Mechanical Engineer",
    website: "https://duallife.github.io/",
    about:
        `Hi, I'm Ricky, a Mechanical Engineer from Hong Kong. I'm currently work as a mechanical engineer in insta360. 
        I've graduated from Columbia University with a Master's degree in Mechanical Engineering. 
        My expertise includes CAD, mechanical design, FEA. I'm also proficient in electronics, PCB design, control algorithms and robotics. `,
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
            "Ansys - Static & Modal Analysis",
        ],
        product: [
            "Blender",
            "Keyshot",
        ],
        programming: [
            "Python C++ Javascript",
            "ROS2",
            "ReactJs",
            "Computer vision and Path finding"
        ],
        electronic: [
            "PCB Design (Altium, KiCad)",
            "Embedded System progamming (STM32, ESP32)",
            "Power system design"
        ],
        languages: [
            "English (Professional)",
            "Mandarin (Native)",
            "Cantonese (Native)",
        ]
    },
    contacts: [
        {
            label: "Email",
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
            value: "Yui Kai (Ricky) Tse",
            href: "https://www.linkedin.com/in/yui-kai-tse-499029231/",
            icon: "linkedin",
        },
        {
            label: "Bilibili",
            value: "三柒加一",
            href: "https://space.bilibili.com/8533793",
            icon: "bilibili",
        },
    ],
};