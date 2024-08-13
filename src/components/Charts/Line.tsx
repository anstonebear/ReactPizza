import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineGraph: React.FC = () => {
	const options = {
		responsive: true,
	};

	const data = {
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		datasets: [
			{
				label: 'Series A',
				data: [10, 30, 30, 50, 40, 40],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
			{
				label: 'Series B',
				data: [10, 20, 20, 30, 40, 30],
				backgroundColor: 'rgba(95, 114, 76, 0.2)',
				borderColor: 'rgba(95,161,76, 1)',
				borderWidth: 1,
			},
		],
	};

	return (
		<div>
			<Line options={options} data={data} />
		</div>
	);
};

export default LineGraph;
