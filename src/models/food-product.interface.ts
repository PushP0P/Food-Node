export interface FoodProductMeta {
	[props: string]: any;
}

export interface FoodProduct  {
	food_name: string;
	brand_name: string;
	group_name: string;
	metadata: FoodProductMeta;
	source: string;
	ndb_no: string;
	tags: string[];
	photo: FoodImages;
	updated_at: number;
}

export interface FoodImages {
	brand_logo?: string;
	thumb?: string;
	highres?: string;
	is_user_uploaded?: boolean;
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

	constructor(){}

	public withFoodName(foodName: string): FoodProduct {
		this.foodName = foodName;
		return this;
	}
	public withBrandName(brandName: string): FoodProduct {
		this.brandName = brandName;
		return this;
	}
	public withMetadata(metadata: FoodProductMeta): FoodProduct {
		this.metadata = metadata;
		return this;
	}
	public withSource(source: string): FoodProduct {
		this.source = source;
		return this;
	}
	public withNdbno(ndbno: string): FoodProduct {
		this.ndbno = ndbno;
		return this;
	}
	public withTags(tags: string[]): FoodProduct {
		this.tags = tags;
		return this;
	}
	public withPhoto(photo: FoodImages): FoodProduct {
		this.photo = photo;
		return this;
	}

	public withUpdatedAt(updatedAt: number): FoodProduct {
		this.updatedAt = updatedAt;
		return this;
	}

	public withGroupName(groupName: string): FoodProduct {
		this.groupName = groupName;
		return this;
	}
}

let fP = new FoodProduct().withFoodName('foo bro').withBrandName('really?')
fP.foodName;
