'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiDashboardLine, RiUserLine, RiRoadMapLine, RiTaskLine, RiBookOpenLine } from 'react-icons/ri';

const navItems = [
  { label: 'Dashboard', icon: RiDashboardLine, href: '/intern', exact: true },
  { label: 'Profile', icon: RiUserLine, href: '/intern/profile', exact: true },
  { label: 'Progress', icon: RiRoadMapLine, href: '/intern/progress' },
  { label: 'Routine', icon: RiTaskLine, href: '/intern/routine' },
  { label: 'Resources', icon: RiBookOpenLine, href: '/intern/resources' }
];

const InternSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-10 top-1/2 hidden w-20 -translate-y-1/2 transform flex-col items-center rounded-[30px] border border-slate-200 bg-gray-200/40 px-4 py-8 shadow-lg backdrop-blur lg:flex">
      <nav className="mt-8 flex flex-1 flex-col items-center justify-center gap-5 text-sm font-semibold text-slate-400">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                isActive
                  ? 'border-transparent bg-gradient-to-br from-black to-gray-900 text-white shadow-xl'
                  : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-700'
              }`}
              title={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="text-xl" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default InternSidebar;
