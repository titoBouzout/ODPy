	//convert &amp; to ampersands & and remove slashs from the beggining and end.
	this.categorySanitize = function(aCategory)
	{
		return this.htmlSpecialCharsDecode(this.trim(this.decodeUTF8(aCategory))).replace(/%2F/gi, '/').replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, '').replace(/^Top\//, '');
	}