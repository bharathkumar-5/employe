
import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  className = '',
  icon,
  fullWidth = false,
  isLoading = false,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 hover-scale button-shine";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  const variantStyles = {
    primary: "bg-primary text-white shadow-sm hover:bg-primary/90 focus:ring-primary/50",
    secondary: "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500",
    danger: "bg-red-500 text-white shadow-sm hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white shadow-sm hover:bg-green-600 focus:ring-green-500"
  };
  
  const loadingStyles = isLoading ? "opacity-80 cursor-wait" : "opacity-100";
  const widthStyles = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${loadingStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
    </button>
  );
};

export default Button;
