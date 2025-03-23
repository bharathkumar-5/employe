
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';

const DepartmentDistribution = ({ departments }) => {
  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'];
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1 h-96">
      <h2 className="text-xl font-semibold mb-4">Department Distribution</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={departments}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
          >
            {departments.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} employees`, 'Count']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DepartmentDistribution;
