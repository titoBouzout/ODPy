	//removes the http://www.domain/ from an url
	this.removeSubdomain = function(aURI)
	{
		if(!aURI)
			return '';

		return aURI.replace(/^(.+?):\/+(.+?)\/(.*)$/, "$3");
	}
