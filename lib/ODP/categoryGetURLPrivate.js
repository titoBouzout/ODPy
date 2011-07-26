	//returns the private URL from a category name
	this.categoryGetURLPrivate = function(aCategory)
	{
		/* here all the trouble for dmoz2.0 */
		return encodeURI('http://www.dmoz.org/'+aCategory+'/');
	}