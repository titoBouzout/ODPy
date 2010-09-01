	//returns true if aCategory starts with a valid category name
	this.categoryStartsWithValidName = function(aCategory)
	{
		if(
		   aCategory.indexOf('World') == 0 || 
		   aCategory.indexOf('Regional') == 0 || 
		   aCategory.indexOf('Bookmarks') == 0 || 
		   aCategory.indexOf('Test') == 0 || 
		   aCategory.indexOf('Top/') == 0 || //top should be followed by a a category
		   aCategory.indexOf('Kids_and_Teens') == 0 || 
		   aCategory.indexOf('Arts') == 0 || 
		   aCategory.indexOf('Computers') == 0 || 
		   aCategory.indexOf('Games') == 0 || 
		   aCategory.indexOf('Health') == 0 || 
		   aCategory.indexOf('Home') == 0 || 
		   aCategory.indexOf('News') == 0 || 
		   aCategory.indexOf('Recreation') == 0 || 
		   aCategory.indexOf('Reference') == 0 || 
		   aCategory.indexOf('Society') == 0 || 
		   aCategory.indexOf('Sports') == 0 || 
		   aCategory.indexOf('Science') == 0 || 
		   aCategory.indexOf('Shopping') == 0 || 
		   aCategory.indexOf('Business') == 0 || 
		   aCategory.indexOf('Netscape') == 0 || 
		   aCategory.indexOf('AOL') == 0 || 
		   aCategory.indexOf('Adult') == 0
		   )
			return true;
		else
			return false;
	}