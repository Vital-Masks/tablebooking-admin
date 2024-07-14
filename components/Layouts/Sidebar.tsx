'use client';
import Link from 'next/link';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';

import { IconCaretDown, IconCaretsDown } from '../Icons';
import { menuItems } from '@/constants/routeConfig';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toggleSidebar } from '@/store/themeSlice';
import Profile from '../Elements/Profile';

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const [currentMenu, setCurrentMenu] = useState<string>('');

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  return (
    <div>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 text-white-dark`}
      >
        <div className="h-full bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center main-logo shrink-0">
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                RESERVED
              </span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <div className="relative">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              {menuItems.map(({ id, childItems, Icon, title, route }) =>
                childItems.length > 0 ? (
                  <li key={id} className="menu nav-item">
                    <Link
                      href={route}
                      type="button"
                      className={`nav-link group w-full`}
                      onClick={() => toggleMenu(id)}
                    >
                      <div className="flex items-center">
                        <Icon className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black pl-3">{title}</span>
                      </div>

                      <div
                        className={`transition-transform duration-300 ${
                          currentMenu === id ? 'rotate-180' : ''
                        }`}
                      >
                        <IconCaretDown />
                      </div>
                    </Link>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === id ? 'auto' : 0}
                    >
                      <ul className="text-gray-500 sub-menu">
                        {childItems.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.route}
                              onClick={() => toggleMenu(id)}
                              className={
                                child.route.includes(pathname)  ? 'active' : ''
                              }
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AnimateHeight>
                  </li>
                ) : (
                  <li key={id} className="nav-item">
                    <ul>
                      <li className="nav-item">
                        <Link
                          href={route}
                          className={`${route === pathname && 'active'}  group`}
                        >
                          <div className="flex items-center">
                            <Icon className="shrink-0 group-hover:!text-primary" />
                            <span className="text-black pl-3">{title}</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="border-t mt-auto mb-0 p-4">
            <Profile />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
