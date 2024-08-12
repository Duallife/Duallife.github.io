import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'
import { gridItems } from '@/data'

const Grid = () => {
  return (
    <section className="pt-2" id="projects">
      <div className="text-center">
        <h1 className="mb-7 text-4xl text-slate-900 dark:text-slate-100">
          Projects
        </h1>
        <BentoGrid>
            {gridItems.map((item, i) => (
                <BentoGridItem
                    id = {item.id}
                    key = {item.id}
                    title = {item.title}
                    description = {item.description}
                    className={item.className}
                    img={item.img}
                    imgClassName={item.imgClassName}
                    titleClassName={item.titleClassName}
                />
            ))}
        </BentoGrid>
      </div>
    </section>
  )
}

export default Grid