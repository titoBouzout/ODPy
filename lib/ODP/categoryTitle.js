	//returns a category title from a category name
	this.categoryTitle = function(aCategory)
	{
		return aCategory.replace(/_/g, ' ').replace(/-/g, ' ').replace(/ +/g, ' ');
	}