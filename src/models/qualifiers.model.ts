export interface Qualifiers {
	wheatGluten: Qualifier;
	milk: Qualifier;
	eggs: Qualifier;
	meat: Qualifier;
	soyNuts: Qualifier;
	mSGShellFish: Qualifier;
	fish: Qualifier;
	peanuts: Qualifier;
}

export interface Qualifier {
	[props: string]: string;
}
