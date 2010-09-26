	function flip(id, item)
	{
		flipElement($('#'+id), item)
	}
	function flipElement(item, element)
	{
		if(!item.style || !item.style.display || item.style.display == 'block')
		{
			item.style.display = 'none';
			element.setAttribute('opened', false);
		}
		else
		{
			item.style.display = 'block';
			element.setAttribute('opened', true);
		}
	}