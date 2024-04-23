import * as React from 'react';

interface BaseCardProps {
  title: string;
  subtitle: string;
  outlined?: boolean;
  orientation?: 'left' | 'center' | 'right';
  icon: React.ReactElement;
  className?: string;
}

// Props when hoverable is true
interface HoverableTrueProps extends BaseCardProps {
  hoverable: true;
  onMouseOver: React.MouseEventHandler<HTMLDivElement>;
  onMouseOut: React.MouseEventHandler<HTMLDivElement>;
}

// Props when hoverable is false or undefined
interface HoverableFalseProps extends BaseCardProps {
  hoverable?: false;
  onMouseOver?: undefined;
  onMouseOut?: undefined;
}

// Conditional type based on the hoverable prop
type FeatureCardProps = HoverableTrueProps | HoverableFalseProps;

export const FeatureCard = ({
  title,
  subtitle,
  outlined = true,
  orientation = 'center',
  icon,
  className,
  hoverable,
  onMouseOut,
  onMouseOver,
}: FeatureCardProps) => {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };
  const handleMouseOver = hoverable ? onMouseOver : undefined;
  const handleMouseOut = hoverable ? onMouseOut : undefined;
  const containerClasses = `flex flex-col ${alignmentClasses[orientation]} ${
    outlined ? 'border border-gray-200 rounded-sm' : ''
  } p-3 sm:p-4 lg:p-5 xl:p-6 space-y-4 shadow-md`;

  return (
    <div
      className={`${containerClasses} ${className}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {icon}
      <p className="text-xl font-semibold xl:text-2xl">{title}</p>
      <p className="text-gray-500 xl:text-xl">{subtitle}</p>
    </div>
  );
};
