
import React from 'react';
import { Users, DollarSign, UserCheck, Briefcase } from 'lucide-react';
import Card from '../ui/Card';

const DashboardSummary = ({ stats }) => {
  const summaryItems = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees || 0,
      icon: <Users className="w-5 h-5 text-blue-500" />,
      color: 'blue'
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees || 0,
      icon: <UserCheck className="w-5 h-5 text-green-500" />,
      color: 'green'
    },
    {
      title: 'Departments',
      value: stats.departments?.length || 0,
      icon: <Briefcase className="w-5 h-5 text-purple-500" />,
      color: 'purple'
    },
    {
      title: 'Total Salary',
      value: `$${(stats.totalSalary || 0).toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-amber-500" />,
      color: 'amber'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <Card key={index} className="hover-scale">
          <div className="flex items-start">
            <div className={`w-12 h-12 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 flex items-center justify-center mr-4`}>
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.title}
              </h3>
              <p className="text-2xl font-bold mt-1">
                {item.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
