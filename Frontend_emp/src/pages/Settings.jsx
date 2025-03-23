
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/actions/uiActions';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Sun, Moon, Monitor } from 'lucide-react';

const Settings = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.ui);
  
  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };
  
  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your application preferences
        </p>
      </div>
      
      <Card className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
                    ${theme === option.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }
                  `}
                >
                  <Icon className={`w-6 h-6 mb-2 ${theme === option.value ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`} />
                  <span className={theme === option.value ? 'font-medium text-primary' : 'text-gray-700 dark:text-gray-300'}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
