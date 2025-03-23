
import React, { forwardRef } from 'react';

const TextArea = forwardRef(({ 
  label, 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  disabled = false,
  rows = 3,
  className = '',
  ...props 
}, ref) => {
  const textareaId = `textarea-${name}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={textareaId} 
          className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'} mb-1`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-lg border border-gray-300 dark:border-gray-700 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
          py-2 px-4 text-base
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
          ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
