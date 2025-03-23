
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setTheme } from '../../store/actions/uiActions';
import { Menu, Search, Bell, Sun, Moon, User, LogOut } from 'lucide-react';
import { logout } from '../../store/actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const toggleThemeMode = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 z-20">
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2"
        >
          <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <div className="relative max-w-md w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-500 dark:placeholder-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleThemeMode}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-1 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
