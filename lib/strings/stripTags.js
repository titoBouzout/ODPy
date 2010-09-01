	//stripTags from a string
	this.stripTags = function(aString, aReplacement)
	{
		if(!aString)
			return '';
		if(!aReplacement)
			return aString.replace(/<[^>]*>/g, '');
		else
			return aString.replace(/<[^>]*>/g, aReplacement);
	};
