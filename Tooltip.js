/* 
 * Javascript tooltip
 * Author: Carlos Eugênio Torres <carloseugeniotorres@gmail.com>
 * Date: 26/02/2008
 * Version: 1.1
 */

/* 
 * Tooltip object 
 */
var Tooltip =
{
	_tooltipBox: null,
	_tooltipTop: 0,
	_tooltipLeft: 0,
	_tooltipOffsetTop: 20,
	
	create: function()
	{
		try
		{
			this._tooltipBox = document.createElement("div");
			this._tooltipBox.id = "tooltipBox";
			this._tooltipBox.className = "tooltipBox";
			this._tooltipBox.style.visibility = "hidden";
			this._tooltipBox.style.top = "0px";
			this._tooltipBox.style.left = "0px";
			document.body.appendChild(this._tooltipBox);
		}
		catch(e)
		{
			alert("Error on trying to create tooltip box:\n" + e);
		}
	},
	
	show: function(evt, text)
	{
		if (!this._tooltipBox)
			this.create();
	
		try
		{
			this.cursorUpdate(evt);
			this._tooltipBox.innerHTML = text;
			this._tooltipBox.style.visibility = "visible";
			addEvent(getEventTarget(evt), "mousemove", Tooltip.cursorUpdate, this);
			addEvent(getEventTarget(evt), "mouseout", Tooltip.hide, this);
			return true;
		}
		catch(e)
		{
			alert("Error on trying to show tooltip:\n" + e);
			return false;
		}
	},
	
	hide: function(evt)
	{
		if (this._tooltipBox)
		{
			try 
			{
				this._tooltipBox.style.visibility = "hidden";
				removeEvent(getEventTarget(evt), "mousemove", Tooltip.cursorUpdate, this);
				removeEvent(getEventTarget(evt), "mouseout", Tooltip.hide, this);
				return true;
			}
			catch (e) 
			{
				alert("Error on trying to hide tooltip:\n" + e);
				return false;
			}
		}
	},
		
	cursorUpdate: function(evt)
	{
		if (this._tooltipBox)
		{
			this._tooltipLeft = getEventX(evt);
			this._tooltipTop = getEventY(evt) + this._tooltipOffsetTop;
			this._tooltipBox.style.top = this._tooltipTop + "px";
			this._tooltipBox.style.left = this._tooltipLeft + "px";
		}
	}
}

/* --------------------------------------------------------------
 * Util functions 
 * --------------------------------------------------------------
 */

var isIE = document.all;
var isN6 = document.getElementById&&!document.all; 

/*
 * Add infinite event handlers to an element
 * o = element
 * e = event name (without the "on" prefix)
 * f = function handler (it receives the event as first param and the "this" references to the element)
 * s = scope
 *
 * Credits: Carlos R. L. Rodrigues <rodrigolr@uol.com.br> and Jonas Raoni Soares Silva <jonasraoni@gmail.com>
 */
function addEvent(o, e, f, s)
{
	var r = o[r = "_" + (e = "on" + e)] = o[r] || (o[e] ? [[o[e], o]] : []), a, c, d;
	r[r.length] = [f, s || o], o[e] = function(e){
		try{
			(e = e || event).preventDefault || (e.preventDefault = function(){e.returnValue = false;});
			e.stopPropagation || (e.stopPropagation = function(){e.cancelBubble = true;});
			e.target || (e.target = e.srcElement || null);
			e.key = (e.which + 1 || e.keyCode + 1) - 1 || 0;
		}catch(f){}
		for(d = 1, f = r.length; f; r[--f] && (a = r[f][0], o = r[f][1], a.call ? c = a.call(o, e) : (o._ = a, c = o._(e), o._ = null), d &= c !== false));
		return e = null, !!d;
    }
}

/* 
 * Remove an event handler from an element
 * o = element
 * e = event name (without the "on" prefix)
 * f = function handler
 * s = scope
 *
 * Credits: Carlos R. L. Rodrigues <rodrigolr@uol.com.br> and Jonas Raoni Soares Silva <jonasraoni@gmail.com>
 */
function removeEvent(o, e, f, s)
{
	for(var i = (e = o["_on" + e] || []).length; i;)
		if(e[--i] && e[i][0] == f && (s || o) == e[i][1])
			return delete e[i];
	return false;
}

/*
 * Return the source element of the event
 */
function getEventTarget(evt)
{
	return (isN6 ? evt.target : event.srcElement);
} 

/*
 * Returns the client X position related to the event
 */
function getEventX(evt)
{
	var x;
	if (isIE) 
		x = event.clientX + document.body.scrollLeft;
	else 
		x = evt.clientX;
	return (x < 0 ? 0 : x);
}

/*
 * Returns the client Y position related to the event
 */
function getEventY(evt)
{
	var y;
	if (isIE) 
		y = event.clientY + document.body.scrollTop;
	else 
		y = evt.clientY;
	return (y < 0 ? 0 : y);
}