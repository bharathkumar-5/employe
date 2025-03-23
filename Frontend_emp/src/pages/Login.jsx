
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/actions/authActions';
import { Mail, Lock, AlertTriangle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!credentials.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    if (!credentials.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await dispatch(login(credentials));
      } catch (error) {
        // Error is handled in the login action
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold tracking-tight text-gray-900 dark:text-white">
            EmployeeHub
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Efficient Employee Record Management
          </p>
        </div>
        
        <Card glass={true} className="animate-fade-in">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
            />
            
            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Employee Record Management System</p>
            <p className="mt-1">Demo credentials: admin@example.com / password</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
