'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  profile: {
    name: string;
    title: string;
    description: string;
    logo_url: string;
    profile_image_url: string;
  } | null;
}

export default function Header({ profile }: HeaderProps) {
  const [navActive, setNavActive] = useState(false);

  return (
    <header className="fixed top-0 w-full z-1000 backdrop-blur-xl bg-gradient-to-r from-pink-200/92 to-blue-200/92 border-b border-white/30 shadow-lg">
      <div className="container max-w-6xl mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          <Link href="#" className="flex items-center gap-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent transition-transform group-hover:scale-105">
              {profile?.name.split(' ')[0]}
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-pulse shadow-lg" />
          </Link>

          <ul className={`nav-links hidden md:flex list-none gap-0 ${navActive ? 'nav-active' : ''}`}>
            {['Home', 'About', 'Skills', 'Portfolio', 'My Top Edits', 'Contact'].map((item) => (
              <li key={item} className="mx-4">
                <Link
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-blue-900 font-medium text-sm hover:text-purple-700 transition-all duration-300 relative after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-1 after:bg-gradient-to-r after:from-pink-300 after:to-purple-300 after:rounded hover:after:w-full after:transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={`burger md:hidden flex flex-col gap-1.5 cursor-pointer ${navActive ? 'toggle' : ''}`}
            onClick={() => setNavActive(!navActive)}
          >
            <div className="w-6 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transition-all" />
            <div className="w-6 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transition-all" />
            <div className="w-6 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 transition-all" />
          </div>
        </nav>
      </div>
    </header>
  );
}
