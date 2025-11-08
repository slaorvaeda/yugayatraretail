'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiHomeSmileLine,
  RiShakeHandsLine,
  RiStarSmileFill,
  RiCalendar2Line,
  RiNotification3Line,
  RiFileList2Line,
  RiSettings3Line
} from 'react-icons/ri';

const navItems = [
  { label: 'Home', icon: RiHomeSmileLine, href: '/admin' },
  { label: 'Relationships', icon: RiShakeHandsLine, href: '/admin/relationships' },
  { label: 'Opportunities', icon: RiStarSmileFill, href: '#' },
  { label: 'Calendar', icon: RiCalendar2Line, href: '#' },
  { label: 'Notifications', icon: RiNotification3Line, href: '#' },
  { label: 'Documents', icon: RiFileList2Line, href: '#' },
  { label: 'Settings', icon: RiSettings3Line, href: '#' }
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed left-10 top-1/2 hidden h-[520px] w-20 -translate-y-1/2 flex-col items-center rounded-[30px] border border-slate-200 bg-gray-200/40 px-4 py-10 shadow-[0_40px_80px_-60px_rgba(15,23,42,0.25)] backdrop-blur xl:flex">
      <nav className="flex flex-1 flex-col items-center justify-center gap-5 text-sm font-semibold text-slate-400">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href !== '#' && pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href === '#' ? pathname : item.href}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                isActive
                  ? 'border-transparent bg-gradient-to-br from-black to-gray-900 text-white shadow-xl'
                  : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-700'
              }`}
              title={item.label}
            >
              <Icon className="text-xl" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
