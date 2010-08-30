	//encodes a string
	this.encodeUTF8 = function(aString)
	{
		try
		{
			return encodeURIComponent(aString);
		}
		catch(e)
		{
			try
			{
				return encodeURI(aString);
			}
			catch(e)
			{
				return aString;
			}
		}
	};
