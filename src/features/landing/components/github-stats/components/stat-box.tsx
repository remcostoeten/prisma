import NumberFlow from '@number-flow/react';

interface StatBoxProps {
  label: string;
  value: number;
  randomValue: number;
  isLoading: boolean;
  className?: string;
  size?: 'small' | 'large';
}

function StatBox({ label, value, randomValue, isLoading, className = '', size = 'small' }: StatBoxProps) {
  const getDisplayValue = () => {
    if (isLoading && value < 10) {
      return randomValue;
    }
    return value;
  };

  return (
    <div className={className}>
      <div className="text-[#666] text-sm mb-2 tracking-wider">
        {label}
      </div>
      <div className={`font-light text-white ${size === 'large' ? 'text-6xl' : 'text-4xl'}`}>
        <NumberFlow 
          value={getDisplayValue()}
          transformTiming={{ duration: 2000, easing: 'ease-out' }}
          spinTiming={{ duration: 1800, easing: 'ease-in-out' }}
          trend={0}
          animated={true}
          willChange={true}
        />
      </div>
    </div>
  );
}

export default StatBox;
