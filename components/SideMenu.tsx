'use client';

import Link from 'next/link';

export default function SideMenu() {
  const menuItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'business', label: 'AI Marketing', href: '/business' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'articles', label: 'Articles', href: '/articles' },
    { id: 'research', label: 'Research', href: '/research' },
    { id: 'seminars', label: 'Seminars', href: '/seminars' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="bg-black/40 dark:bg-black/40 backdrop-blur-xl px-2 sm:px-4 py-2 sm:py-3">
      
      {/* Menu Items in Horizontal Row - Responsive */}
      <div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative block flex-shrink-0"
          >
            {/* Simple Text Menu Item - Responsive */}
            <span 
              className="text-black dark:text-white font-medium text-xs sm:text-sm md:text-base group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-300 px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-black/10 dark:hover:bg-white/10 whitespace-nowrap"
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
