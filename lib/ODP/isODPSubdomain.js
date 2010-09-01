	//returns true if the subdomain/domain is from the ODP
	this.isODPSubdomain = function(aSubdomain)
	{
			aSubdomain = this.removeWWW(aSubdomain);
			
			switch(aSubdomain)
			{
				case 'dmoz.org' :
				case 'editors.dmoz.org' :
				case 'search.dmoz.org' :
				case 'beta.dmoz.org' :
				case 'dmoz.com' :
				case 'core-n02.dmoz.aol.com' :
				case 'directory.google.com' : //what!?
				{
					return true;
					break;
				}
				default :
				{
					return false;
					break;
				}
			}
	}