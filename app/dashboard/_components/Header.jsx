"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((open) => !open)

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className=" bg-secondary shadow-sm ">
      <div className="w-[80%] m-auto flex gap-4 items-center justify-between">
        <Link className="hidden md:block"  href="/dashboard">
          <Image src={logo} width={80} height={80} alt="logo" />
        </Link>
        <ul className="hidden md:flex gap-6">
          <Link href="/dashboard">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard" && "text-black font-bold"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/question">
          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/question" && "text-black font-bold"
            }`}
          >
            Questions
          </li>
          </Link>
          
          <Link href="/dashboard/upgrade">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/upgrade" && "text-black font-bold"
              }`}
            >
              Upgrade
            </li>
          </Link>

          <Link href="/dashboard/howit">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/howit" && "text-black font-bold"
              }`}
            >
              How it works?
            </li>
          </Link>
        </ul>
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="dashboard-mobile-navigation"
            className="rounded-lg border border-foreground/20 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
        <div className="flex gap-10" >
          <ModeToggle  />
          {isUserButtonLoaded ? <UserButton /> : <SkeletonLoader />}
        </div>
      </div>
      {isOpen && (
        <div id="dashboard-mobile-navigation" className="md:hidden">
          <div className="px-5">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3" >
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard" && "text-black font-bold"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <Link href="/dashboard/question" onClick={() => setIsOpen(false)}>
          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/question" && "text-black font-bold"
            }`}
          >
            Questions
          </li>
          </Link>
          <Link href="/dashboard/upgrade" onClick={() => setIsOpen(false)}>
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/upgrade" && "text-black font-bold"
              }`}
            >
              Upgrade
            </li>
          </Link>
          <Link href="/dashboard/howit" onClick={() => setIsOpen(false)}>
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/howit" && "text-black font-bold"
              }`}
            >
              How it works?
            </li>
          </Link>
          </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
