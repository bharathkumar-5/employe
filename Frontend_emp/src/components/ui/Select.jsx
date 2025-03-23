
import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ 
  label, 
  name, 
  options = [], 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  className = '',
  ...props 
}, ref) => {
  const selectId = `select-${name}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={selectId} 
          className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'} mb-1`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`
            w-full rounded-lg border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
            py-2 pl-4 pr-10 appearance-none text-base
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
