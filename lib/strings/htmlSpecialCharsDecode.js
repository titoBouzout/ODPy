	//Decodes HTML special chars
	this.htmlSpecialCharsDecode = function(aString)
	{
		return aString.split('&lt;').join('<').split('&gt;').join('>').split('&quot;').join('"').split('&apos;').join("'").split('&amp;').join('&');
	}
