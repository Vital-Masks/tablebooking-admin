import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/store';
import { menuItems } from '@/constants/routeConfig';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toggleSidebar } from '@/store/themeSlice';

import Profile from '../Elements/Profile';
import SidebarHead from './SidebarHead';
import MenuItem from './MenuItem';

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

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
          <SidebarHead />

          <div className="relative px-2">
            <ul>
              {menuItems.map(({ id, childItems, Icon, title, route }) => (
                <li key={id} className="menu nav-item">
                  <MenuItem
                    id={id}
                    childItems={childItems}
                    Icon={Icon}
                    title={title}
                    route={route}
                  />
                </li>
              ))}
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
