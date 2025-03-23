
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, DollarSign } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import FileUpload from '../ui/FileUpload';
import Button from '../ui/Button';
import Card from '../ui/Card';

const EmployeeForm = ({ 
  onSubmit, 
  initialData = {}, 
  isEditing = false,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'employee',
    salary: '',
    isActive: true,
    profilePicture: null
  });
  
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || '',
        role: initialData.role || 'employee',
        salary: initialData.salary || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        profilePicture: null // The file input will still show the current image preview
      });
    }
  }, [initialData]);
  
  const departmentOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'HR', label: 'HR' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Admin', label: 'Admin' }
  ];
  
  const roleOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Admin' }
  ];
  
  const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleFileChange = (file) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: file
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        salary: Number(formData.salary)
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FileUpload
              label="Profile Picture"
              name="profilePicture"
              onChange={handleFileChange}
              currentImage={initialData.profilePicture}
            />
          </div>
          
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            error={errors.name}
            icon={<User className="w-4 h-4" />}
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            disabled={isEditing} // Email cannot be changed once set
          />
          
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            required
            error={errors.phone}
            icon={<Phone className="w-4 h-4" />}
          />
          
          <Select
            label="Department"
            name="department"
            options={departmentOptions}
            value={formData.department}
            onChange={handleChange}
            required
            error={errors.department}
          />
          
          <Select
            label="Role"
            name="role"
            options={roleOptions}
            value={formData.role}
            onChange={handleChange}
          />
          
          <Input
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="50000"
            required
            error={errors.salary}
            icon={<DollarSign className="w-4 h-4" />}
          />
          
          <Select
            label="Status"
            name="isActive"
            options={statusOptions}
            value={formData.isActive}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end mt-6 space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            {isEditing ? 'Update Employee' : 'Create Employee'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmployeeForm;
