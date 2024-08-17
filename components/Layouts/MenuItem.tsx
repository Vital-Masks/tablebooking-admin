'use client';

import Link from 'next/link';
import { IconCaretDown } from '../Icons';
import AnimateHeight from 'react-animate-height';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface ChildMenuItem {
  id: string;
  route: string;
  title: string;
}

interface MenuItemProps {
  id: string;
  route: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }> | ReactNode;
  childItems?: ChildMenuItem[];
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  route,
  title,
  Icon,
  childItems,
}) => {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>('');

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => (oldValue === value ? '' : value));
  };

  const isActive = (path: string) => (path === `/${pathname.split('/').splice(1, 2).join('/')}` ? true : false);

  return (
    <>
      <Link
        href={route}
        className={`nav-link group w-full ${isActive(route) && 'active'}`}
        onClick={() => toggleMenu(id)}
      >
        <div className="flex items-center">
          {typeof Icon === 'function' && (
            <Icon className={`shrink-0 group-hover:!text-primary ${isActive(route) && '!text-primary'} `} />
          )}
          <span className="text-black pl-3">{title}</span>
        </div>

        {childItems && childItems.length > 0 && (
          <div
            className={`transition-transform duration-300 ${
              currentMenu === id ? 'rotate-180' : ''
            }`}
          >
            <IconCaretDown />
          </div>
        )}
      </Link>

      {childItems && childItems.length > 0 && (
        <AnimateHeight duration={300} height={currentMenu === id ? 'auto' : 0}>
          <ul className="text-gray-500 sub-menu">
            {childItems.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.route}
                  onClick={() => toggleMenu(id)}
                  className={isActive(child.route) ? 'active' : ''}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </AnimateHeight>
      )}
    </>
  );
};

export default MenuItem;
