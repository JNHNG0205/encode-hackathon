'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  profit: number;
}

const ProfitChart = ({ data }: { data: ChartData }) => {
    
  const mockHistoricalData = [
    { month: 'Jul', profit: 0.020 },
    { month: 'Aug', profit: 0.045 },
    { month: 'Sep', profit: 0.068 },
    { month: 'Oct', profit: 0.089 },
    { month: 'Nov', profit: 0.102 },
    { month: 'Dec', profit: data.profit }
  ];

  return (
    <Card className="mt-6 bg-gray-900 text-white border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          Profit Overview
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHistoricalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
              />
              <YAxis 
                stroke="#9CA3AF"
                tickFormatter={(value) => `${value} ETH`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#F3F4F6'
                }}
                formatter={(value) => [`${value} ETH`]}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 0 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitChart;