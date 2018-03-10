interface NutritionixShortModel{
	branded: {
		food_name: string;
		serving_unit: string;
		nix_brand_id: string;
		brand_name_item_name: string;
		serving_qty: number;
		nf_calories: number;
		photo: {
			thumb: string;
			highres: string;
			is_user_uploaded: string;
		},
		brand_name: string;
		region: number;
		brand_type: number;
		nix_item_id: string;
		locale: string;
	}[];
}
