
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Button from './Button';

const FileUpload = ({ 
  label, 
  name, 
  onChange, 
  error, 
  accept = 'image/*', 
  required = false,
  currentImage = null
}) => {
  const [preview, setPreview] = useState(currentImage);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setFileName(file.name);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      
      if (onChange) {
        onChange(file);
      }
    }
  };
  
  const handleReset = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onChange) {
      onChange(null);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      
      if (onChange) {
        onChange(file);
      }
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'} mb-1`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
          ${preview ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
          hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          name={name}
          id={name}
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          ref={fileInputRef}
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto max-h-48 rounded-lg object-contain"
            />
            <Button 
              variant="danger" 
              size="sm" 
              className="absolute top-2 right-2 p-1 h-8 w-8 rounded-full"
              onClick={handleReset}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
              {fileName}
            </p>
          </div>
        ) : (
          <label htmlFor={name} className="cursor-pointer block">
            <div className="flex flex-col items-center justify-center py-6">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
          </label>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
