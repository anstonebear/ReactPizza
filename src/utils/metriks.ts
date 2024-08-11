type Metriks = {
	id: number;
	type: string;
	value: string;
};

export const sendMetriks = ({ id, type, value }: Metriks) => {
	window.ym({ id: 98044272, type, value });
};

//sendMetriks({ id, type: 'reachGoal', value: 'addItem' });
