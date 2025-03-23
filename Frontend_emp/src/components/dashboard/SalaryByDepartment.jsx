
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const SalaryByDepartment = ({ data }) => {
  return (
    <Card className="col-span-1 md:col-span-2 h-96">
      <h2 className="text-xl font-semibold mb-4">Average Salary by Department</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalaryByDepartment;
