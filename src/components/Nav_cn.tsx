import React from 'react'
import { FloatingNav } from './ui/floating-navbar'
import { navItemsCN } from '@/data/index_cn'

const NavCN = () => {
  return (
    <div>
      <FloatingNav navItems={navItemsCN} />
    </div>
  )
}

export default NavCN 