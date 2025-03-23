
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../store/actions/employeeActions';
import EmployeeList from '../components/employees/EmployeeList';
import Card from '../components/ui/Card';

const Employees = () => {
  const dispatch = useDispatch();
  const { employees, loading, currentPage } = useSelector(state => state.employees);
  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  
  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id)).then(() => {
        dispatch(fetchEmployees(currentPage));
      });
    }
  };

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Employees</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your employee records
        </p>
      </div>
      
      <Card className="p-0 overflow-hidden">
        <EmployeeList 
          employees={employees} 
          loading={loading} 
          onDelete={handleDeleteEmployee} 
        />
      </Card>
    </div>
  );
};

export default Employees;
