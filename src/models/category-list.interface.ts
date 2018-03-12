export interface Category {
	gluten: SantaClauseList;
	milk: SantaClauseList;
	eggs: SantaClauseList;
	fish: SantaClauseList;
	shellfish: SantaClauseList;
	treeNuts: SantaClauseList;
	peanuts: SantaClauseList;
	wheat: SantaClauseList;
	soy: SantaClauseList;
	msg: SantaClauseList;
}

export interface SantaClauseList {
	good: any[] | Set<any>;
	bad: any[] | Set<any>;
}
