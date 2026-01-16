import React from 'react'
import { BentoGrid, BentoGridItem } from './bento-grid'
import { gridItemsCN } from '@/data/index_cn'

const GridCN = () => {
  return (
    <section className="pt-2" id="projects">
      <div className="text-center">
        <h1 className="mb-10 text-4xl text-slate-900 dark:text-slate-100 font-bold">
          项目
        </h1>
        <BentoGrid>
          {gridItemsCN.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={item.id}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              website={item.website}
              hoverEffect={item.hoverEffect}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}

export default GridCN 