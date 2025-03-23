
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../store/actions/employeeActions';
import EmployeeForm from '../components/employees/EmployeeForm';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.employees);
  
  const handleSubmit = (formData) => {
    dispatch(createEmployee(formData)).then(() => {
      navigate('/employees');
    });
  };

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add Employee</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new employee record
        </p>
      </div>
      
      <EmployeeForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default AddEmployee;
