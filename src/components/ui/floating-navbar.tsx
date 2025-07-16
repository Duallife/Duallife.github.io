"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { FaBook } from "react-icons/fa";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -200,
        }}
        animate={{
          y: visible ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 1,
        }}
        className={cn(
          "hidden sm:flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/[0.1] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-7 pl-6 py-4 items-center justify-center space-x-8",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-neutral-50 font-semibold items-center flex space-x-1 lg:hover:text-purple md:hover:text-purple"
            )}
          >
            {navItem.icon === "book" ? (
              <span className="text-xl flex items-center justify-center"><FaBook /></span>
            ) : (
              <>
                <span className="block sm:hidden relative">{navItem.icon}</span>
                <span className="hidden sm:block text-md relative">{navItem.name}</span>
              </>
            )}
          </Link>
        ))}
        <LanguageSwitcher />
      </motion.div>
    </AnimatePresence>
  );
};
