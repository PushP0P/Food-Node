export interface RequestEvent {
	event: string;
	payload: {
		type: string;
		body?: any;
	};
}

export interface EventResponseTransport {
	ok: boolean;
	body?: any;
	message?: string;
}

export const packForTransport = (payload: any): EventResponseTransport => {
	return {
		ok: true,
		body: payload,
		message: 'Successful Event'
	};
};
