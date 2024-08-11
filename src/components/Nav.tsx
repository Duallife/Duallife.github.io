import React from 'react'
import { FloatingNav } from './ui/floating-navbar'
import { navItems } from '@/data'

const Nav = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />
    </div>
  )
}

export default Nav