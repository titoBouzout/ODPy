/*
	Main javascript object..
*/

var ODPy = {
	
	/* loads the starting inteface..*/
	load : function()
	{
		/* loading category box */
		
			this.categoryFocused = $('#category');
			
			// adding an initial value to the category box ( the initial value comes from title attribute loaded by jquery.inputDefault.js )
			
			this.categoryFocused.inputDefault();
	}
};