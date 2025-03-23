
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const EmployeeList = ({ employees, loading, onDelete }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  
  // Filter employees based on search term and department filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
      
    const matchesDepartment = filterDepartment === '' || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'HR', label: 'HR' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Admin', label: 'Admin' }
  ];
  
  const statusBadge = (isActive) => {
    return isActive ? (
      <Badge variant="success" size="sm">Active</Badge>
    ) : (
      <Badge variant="danger" size="sm">Inactive</Badge>
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>
        
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="block rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition py-2 pl-3 pr-10"
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/employees/add')}
          className="md:w-auto"
        >
          Add Employee
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin-slow w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">No employees found</div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee._id} className="hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar
                  src={employee.profilePicture}
                  text={employee.name}
                  size="lg"
                  status={employee.isActive ? 'online' : 'offline'}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {employee.name}
                    </h3>
                    {statusBadge(employee.isActive)}
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {employee.email} • {employee.phone}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="primary" size="sm">
                      {employee.department}
                    </Badge>
                    <Badge variant="default" size="sm">
                      ${employee.salary.toLocaleString()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => navigate(`/employees/${employee._id}`)}
                  >
                    View
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit className="w-4 h-4" />}
                    onClick={() => navigate(`/employees/edit/${employee._id}`)}
                  >
                    Edit
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => onDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
