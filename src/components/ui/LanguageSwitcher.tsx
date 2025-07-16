'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isChinesePage = pathname === '/cn';
  const currentLanguage = isChinesePage ? '中文' : 'EN';

  const toggleLanguage = () => {
    if (isChinesePage) {
      router.push('/');
    } else {
      router.push('/cn');
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative text-neutral-50 font-semibold items-center flex space-x-1 lg:hover:text-purple md:hover:text-purple transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isChinesePage ? "Switch to English" : "切换到中文"}
    >
      <span className="hidden sm:block text-md relative items-center space-x-1">
        <span>CN/EN</span>
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher; 