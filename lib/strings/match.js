	//matchs a regular expresion
	this.match = function(aString, aREGEXP)
	{
		if(aREGEXP=='')
			return false;
		try
		{
			if(aString.match(aREGEXP, 'i'))
				return true;
			else
				return false;
		}
		catch(e)
		{
			return false;
		}
	};
