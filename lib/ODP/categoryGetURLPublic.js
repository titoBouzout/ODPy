	//returns the public URL from a category name
	this.categoryGetURLPublic = function(aCategory)
	{
		/* here all the trouble for dmoz2.0 */
		return encodeURI('http://www.dmoz.org/'+aCategory+'/');
	}