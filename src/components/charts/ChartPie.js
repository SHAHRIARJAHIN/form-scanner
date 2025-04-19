import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };

  return <Pie data={chartData} />;
}