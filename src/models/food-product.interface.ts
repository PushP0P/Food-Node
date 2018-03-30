export interface FoodProductMeta {
	[props: string]: any;
}

export interface FoodImages {
	brand_logo?: string;
	thumb?: string;
	highRes?: string;
	isUserUploaded?: boolean;
}

export class FoodProduct {
	public foodName: string = 'no value';
	public brandName: string = 'no value';
	public updatedAt: number = -1;
	public categories: string | string[] = [];
	public metadata?: string =  'No Meta';
	public photo?: string  = 'No Photos';

	constructor() {
		this.updatedAt = Date.now();
	}
}
