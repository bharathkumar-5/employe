
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/actions/uiActions';
import { Users, UserPlus, BarChart, Settings, ChevronLeft, LogOut } from 'lucide-react';
import { logout } from '../../store/actions/authActions';

const Sidebar = () => {
  const { sidebarOpen } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/employees', label: 'Employees', icon: Users },
    { path: '/employees/add', label: 'Add Employee', icon: UserPlus },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col h-screen ${sidebarOpen ? 'w-64' : 'w-20'} z-30 fixed lg:relative`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="flex-shrink-0 font-display font-bold text-primary text-xl ml-2">
            {sidebarOpen ? 'EmpRecord' : 'ER'}
          </div>
        </div>
        <button onClick={() => dispatch(toggleSidebar())} className="lg:flex hidden items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${!sidebarOpen && 'rotate-180'}`} />
        </button>
      </div>
      
      <div className="overflow-y-auto py-4 flex flex-col flex-grow">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group hover-scale
                  ${isActive(item.path) 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon className={`${sidebarOpen ? 'mr-3' : 'mx-auto'} h-5 w-5 flex-shrink-0`} />
                <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 ${!sidebarOpen && 'mx-auto'}`}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-medium text-primary">{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="ml-3 flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || 'user@example.com'}
              </div>
            </div>
          )}
          
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="ml-auto p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
