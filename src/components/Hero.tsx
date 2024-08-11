import React from 'react'
import { TextGenerateEffect } from './ui/textGenerateEffect';

const Hero = () => {
  return (
    <section id='home' className='h-screen flex flex-col justify-center items-center'>
        <div className='text-center'>
          <TextGenerateEffect
            className='text-center text-6xl font-bold text-white'
            words='Welcome to PROFO'
          />
        </div>
        <div className='h-100 w-full dark:bg-black-100 mt-5'>
          <div className='flex justify-center'>
            <div className='max-w-[89vw] flex flex-col items-center justify-center'>
              <TextGenerateEffect
                className='uppercase tracking-widest text-xs text-center'
                words='dynamic'
              />
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default Hero;