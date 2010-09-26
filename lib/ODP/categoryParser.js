	function parseCategory(aCategory, aFunction)
	{
		if(document.location.host == '' || document.location.host == 'localhost'  )
			var url = 'test.html';
		else
			var url = categoryGetURLPrivate(aCategory);
		$.ajax({
			type: "GET",
			url: url,
			dataType:'html',
			success: function(responseText)
			{
				var aData = {};
					aData.categories = [];
					aData.alternative = [];
					aData.related = [];
					aData.sitesCooled = [];
					aData.sites = [];
					aData.alphabar = [];
					aData.groups = [];
					aData.editors = [];
					aData.moz = '';
					
					var tmp = 0;
					
					//subcategories and links
					$(responseText).find('.dir-1').each(function()
														{
															aData.categories[tmp] = [];
															$(this).find('li').each(function()
															{
																aData.categories[tmp][aData.categories[tmp].length] = $(this).html().replace(/href="/, 'href="#/Top');
															})
															aData.categories[tmp].sort(ODPy.sortLocale);
															tmp++;
														});
					//alternative languages
					$(responseText).find('.language').find('li').each(function()
														{
															aData.alternative[aData.alternative.length] = $(this).html().replace(/href="/, 'href="#/Top');
														});
					aData.alternative = aData.alternative.sort(ODPy.sortLocale);
					
					//related categories
					$(responseText).find('fieldset.fieldcap .directory').find('li').each(function()
														{
															aData.related[aData.related.length] = $(this).html().replace(/href="/, 'href="#/Top');
														});
					aData.related.sort(ODPy.sortLocale);
					
					//sites cooled
					$(responseText).find('.directory-url').find('li.star').each(function()
														{
															aData.sitesCooled[aData.sitesCooled.length] = $(this).html().replace(/href="/, ' target="_blank" href="');
														});
					//alert(aData.sitesCooled.toString());
					aData.sitesCooled.sort(ODPy.sortLocale);
					
					//sites not cooled
					$(responseText).find('.directory-url').find('li:not(.star)').each(function()
														{
															aData.sites[aData.sites.length] = $(this).html().replace(/href="/, ' target="_blank" href="');
														});
					aData.sites.sort(ODPy.sortLocale);
					
					//alphabar
					$(responseText).find('.alphanumeric a').each(function()
														{
															aData.alphabar[aData.alphabar.length] = $(this).html();
														});
					aData.alphabar.sort(ODPy.sortLocale);
					
					//groups
					$(responseText).find('.fieldcapRn .float-l li:first').each(function()
														{
															var item = $(this).html();
															if(item.indexOf('search') != -1){}
															else
																aData.groups[aData.groups.length] = item;
															return;
														});
					aData.groups.sort(ODPy.sortLocale);
					
					//editors
					$(responseText).find('.volEditN a').each(function()
														{
															if(trim(stripTags($(this).html())))
																aData.editors[aData.editors.length] = '<a href="http://editors.dmoz.org/public/profile?editor='+$(this).html()+'">'+$(this).html()+'</a>';
														});
					//mozzie
					if(responseText.indexOf('img/moz') != -1)
					{
						try { aData.moz = responseText.split('/img/moz/')[1].split('"')[0]; } catch(e){}
					}
					
					//aData.editors.sort(ODPy.sortLocale);
					
					aFunction(aCategory, aData);
			},
			error :function()
			{
				ODPy.statusSet('Error category  "'+categoryTitle(aCategory)+'" no exists');
				ODPy.statusHide();
			}
		});
	}
