	//returns the category name for the last child of a category
	this.categoryGetLastChildName = function(aCategory)
	{
		return  aCategory.replace(/\/+$/, '').replace(/.*\/([^\/]+)$/, "$1");
	}
