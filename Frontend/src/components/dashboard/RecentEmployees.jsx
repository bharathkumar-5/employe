
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Eye } from 'lucide-react';

const RecentEmployees = ({ employees }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Employees</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/employees')}
        >
          View All
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar
                      src={employee.profilePicture}
                      text={employee.name}
                      size="sm"
                      status={employee.isActive ? 'online' : 'offline'}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="primary" size="sm">
                    {employee.department}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {employee.role === 'admin' ? 'Administrator' : 'Employee'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant={employee.isActive ? 'success' : 'danger'} 
                    size="sm"
                  >
                    {employee.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => navigate(`/employees/${employee._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentEmployees;
