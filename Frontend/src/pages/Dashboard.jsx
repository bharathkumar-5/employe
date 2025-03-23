
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/actions/employeeActions';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import DepartmentDistribution from '../components/dashboard/DepartmentDistribution';
import SalaryByDepartment from '../components/dashboard/SalaryByDepartment';
import RecentEmployees from '../components/dashboard/RecentEmployees';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector(state => state.employees);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: [],
    totalSalary: 0
  });
  
  const [departmentData, setDepartmentData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  
  useEffect(() => {
    dispatch(fetchEmployees(1, 100)); // Fetch all employees for dashboard analytics
  }, [dispatch]);
  
  useEffect(() => {
    if (employees.length > 0) {
      // Calculate dashboard statistics
      const activeEmployees = employees.filter(emp => emp.isActive).length;
      const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
      
      // Get unique departments
      const departments = [...new Set(employees.map(emp => emp.department))];
      
      setStats({
        totalEmployees: employees.length,
        activeEmployees,
        departments,
        totalSalary
      });
      
      // Calculate department distribution data
      const deptCounts = {};
      employees.forEach(emp => {
        deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
      });
      
      const deptData = Object.keys(deptCounts).map(dept => ({
        name: dept,
        value: deptCounts[dept]
      }));
      
      setDepartmentData(deptData);
      
      // Calculate average salary by department
      const deptSalaries = {};
      const deptEmployees = {};
      
      employees.forEach(emp => {
        deptSalaries[emp.department] = (deptSalaries[emp.department] || 0) + emp.salary;
        deptEmployees[emp.department] = (deptEmployees[emp.department] || 0) + 1;
      });
      
      const avgSalaryData = Object.keys(deptSalaries).map(dept => ({
        name: dept,
        value: Math.round(deptSalaries[dept] / deptEmployees[dept])
      }));
      
      setSalaryData(avgSalaryData);
    }
  }, [employees]);

  return (
    <div>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the Employee Management Dashboard
        </p>
      </div>
      
      <DashboardSummary stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <DepartmentDistribution departments={departmentData} />
        <SalaryByDepartment data={salaryData} />
      </div>
      
      <RecentEmployees employees={employees.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;
