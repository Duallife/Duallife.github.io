"use client";
import React from 'react'
import { TextGenerateEffect } from './ui/textGenerateEffect';
import { Spotlight } from './ui/spotlight';
import { generalDataCN } from '@/data/general_cn';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiBilibili } from 'react-icons/si';

const HeroCN = () => {
  return (
    <section id='home' className='h-screen flex flex-col justify-center items-center'>
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="h-[100vh] w-[50vw] top-10 left-full" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className='w-full flex flex-col lg:flex-row justify-between items-stretch '>
        <div className='flex flex-col justify-center items-center lg:items-start'>
          <TextGenerateEffect
            className='text-4xl lg:text-8xl md:text-8xl sm:text-4xl font-bold text-white text-center lg:text-start'
            words='谢睿楷'
          />
          <TextGenerateEffect
            className='uppercase tracking-widest font-light text-lg -mt-8 text-center lg:text-start'
            words="欢迎 来到 我的 个人网站"
          />

          <motion.div
            className="flex mt-6 space-x-4 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <a href="mailto:ricky.t2738@gmail.com" aria-label="Email" className="text-white hover:text-[#005ab4] transition-colors">
              <FaEnvelope className="w-6 h-6" />
            </a>
            <a href="https://github.com/Duallife" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white hover:text-[#005ab4] transition-colors">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/yui-kai-tse-499029231/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-[#005ab4] transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://space.bilibili.com/8533793" target="_blank" rel="noopener noreferrer" aria-label="Bilibili" className="text-white hover:text-[#005ab4] transition-colors">
              <SiBilibili className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
        <div className='flex flex-col items-end justify-end lg:w-1/2 p-5'>
          <div className='rounded-lg p-5 mt-3'>
            <motion.p
              className='text-sm text-center lg:text-end text-white font-light'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {generalDataCN.about}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCN; 