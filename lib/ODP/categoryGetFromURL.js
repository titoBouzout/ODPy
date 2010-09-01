	//returns the category name for the URI, if multiples categories found will return the first
	this.categoryGetFromURL = function(aURI, aggressive)
	{
		var aCategory = '';

		if(!aURI)
			return aCategory;
			
		if(aURI.indexOf('cat=') != -1)
		{
			if(aURI.indexOf('?cat=') != -1)
			{
				aCategory = aURI.replace(/^.*\?cat=([^&]*)([^&amp])?.*$/, "$1");
			}
			else if(aURI.indexOf('&cat=') != -1)
			{
				aCategory = aURI.replace(/^.*&cat=([^&]*)([^&amp])?.*$/, "$1");
			}
			else if(aURI.indexOf('cat=') != -1)
			{
				aCategory = aURI.replace(/^.*cat=([^&]*)([^&amp])?.*$/, "$1");
			}
			else if(aURI.indexOf('where=') != -1)
			{
				aCategory = aURI.replace(/^.*where=([^&]*)([^&amp])?.*$/, "$1");
			}
			else
			{
				aCategory = aURI;
			}
		}
		else if(aURI.indexOf('.html') != -1)
		{
			if(aURI.indexOf('/full-index.html') != -1)
			{
				aCategory = aURI.replace(/^(.*)\/full-index\.html$/, "$1");
			}
			else if(aURI.indexOf('/desc.html') != -1)
			{
				aCategory = aURI.replace(/^(.*)\/desc\.html$/, "$1");
			}
			else if(aURI.indexOf('/faq.html') != -1)
			{
				aCategory = aURI.replace(/^(.*)\/faq\.html$/, "$1");
			}
			else if(aURI.indexOf('/about.html') != -1)
			{
				aCategory = aURI.replace(/^(.*)\/about\.html$/, "$1");
			}
			else
			{
				aCategory = aURI;
			}
		}
		else if(aURI.indexOf('profiles/') != -1)
		{
			return '';
		}
		else
		{
			aCategory = aURI;
		}
		
		if(aggressive || this.isODPSubdomain(this.getSubdomainFromURL(aCategory)))
			aCategory = this.removeSubdomain(aCategory);

		if(aCategory == '')
			return '';

		aCategory = this.categorySanitize(aCategory);
		
		//if multiples categories founds
		if(aCategory.indexOf('\n') != -1 || aCategory.indexOf('\r') != -1)
		{
			aCategory = aCategory.replace(/\r/g, '\n').replace(/\n\n/g, '\n');
			aCategory = aCategory.split('\n')[0];
			aCategory = this.categorySanitize(aCategory);
		}
		
		//aCategory = this.trim(aCategory);
		
		aCategory = this.categoryCheckFormat(aCategory, aggressive);
		
		//aCategory = this.categorySanitize(aCategory);
		
		if(this.categoryStartsWithValidName(aCategory))
			return aCategory;
		else
			return '';
	}