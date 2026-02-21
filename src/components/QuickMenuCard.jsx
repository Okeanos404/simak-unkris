import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const QuickMenuCard = ({ title, description, icon: Icon, to, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    yellow: 'from-yellow-600 to-yellow-700',
    red: 'from-red-600 to-red-700'
  };

  const textColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600'
  };

  return (
    <Link to={to}>
      <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg p-5 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}>
        <div className="flex items-start justify-between mb-3">
          <Icon size={28} strokeWidth={1.5} className="text-white opacity-90" />
          <ArrowRight size={18} className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="font-bold text-lg mb-1 text-white">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </Link>
  );
};

export default QuickMenuCard;