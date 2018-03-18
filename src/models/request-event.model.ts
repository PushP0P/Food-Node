export interface RequestEvent {
	event: string;
	payload: {
		type: string;
		body?: any;
	};
}
