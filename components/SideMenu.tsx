'use client';

import Link from 'next/link';

export default function SideMenu() {
  const menuItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'articles', label: 'Articles', href: '/articles' },
    { id: 'research', label: 'Research', href: '/research' },
    { id: 'seminars', label: 'Seminars', href: '/seminars' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl px-1 sm:px-2 md:px-4 py-1.5 sm:py-2 md:py-3 w-full max-w-full overflow-x-auto overflow-y-visible">
      
      {/* Menu Items in Horizontal Row - Responsive */}
      <div className="flex justify-center items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 overflow-x-auto scrollbar-hide w-full max-w-full">
        {menuItems.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative block flex-shrink-0"
          >
            <span 
              className="text-white font-medium text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base group-hover:text-blue-200 transition-colors duration-300 px-1 xs:px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded hover:bg-white/10 whitespace-nowrap"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              {item.label}
            </span>
          </Link>
        ))}

        {/* SELPHLYZE Link */}
        <Link
          href="https://www.selphlyze.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block flex-shrink-0"
        >
          <span 
            className="text-white font-medium text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base group-hover:text-blue-200 transition-colors duration-300 px-1 xs:px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded hover:bg-white/10 whitespace-nowrap"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            SELPHLYZE
          </span>
        </Link>

        {/* Rest of menu items */}
        {menuItems.slice(3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative block flex-shrink-0"
          >
            <span 
              className="text-white font-medium text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base group-hover:text-blue-200 transition-colors duration-300 px-1 xs:px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded hover:bg-white/10 whitespace-nowrap"
              style={{ fontFamily: 'Times New Roman, Times, serif' }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
