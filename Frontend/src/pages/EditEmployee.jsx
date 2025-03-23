
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployees, updateEmployee } from '../store/actions/employeeActions';
import EmployeeForm from '../components/employees/EmployeeForm';

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { employees, loading } = useSelector(state => state.employees);
  const employee = employees.find(emp => emp._id === id);
  
  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employee]);
  
  const handleSubmit = (formData) => {
    dispatch(updateEmployee(id, formData)).then(() => {
      navigate(`/employees/${id}`);
    });
  };

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Employee</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update employee information
        </p>
      </div>
      
      {loading && !employee ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin-slow w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : employee ? (
        <EmployeeForm 
          initialData={employee} 
          onSubmit={handleSubmit} 
          isEditing={true} 
          isLoading={loading}
        />
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Employee not found
        </div>
      )}
    </div>
  );
};

export default EditEmployee;
