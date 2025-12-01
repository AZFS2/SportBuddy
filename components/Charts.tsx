import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', activity: 20 },
  { name: 'Tue', activity: 45 },
  { name: 'Wed', activity: 30 },
  { name: 'Thu', activity: 70 },
  { name: 'Fri', activity: 50 },
  { name: 'Sat', activity: 90 },
  { name: 'Sun', activity: 60 },
];

export const ActivityChart = () => {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            tick={{fontSize: 10, fill: '#9ca3af'}} // gray-400
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#18181b', // surface-50
              borderRadius: '8px', 
              border: '1px solid #27272a', // surface-100
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
              color: '#fff'
            }}
            itemStyle={{ color: '#fff' }}
            cursor={{fill: '#27272a', opacity: 0.4}}
          />
          <Bar dataKey="activity" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.activity > 50 ? '#22c55e' : '#3f3f46'} /> 
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};