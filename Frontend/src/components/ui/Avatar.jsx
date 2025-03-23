
import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  text,
  status,
  className = '' 
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl'
  };
  
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  const statusStyles = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizeStyles[size]} rounded-full overflow-hidden flex items-center justify-center bg-primary/10 border border-primary/20`}>
        {src ? (
          <img 
            src={src} 
            alt={alt || 'Avatar'} 
            className="w-full h-full object-cover"
          />
        ) : text ? (
          <span className="font-medium text-primary">
            {getInitials(text)}
          </span>
        ) : (
          <User className="text-gray-400 w-1/2 h-1/2" />
        )}
      </div>
      
      {status && (
        <span className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-900 ${statusStyles[status]}`} style={{ width: size === 'xs' ? '6px' : size === 'sm' ? '8px' : '10px', height: size === 'xs' ? '6px' : size === 'sm' ? '8px' : '10px' }}></span>
      )}
    </div>
  );
};

export default Avatar;
