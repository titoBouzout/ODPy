/*
	Main javascript object..
*/

ODP = {	

	e : '…', /* ellipsis shortcut */

	load : function()// loads the starting inteface..
	{
		//first the status bar
		this.status = $('.status');
		this.statusSet('loading document'+this.e);
		this.statusHide();

		//now load basis elements
		this.loadElements();

		//display document loaded
		this.statusSet('document loaded'+this.e);
		this.statusHide();
	},
	loadElements : function()// loads basic inteface elements
	{
	},
	loadCategory : function(aCategory)// loads a new category
	{
		if(aCategory != this.loadedCategory)
		{
			this.loadedCategory = aCategory;
			
			this.statusSet('loading category '+aCategory+this.e);
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
	}
	
	,
};
