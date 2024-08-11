interface IMetriks {
	ym: (id: number, type: string, value: string) => void;
}

export const sendMetriks = (type: string, value: string) => {
	window.ym(98044272, type, value);
};
