import * as React from 'react';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  outlined?: boolean;
  orientation?: 'left' | 'center' | 'right';
  icon: React.ReactElement;
  className?: string;
}

export const FeatureCard = ({
  title,
  subtitle,
  orientation = 'center',
  outlined = true,
  icon,
  className = '',
}: FeatureCardProps) => {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const containerClasses = `flex flex-col ${alignmentClasses[orientation]} ${
    outlined ? 'border border-gray-200 rounded-sm' : ''
  } p-3 space-y-4`;

  return (
    <div className={`${containerClasses} ${className}`}>
      {icon}
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};
