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

		//this.loadCategory('Computers/Data_Formats/Markup_Languages/HTML/');
		//display document loaded
		this.statusSet('document loaded'+this.e);
		this.statusHide();
		$("body").fadeIn('slow');
	},
	worldlinkerate : function(aCategory)// checks for loading a new category
	{
		aCategory = categoryGetFromURL(aCategory);
		if(aCategory != '' && this.loadedCategory != aCategory)
		{
			this.loadedCategory = aCategory;
			
			this.statusSet('going to load category "'+categoryTitle(aCategory)+'"');
			this.statusHide();
			
			clearTimeout(this.categoryTimeout);

			this.categoryTimeout = setTimeout(function(){ 
														   ODPy.worldlinkerateLoad(aCategory);
														   //SWFAddress.setValue('Top/'+aCategory+'/');
														 		//document.location = '#Top/'+aCategory+'/'; 
													   }, 1000);
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
	worldlinkerateLoad : function(aCategory)
	{
		this.toWorldLinkerate = {};
		this.toWorldLinkerate.categories = [];
		this.toWorldLinkerate.categoriesAltlangs = [];
		this.toWorldLinkerate.read = {};
		this.toWorldLinkerate.readRead = 0;
		this.toWorldLinkerate.readRemaining = 0;
		this.toWorldLinkerate.readRemaining++;
		
		$('.content').empty();
		
		this.statusSet('loading category  "'+categoryTitle(aCategory)+'"'+this.e);
		this.statusHide();

		this.setTitle(aCategory);
		
		parseCategory(categoryGetFromURL(aCategory), function(aCategory, aData){ ODPy.worldlinkerateGetCategories(aCategory, aData);});
	},
	worldlinkerateGetCategories : function(aCategory, aData)
	{
		aCategory = aCategory.replace(/\/$/, '');
		this.statusSet('looking for altlangs on "'+categoryTitle(aCategory)+'"');
		this.statusHide();
		
		this.toWorldLinkerate.read[aCategory] = true;
		this.toWorldLinkerate.readRead++;
		this.toWorldLinkerate.categories[this.toWorldLinkerate.categories.length] = aCategory;
		//read all alternative languages for this category ( if not yet )
		if(aData.alternative.length > 0)
		{
			for(var id in aData.alternative)
			{
				aData.alternative[id] = decodeURIComponent(aData.alternative[id].split('"')[1].split("#")[1].replace(/^\/Top\//, '').replace(/\/$/, ''));

				if(!this.toWorldLinkerate.read[aData.alternative[id]])
				{
					this.toWorldLinkerate.read[aData.alternative[id]] = true;
					this.statusSet('loading category "'+categoryTitle(aData.alternative[id])+'"');
					this.statusHide();
					this.toWorldLinkerate.readRemaining++;
					parseCategory(aData.alternative[id], function(aCategory, aData){ ODPy.worldlinkerateGetCategories(aCategory, aData);});
				}
			}
			this.toWorldLinkerate.categoriesAltlangs[aCategory] = aData.alternative;
			this.toWorldLinkerate.categoriesAltlangs[aCategory] = this.toWorldLinkerate.categoriesAltlangs[aCategory].sort(this.sortLocale);
		}
		
		if(this.toWorldLinkerate.readRemaining == this.toWorldLinkerate.readRead)
		{
			this.toWorldLinkerate.categories = this.toWorldLinkerate.categories.sort(this.sortLocale);
			var counter = 0;
			for(var id in this.toWorldLinkerate.categories)
			{
				counter++;
				var alllinked = true;
				for(var id2 in this.toWorldLinkerate.categories)
				{
					if(
						 this.toWorldLinkerate.categories[id2] != this.toWorldLinkerate.categories[id] 
						 && !inArray(this.toWorldLinkerate.categoriesAltlangs[this.toWorldLinkerate.categories[id]], this.toWorldLinkerate.categories[id2])
					)
					{
						alllinked = false;
						break;
					}
				}
				//display
					//counter	& checkbox
					$('.content').append('<br><input type="checkbox" value="'+this.toWorldLinkerate.categories[id]+'/" checked="checked" /> '+counter+' - ');
				
				if(alllinked)//if all linked italic
					$('.content').append('<i><a target="_blank" href="'+categoryGetURLPrivate(this.toWorldLinkerate.categories[id])+'">'+this.toWorldLinkerate.categories[id] +'</a></i>');
				else
					$('.content').append('<a target="_blank" href="'+categoryGetURLPrivate(this.toWorldLinkerate.categories[id])+'">'+this.toWorldLinkerate.categories[id] +'</a>');
				//show linked altlangs
				$('.content').append(' - <a href="javascript://" onclick="flipElement(this.nextSibling, this)">[show current '+this.toWorldLinkerate.categoriesAltlangs[this.toWorldLinkerate.categories[id]].length+' altlangs]</a><div style="display:none;margin-left:20px;">'+this.toWorldLinkerate.categoriesAltlangs[this.toWorldLinkerate.categories[id]].join("<br>\n")+'</div>')
			}
		}

	},
	sortLocale : function(a, b)
	{
		return trim(stripTags(a)).localeCompare(trim(stripTags(b)));
	},
};
