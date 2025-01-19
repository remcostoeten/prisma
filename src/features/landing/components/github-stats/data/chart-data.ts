export interface DataPoint {
  date: string;
  messages: number;
}

export function generateData(): DataPoint[] {
  const data: DataPoint[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2024-01-31');
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  for (let i = 0; i <= totalDays; i += 3) {
    const currentDate = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
    const progress = i / totalDays;
    const messages = Math.round(10000000 + (122614288 * progress));
    data.push({
      date: currentDate.toISOString().split('T')[0],
      messages: messages,
    });
  }
  return data;
}
