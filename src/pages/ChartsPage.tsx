import React from 'react';
import LineGraph from '../components/Charts/Line';
import PieGraph from '../components/Charts/Pie';
import BarGraph from '../components/Charts/Bar';

const ChartsPage = () => {
	return (
		<div>
			<LineGraph />
			<BarGraph />
			<PieGraph />
		</div>
	);
};

export default ChartsPage;
