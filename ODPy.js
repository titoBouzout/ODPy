/*
	Main javascript object..
*/

ODP = {	

	e : '…', /* ellipsis shortcut */
	categoryTimeout : null, 
	
	load : function()// loads the starting inteface..
	{
		//first the status bar
		this.status = $('.status-bar');
		this.statusSet('loading document'+this.e);
		this.statusHide();

		//now load basis elements
		this.loadElements();
		
		//this.loadCategory('Computers/Data_Formats/Markup_Languages/HTML/');
		//display document loaded
		this.statusSet('document loaded'+this.e);
		this.statusHide();
		$("body").fadeIn('slow');
	},
	loadElements : function()// loads basic inteface elements
	{
		//$("#category").inputDefault();
		//$("#search").inputDefault();
		
		SWFAddress.addEventListener(SWFAddressEvent.CHANGE, function(event){ ODPy.onLocationChange(event);}, true);
	},
	loadCategory : function(aCategory)// checks for loading a new category
	{
		aCategory = categoryGetFromURL(aCategory);
		if(aCategory != '')
		{
			this.loadedCategory = aCategory;
			
			this.statusSet('going to load category "'+categoryTitle(aCategory)+'"');
			this.statusHide();
			
			clearTimeout(this.categoryTimeout);
			this.categoryTimeout = setTimeout(function(){ document.location = '#Top/'+aCategory+'/';  }, 1000);
		}
	},
	loadSearch : function(aSearchTerm)// loads a new category
	{
		aSearchTerm = trim(aSearchTerm);
		if(aSearchTerm != '' && aSearchTerm != this.loadedSearchTerm)
		{
			this.loadedSearchTerm = aSearchTerm;
			
			this.statusSet('going to load search term "'+aSearchTerm+'" '+this.e);
			this.statusHide();
		}
	},
	statusSet : function(aString)//display information in the status bar
	{
		//manages the show and hide of the status, avoids to many flashing.
		if(!this.statusElementsShowing)
		{
			this.statusElementsShowing = 0;
			this.statusElementsShown = 0;
		}
		this.statusElementsShowing++;

		//show the status bar if it is hidden
			if(this.status.is(':hidden'))
				this.status.fadeIn();
		//set the status
		this.status.html(aString);
	},
	statusHide : function()//hide the status bar if no more element are in queue
	{
		setTimeout(function(){
								ODPy.statusElementsShown++; 
								if(ODPy.statusElementsShown == ODPy.statusElementsShowing)
									ODPy.status.fadeOut();
							}, 1300);
	},
	setTitle : function(aString)
	{
		document.title = 'ODPy - '+categoryTitle(aString)+' - Experimental Editing Interface';	
	},
	onLocationChange : function(aEvent)
	{
		var aPath = aEvent.path.replace(/^\//, '');
		if(aPath.indexOf('Top/') == '')
		{
			var aCategory = categoryGetFromURL(aPath);
			this.loadedCategory = aCategory;
			this.statusSet('loading category  "'+categoryTitle(aCategory)+'"'+this.e);
			this.setTitle(aCategory);
			parseCategory(categoryGetFromURL(aCategory), function(aCategory, aData){ ODPy.browse(aCategory, aData);});
		}
	},
	browse : function(aCategory, aData)
	{
	//	alert('loaded'+aCategory+aData.categories[0].toString());
		
		$('.template').clone();
		
		$('.categories-highest').empty();
		if(aData.categories[0])
		{
			 $('.categories-highest').html('<ul><li>'+aData.categories[0].join('<li>'));  $('.categories-highest').show();
		}
		else
			$('.categories-highest').hide();
			
		$('.categories-middle').empty();
		if(aData.categories[1])
		{
			 $('.categories-middle').html('<ul><li>'+aData.categories[1].join('<li>'));  $('.categories-middle').show();
		}
		else
			$('.categories-middle').hide();
			
		$('.categories-bottom').empty();
		if(aData.categories[2])
		{
			  $('.categories-bottom').html('<ul><li>'+aData.categories[2].join('<li>')); $('.categories-bottom').show();
		}
		else
			$('.categories-bottom').hide();
			
		$('.categories-alternative').empty();
		if(aData.alternative.length > 0)
		{
			$('.categories-alternative').html('<ul><li>'+aData.alternative.join('<li>'));$('.categories-alternative').show();
		}
		else
			$('.categories-alternative').hide();
			
		$('.categories-related').empty();
		if(aData.related.length > 0)
		{
			$('.categories-related').html('<ul><li>'+aData.related.join('<li>'));$('.categories-related').show();
		}
		else
			$('.categories-related').hide();		
		
		
		$('.sites-reviewed').empty();
		if(aData.sites.length > 0 || aData.sitesCooled.length )
		{
			var tmp = '<ul>';
			if(aData.sitesCooled.length > 0)
				tmp += ('<li class="cool">'+aData.sitesCooled.join('<li class="cool">'));
			
			if(aData.sites.length > 0)
				tmp += ('<li>'+aData.sites.join('<li>'));
			
			$('.sites-reviewed').html(tmp);
			$('.sites-reviewed').show();
		}
		else
			$('.sites-reviewed').hide();		
		
		
		$('.alphabar').empty();
		if(aData.alphabar.length > 0)
		{
			var tmp = [];
			for(var id in aData.alphabar)
			{
				tmp[tmp.length] = (' <a href="#/Top/'+aCategory+'/'+aData.alphabar[id]+'/">'+aData.alphabar[id]+'</a> ');
			}
			$('.alphabar').html('[ '+tmp.join(' | ')+' ]');
		}
		else
			$('.alphabar').hide();		
		
		$('.groups').empty();
		if(aData.groups.length > 0)
		{
			$('.groups').html('<ul><li>'+aData.groups.join('<li>'));$('.groups').show();
		}
		else
			$('.groups').hide();		
		
		$('.editors').empty();
		if(aData.editors.length > 0)
		{
			$('.editors').html(aData.editors.join(', '));$('.editors').show();
		}
		else
			$('.editors').hide();		
		
		$('.moz').empty();
		if(aData.moz != '')
		{
			$('.moz').html('<img src="/img/moz/'+aData.moz+'"/>');$('.moz').show();
		}
		else
			$('.moz').hide();		
		

		ODPy.statusHide();
	},
	sortLocale : function(a, b)
	{
		return trim(stripTags(a)).localeCompare(trim(stripTags(b)));
	},
	computerSearch : function(item)
	{
		open(item.replace('%s', encodeUTF8(categoryTitle(categoryGetLastChildName(this.loadedCategory)))))
	}
};
