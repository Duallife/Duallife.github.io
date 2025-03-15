'use client';

import React from 'react'
import { generalData, type GeneralData, type Skills } from '@/data/general'
import { contentData } from '@/data/content'
import type { Content } from '@/data/content'
import { FaEnvelope, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'
import { SiBilibili } from 'react-icons/si'
import { GanttTimeline } from './ui/gantt-timeline'
import { timelineItems } from '@/data/timeline'
import { motion } from 'framer-motion'

type ContentProps = Content;

const iconMap: { [key: string]: JSX.Element } = {
  mail: <FaEnvelope />,
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  bilibili: <SiBilibili />,
};

const Content: React.FC<ContentProps> = ({ title, items }) => {
  return (
    <section className="my-5 text-sm p-5 pb-8">
      <h3 className="mb-6">{title}</h3>
      <div className="flex flex-col gap-6 -mb-10">
        {items.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <div className="lg:mr-8 md:mr-6 sm:mr-5 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                {item.date}
              </div>
              <div className="flex flex-col flex-1">
                <h4>{item.title}</h4>
                <p className="text-slate-600 dark:text-gray-400">
                  {item.subTitle}
                </p>
                {item.description ? (
                  <p className="text-slate-600 dark:text-gray-400 mt-2">
                    <span className='whitespace-pre-line'>
                      {item.description}
                    </span>
                  </p>
                ) : null}
                {item.href ? (
                  <p className="text-slate-600 dark:text-gray-400 mt-2">
                    <a
                      href={item.href}
                      className="hover:underline inline-flex"
                    >
                      {item.website}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                          className="fill-current text-slate-900 dark:text-slate-100"
                        ></path>
                      </svg>
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

type SkillSectionProps = {
  title: keyof Skills;
  displayTitle: string;
  skills: string[];
};

const SkillSection: React.FC<SkillSectionProps> = ({ displayTitle, skills }) => (
  <div>
    <h4 className="text-sm mb-2">{displayTitle}</h4>
    <ul className="list-disc pl-5 text-slate-600 dark:text-gray-400 space-y-1">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);

const Resume = () => {
  const { skills } = generalData;

  return (
    <section id="resume" className='pt-7'>
      {/* <img
          src={generalData.avatar}
          alt={generalData.name}
          className="w-20 h-20 rounded-full"
        /> */}
      <hr className="border-t-2 border-slate-700 p-5 " />
      <section  className="relative m-5">
        <div className="text-center pb-4">
          <h1 className="mb-3 text-4xl text-slate-900 dark:text-slate-100 font-semibold">
            {generalData.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-md uppercase font-light">
            {generalData.jobTitle}
          </p>
        </div>
        <div className="absolute right-0 top-0 flex md:flex-row flex-col md:space-x-2 space-y-2 md:space-y-0 items-end">
          <a href="./cv_en.pdf" download className="flex justify-end">
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#005ab4] dark:text-white transition duration-200">
              <span className="hidden sm:inline md:inline">English CV</span>
              <span className="sm:hidden">EN</span>
            </button>
          </a>
          <a href="./cv_cn.pdf" download className="flex justify-end">
            <button
              className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full text-xs tracking-widest uppercase font-bold bg-transparent hover:bg-[#005ab4] dark:text-white transition duration-200">
              <span className="hidden sm:inline md:inline">中文简历</span>
              <span className="sm:hidden">中</span>
            </button>
          </a>
        </div>
      </section>
      
      {/* Gantt Timeline */}
      <motion.div 
        className="mb-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl text-center mb-3 text-slate-100">Career Timeline</h2>
        <div className="bg-deepPurple border border-white/[0.1] rounded-2xl shadow-md p-4">
          <GanttTimeline items={timelineItems} />
        </div>
      </motion.div>
      
      {/* <section className="text-sm">
        <div className='bg-white dark:bg-slate-900 rounded-lg shadow-md p-5'>
        <h3 className="mb-1 text-slate-900 dark:text-slate-100">About</h3>
        <div className="text-slate-600 dark:text-slate-300">
          <p>{generalData.about}</p>
        </div>
        </div>
      </section> */}
      <div className='bg-deepPurple border border-white/[0.1] rounded-2xl shadow-md pb-1'>
        {contentData.map((content, index) => {
          return <Content {...content} key={index} />;
        })}
      </div>

      <section className="text-sm mt-5">
        <div className='bg-deepPurple border border-white/[0.1] rounded-2xl shadow-md p-5 mb-5'>
          <h3 className="mb-6">Skills</h3>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
            <SkillSection title="cad" displayTitle="CAD" skills={skills.cad} />
            <SkillSection title="dataAnalysis" displayTitle="Data Analysis" skills={skills.dataAnalysis} />
            <SkillSection title="product" displayTitle="Product" skills={skills.product} />
            <SkillSection title="programming" displayTitle="Programming" skills={skills.programming} />
            <SkillSection title="electronic" displayTitle="Electronic" skills={skills.electronic} />
            <SkillSection title="languages" displayTitle="Languages" skills={skills.languages} />
          </div>
        </div>

        <div className='bg-deepPurple border border-white/[0.1] rounded-2xl shadow-md p-5'>
          <h3 className="mb-6">Contact</h3>
          <div className="flex flex-col gap-6">
            {generalData.contacts.map((contact, index) => {
              return (
                <div className="flex" key={index}>
                  <div className='mr-2 mt-1'>
                    {iconMap[contact.icon]}
                  </div>
                  <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
                    {contact.label}
                  </div>
                  <div className="flex flex-col flex-1 text-slate-900 dark:text-slate-100">
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline inline-flex"
                    >
                      {contact.value}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                          className="fill-current text-slate-900 dark:text-slate-100"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </section>
  )
}

export default Resume