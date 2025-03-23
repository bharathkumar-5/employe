
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import Notification from '../ui/Notification';
import { checkAuthStatus } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { sidebarOpen, notification, theme } = useSelector(state => state.ui);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dispatch(checkAuthStatus()) && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  if (!isAuthenticated && window.location.pathname !== '/login') {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {notification && <Notification {...notification} />}
      
      {isAuthenticated ? (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
            <Header />
            <main className="flex-1 overflow-auto p-4 md:p-6 transition-all duration-300">
              <div className="container mx-auto page-transition">
                {children}
              </div>
            </main>
          </div>
        </div>
      ) : (
        <main className="flex-1 page-transition">
          {children}
        </main>
      )}
    </div>
  );
};

export default Layout;
