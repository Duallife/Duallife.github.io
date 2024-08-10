import React from 'react'
import { generalData } from '@/data/general'
import { contentData } from '@/data/content'
import type { Content } from '@/data/content'

type ContentProps = Content;

const Content: React.FC<ContentProps> = ({ title, items }) => {
  return (
    <section className="my-14 text-sm p-5">
      <h3 className="mb-6">{title}</h3>
      <div className="flex flex-col gap-6 -mb-10">
        {items.map((item, index) => {
          return (
            <div className="flex" key={index}>
              <div className="mr-8 max-w-[100px] w-full text-slate-400 dark:text-slate-400">
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

const Resume = () => {

  return (
    <section id="about" className='pt-5 pb-5'>
      {/* <img
          src={generalData.avatar}
          alt={generalData.name}
          className="w-20 h-20 rounded-full"
        /> */}
      <section className="relative m-5">
        <div className="text-center">
          <h1 className="mb-1 text-4xl text-slate-900 dark:text-slate-100">
            {generalData.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-md">
            {generalData.jobTitle}
          </p>
        </div>
        <button
          className="absolute right-0 top-0 shadow-[inset_0_0_0_1px_#616467] text-black px-4 py-2 rounded-full text-sm tracking-widest uppercase font-bold bg-transparent hover:bg-[#005ab4] hover:text-white dark:text-neutral-200 transition duration-200">
          Download CV
        </button>
      </section>
      <section className="ml-3 my-5 text-sm">
        <h3 className="mb-1 text-slate-900 dark:text-slate-100">About</h3>
        <div className="text-slate-600 dark:text-slate-300">
          <p>{generalData.about}</p>
        </div>
      </section>
      <div className='bg-white dark:bg-slate-900 rounded-lg shadow-md pb-1'>
        {contentData.map((content, index) => {
          return <Content {...content} key={index} />;
        })}
      </div>
      <section className="my-5 text-sm">
        <div className='bg-white dark:bg-slate-900 rounded-lg shadow-md p-5'>
          <h3 className="mb-6">Contact</h3>
          <div className="flex flex-col gap-6">
            {generalData.contacts.map((contact, index) => {
              return (
                <div className="flex" key={index}>
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