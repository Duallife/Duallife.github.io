"use client";
import React from 'react'
import { TextGenerateEffect } from './ui/textGenerateEffect';
import { Spotlight } from './ui/spotlight';
import { generalData } from '@/data/general';
import { motion } from 'framer-motion';


const Hero = () => {
  return (
    <section id='home' className='h-screen flex flex-col justify-center items-center'>
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="h-[100vh] w-[50vw] top-10 left-full" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className='w-full flex flex-col lg:flex-row justify-between items-stretch -mt-5 '>
        <div className='flex flex-col lg:w-1/2 p-5'>
          <TextGenerateEffect
            className='text-4xl lg:text-8xl md:text-8xl sm:text-4xl font-bold text-white text-center lg:text-start'
            words='Welcome'
          />
          <TextGenerateEffect
            className='uppercase tracking-widest font-light text-lg ml-3 -mt-8 text-center lg:text-start'
            words='A personal web by Ricky Tse'
          />
        </div>
        <div className='flex flex-col items-end justify-end lg:w-1/2 p-5'>
          <div className='rounded-lg p-5 mt-3'>
            <motion.p
              className='text-sm text-end lg:text-end sm:text-center md:text-center text-white font-light'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut"}} // Adjust the duration as needed
            >
              {generalData.about}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;