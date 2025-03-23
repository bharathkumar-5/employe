
import React from 'react';
import { User, Mail, Phone, Briefcase, DollarSign, Calendar, UserCheck } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const EmployeeDetails = ({ employee, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin-slow w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">Employee not found</div>
      </Card>
    );
  }

  const infoItem = (icon, label, value) => (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        <div className="text-lg font-medium mt-1">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
            <Avatar
              src={employee.profilePicture}
              text={employee.name}
              size="xl"
              status={employee.isActive ? 'online' : 'offline'}
            />
          </div>
          
          <div className="md:w-3/4 md:pl-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h1 className="text-2xl font-bold mb-2 md:mb-0">
                {employee.name}
              </h1>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                >
                  Edit
                </Button>
                
                <Button 
                  variant="danger"
                  size="sm"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <Badge variant={employee.isActive ? 'success' : 'danger'}>
                {employee.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <Badge variant="primary">{employee.department}</Badge>
              <Badge variant="default">{employee.role === 'admin' ? 'Administrator' : 'Employee'}</Badge>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {employee.email} • {employee.phone}
            </p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-6">
            {infoItem(
              <User className="w-5 h-5 text-primary" />,
              'Full Name',
              employee.name
            )}
            
            {infoItem(
              <Mail className="w-5 h-5 text-primary" />,
              'Email Address',
              employee.email
            )}
            
            {infoItem(
              <Phone className="w-5 h-5 text-primary" />,
              'Phone Number',
              employee.phone
            )}
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Employment Details</h2>
          <div className="space-y-6">
            {infoItem(
              <Briefcase className="w-5 h-5 text-primary" />,
              'Department',
              employee.department
            )}
            
            {infoItem(
              <DollarSign className="w-5 h-5 text-primary" />,
              'Salary',
              `$${employee.salary.toLocaleString()}`
            )}
            
            {infoItem(
              <UserCheck className="w-5 h-5 text-primary" />,
              'Status',
              employee.isActive ? 'Active Employee' : 'Inactive Employee'
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDetails;
