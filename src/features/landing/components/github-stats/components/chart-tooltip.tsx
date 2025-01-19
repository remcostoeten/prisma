import { TooltipProps } from 'recharts';

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="text-[#888] mb-1">{new Date(label).toLocaleDateString('en-US', { 
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}</div>
        <div className="text-white font-medium">
          {payload[0].value?.toLocaleString()} Messages
        </div>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;
