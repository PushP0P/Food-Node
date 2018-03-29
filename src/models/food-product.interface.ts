export interface FoodProductMeta {
	[props: string]: any;
}

export interface FoodProduct  {
	foodName: string;
	brandName: string;
	groupName: string;
	metadata: FoodProductMeta;
	categories: string[];
	source: string;
	ndbno: string;
	tags: string[];
	photo: FoodImages;
	updatedAt: number;
}

export interface FoodImages {
	brand_logo?: string;
	thumb?: string;
	highRes?: string;
	isUserUploaded?: boolean;
}

export interface NixFoodItem extends FoodProduct {
	nix_brand_name?: string;
	nix_brand_id?: string;
	nix_item_name?: string;
	nix_item_id?: string;
}

export interface USDAFoodItem extends FoodProduct {
	food_group: string;
}

export class FoodProduct {
	public foodName: string = 'no value';
	public brandName: string = 'no value';
	public groupName: string = 'no value';
	public metadata: FoodProductMeta = {};
	public source: string = 'no value';
	public ndbno: string = 'no value';
	public tags: string[] = [];
	public photo: FoodImages = <FoodImages> {};
	public updatedAt: number = -1;
	public categories: string[] = [];

	constructor() {
		this.updatedAt = Date.now();
	}
}
