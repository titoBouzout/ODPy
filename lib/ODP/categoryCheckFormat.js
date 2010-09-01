	//sanitize the format of a category
	this.categoryCheckFormat = function(aCategory, aggressive)
	{
		//multiples categories selected maybe
		
			if(aCategory.indexOf('\n') != -1 || aCategory.indexOf('\r') != -1)
			{
				aCategory = aCategory.replace(/\r/g, '\n').replace(/\n\n/g, '\n');
				aCategory = aCategory.split('\n')[0];
			}
			
		//ending with
			aCategory = aCategory.replace(/(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_|-)*$/, '');
		//starting with
			aCategory = aCategory.replace(/^(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_|-)*/, '');

		//stange caracteres
		
			//Test/Tools_for_Editors/New_Editors/faq.html#42
			if(aCategory.indexOf('#') != -1)
				aCategory = aCategory.split('#')[0];

			//Computers/Software/Internet/Clients/WWW/Browsers/Firefox/Add-ons/Web_Design_and_Development/?
			//World/Español/?World/Español
			if(aCategory.indexOf('?') != -1)
				aCategory = aCategory.split('?')[0];
			
			//World/Español/Regional/Países/U@Uruguay
			if(aCategory.indexOf('@') != -1)
			{
				if(aCategory.split('@')[0].indexOf('/') != -1)
					aCategory = aCategory.split('@')[0];
				else if(aCategory.split('@').length > 1)
					aCategory = aCategory.split('@')[1];
				else
					aCategory = aCategory.split('@')[0];
			}
			
			//World/Português/Artes/Música/Estilos&server=dmoz8080
			if(aCategory.indexOf('&') != -1 && aCategory.indexOf('=') != -1)
				aCategory = aCategory.split('&')[0];
			
		//some log pages
		
			aCategory = aCategory.replace(/ +\(.*$/, '');
			aCategory = aCategory.replace(/ +\[.*$/, '');
			aCategory = aCategory.replace(/Unreviewed$/, '');
			aCategory = aCategory.replace(/Unrev$/, '');
			aCategory = aCategory.replace(/unrev$/, '');
			aCategory = aCategory.replace(/\.unreview$/, '');
		
		//ending with
		
			aCategory = aCategory.replace(/->.*$/, '');
			aCategory = aCategory.replace(/(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_|-)*$/, '');
			
		//starting with
			aCategory = aCategory.replace(/^(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_|-)*/, '');
			
			aCategory = this.trim(aCategory);

		//I cant' remember this one
		
			if(aCategory.indexOf('[') == -1 && aCategory.indexOf(']') != -1)
			{
				aCategory = aCategory.replace(/]$/, '');
			}
		
			if(aCategory.indexOf('[') != -1 && aCategory.indexOf(']') != -1 && /\]$/.test(aCategory))
			{
				var catTest = aCategory.replace(/.* ([^ ]+)\]$/, "$1");
				if(catTest != '' && this.categoryStartsWithValidName(catTest))
				{
					aCategory = catTest;
				}
			}			
		//well know used formats
			
			//lovely editor:tangyp use this format!??
			//:World:+Chinese+Simplified:+科学:+科技:+电子工程/
			
				if(aCategory.indexOf(':+') != -1)
					aCategory = aCategory.replace(/\:\+/g, '/').replace(/\+/g, '_').replace(/^\:+/, '');
				
			//World : Chinese Simplified : 科学 : 科技 : 电子工程
				if(aCategory.indexOf(':') != -1)
					aCategory=aCategory.replace(/\s*?:\s*/g,'/').replace(/\s/g,'_');
					
			//World / Euskara / Hezkuntza
				if(aCategory.indexOf(' /') != -1 || aCategory.indexOf('/ ') != -1 )
					aCategory=aCategory.replace(/\s*?\/\s*/g,'/');

			//World_/_Euskara_/_Hezkuntza
				if(aCategory.indexOf('_/') != -1 || aCategory.indexOf('/_') != -1 )
					aCategory=aCategory.replace(/_*?\/_*/g,'/');
				
			//World/Español/Juegos/Cartas</td>
				if(aCategory.indexOf('<') != -1)
					aCategory=aCategory.replace(/<.*$/, '');
				
			//Test/Tools_for_Editors/New_Editors/faq.html
				if(/\/([^\/]+)\.(html|cgi|htm|php)$/i.test(aCategory))
					aCategory=aCategory.replace(/\/[^\/]+$/, '');		

			aCategory = this.categorySanitize(aCategory);

		//ends with
			aCategory = aCategory.replace(/(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_)*$/, '');
		//starting with
			aCategory = aCategory.replace(/^(\+|\.|\:|@|"|,|'| |#|>|<|\)|\(|\*|_)*/, '');
			

			//Bookmarks/D/development/Bandas y artistas/
			if(aCategory.indexOf(' ') != -1)
				aCategory=aCategory.replace(/ /g, '_');
				
			//ok we have a valid category
			if(this.categoryStartsWithValidName(aCategory))
				return aCategory;
			else
			{
				if(aggressive)
				{
					var aCategory2 = '';
					//argg!!!!!!! try to find the category in text
					
					//first try with world because the other categories maybe are inside of world
					aCategory2 = aCategory.replace(/.*(Top\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory2))
						return aCategory2;
					
					//first try with world because the other categories maybe are inside of world
					aCategory2 = aCategory.replace(/.*(Test\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory2))
						return aCategory2;
					
					//first try with world because the other categories maybe are inside of world
					var aCategory2 = aCategory.replace(/.*(World\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory2))
						return aCategory2;
					
					//first try with world because the other categories maybe are inside of world
					aCategory2 = aCategory.replace(/.*(Kids_and_Teens\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory2))
						return aCategory2;

					//first try with world because the other categories maybe are inside of world
					aCategory2 = aCategory.replace(/.*(Regional\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory2))
						return aCategory2;
					
					aCategory = aCategory.replace(/.*((Bookmarks|Arts|Computers|Games|Health|Home|News|Recreation|Reference|Society|Sports|Science|Shopping|Business|Netscape|AOL|Adult)\/[^ ]+).*$/, "$1");
					if(this.categoryStartsWithValidName(aCategory))
					{
						//!yay!yepeyepeyeye!!!!!!!!
						return aCategory;
					}
					else
					{
						return '';
					}
				}
				else
				{
					return '';
				}
			}
	}