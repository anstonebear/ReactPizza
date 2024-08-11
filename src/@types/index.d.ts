export {};

declare global {
	interface Window {
		ym: ({
			id,
			type,
			value,
		}: {
			id: number;
			type: string;
			value: string;
		}) => void;
	}
}
