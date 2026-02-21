import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle, trend, trendValue }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      iconBg: 'bg-blue-100',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      iconBg: 'bg-green-100',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      border: 'border-yellow-200',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      iconBg: 'bg-purple-100',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      iconBg: 'bg-red-100',
      border: 'border-red-200',
      gradient: 'from-red-500 to-red-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${color}-500 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs font-medium text-gray-600 flex items-center">
              {subtitle}
            </p>
          )}
          
          {/* Trend Indicator */}
          {trend && (
            <div className="flex items-center mt-2 bg-gray-50 px-2 py-1 rounded-full w-fit">
              {trend === 'up' ? (
                <TrendingUp size={14} className="text-green-600 mr-1" />
              ) : trend === 'down' ? (
                <TrendingDown size={14} className="text-red-600 mr-1" />
              ) : null}
              <span className={`text-xs font-semibold ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        {/* Icon dengan background */}
        <div className={`p-3 rounded-lg ${colors.iconBg}`}>
          <Icon size={24} className={colors.text} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;