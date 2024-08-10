import React from 'react'
import { TextGenerateEffect } from './ui/textGenerateEffect';
import { FloatingNav } from './ui/floating-navbar';

const Hero = () => {
  return (
    <div>
      <div>
        <FloatingNav
          navItems={[
            {
              name: "Home",
              link: "/",
            },
            {
              name: "About",
              link: "/about",
            },
            {
              name: "Contact",
              link: "/contact",
            },
          ]}
          className="top-10"
        />
      </div>
      <div className='pb-20 pt-36'>
        <div className='text-center'>
          <h1 className='text-6xl font-bold text-white'>Welcome to PROFO</h1>
          <h1 className='text-6xl font-bold text-white'>HI</h1>
          <p className='text-xl text-white'>The best platform for your business</p>
          <h2 className='mt-4'> test </h2>
        </div>
      </div>

      <div className='h-300 w-full dark:bg-black-100'>
        <div className='flex justify-center'>
          <div className='max-w-[89vw] flex flex-col items-center
          justify-center'>
            <h1 className='uppercase tracking-widest text-xs
            text center'>
              dynamic
            </h1>
            <TextGenerateEffect
              className='text-center text-2xl font-bold text-white'
              words='Welcome to PROFO'
            />
          </div>
      </div>
    </div>
    </div>
  );
};

export default Hero