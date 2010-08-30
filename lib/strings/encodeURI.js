	//encodes a URI - Example: converts this http://www.dmoz.org/World/Español/ to  http://www.dmoz.org/World/Espa%C3%B1ol/
	this.encodeURI = function(aURI)
	{
		try
		{
			return encodeURI(aURI);
		}
		catch(e)
		{
			return aURI;
		}
	};
