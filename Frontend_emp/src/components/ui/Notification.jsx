
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearNotification } from '../../store/actions/uiActions';
import { X, Check, AlertTriangle, Info } from 'lucide-react';

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  
  const handleClose = () => {
    dispatch(clearNotification());
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-white" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-white" />;
    }
  };
  
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-fade-in">
      <div className={`${getStyles()} rounded-lg shadow-lg overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
            <div className="text-sm font-medium">{message}</div>
          </div>
          <button onClick={handleClose} className="ml-4">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="h-1 bg-white/30">
          <div className="h-full bg-white/60 animate-[shrink_5s_linear]" style={{ animationName: 'shrink', animationDuration: '5s', animationTimingFunction: 'linear', width: '100%', '@keyframes shrink': { '0%': { width: '100%' }, '100%': { width: '0%' } } }}></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
