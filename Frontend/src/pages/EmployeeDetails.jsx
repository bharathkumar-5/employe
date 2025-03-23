
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../store/actions/employeeActions';
import EmployeeDetailsComponent from '../components/employees/EmployeeDetails';

const EmployeeDetails = () => {
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
  
  const handleEdit = () => {
    navigate(`/employees/edit/${id}`);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id)).then(() => {
        navigate('/employees');
      });
    }
  };

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Employee Details</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View complete employee information
        </p>
      </div>
      
      <EmployeeDetailsComponent 
        employee={employee} 
        loading={loading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default EmployeeDetails;
