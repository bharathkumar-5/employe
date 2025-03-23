
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  glass = false,
  hover = false,
  padding = true
}) => {
  const baseStyles = "rounded-xl border dark:bg-gray-900 transition-all duration-200";
  const glassStyles = glass ? "glass-card" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800";
  const hoverStyles = hover ? "hover:shadow-md dark:hover:shadow-gray-900/50" : "";
  const paddingStyles = padding ? "p-6" : "";
  
  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${paddingStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
