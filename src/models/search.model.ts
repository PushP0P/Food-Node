export interface SearchResultsList {
	list: {
		item: ShortReport[];
	};
}

export interface ShortReport {
	group: string;
	name: string;
	ndbno: string;
}
