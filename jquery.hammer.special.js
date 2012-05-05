(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'hammer'], factory);
	} else {
		// Browser globals
		factory(jQuery, Hammer);
	}
}(function (jQuery, Hammer) {
/*
 * Hammer.JS jQuery Special Events plugin
 * version 0.1.1
 * author: Burin Asavesna
 * https://github.com/burin/jquery-hammer-special
 */
var events = ['hold','tap','doubletap','transformstart','transform','transformend','dragstart','drag','dragend','release'];

function triggerCustomEvent( obj, eventType, event ) {
	var originalType = event.type;
	event.type = eventType;
	$.event.handle.call( obj, event );
	event.type = originalType;
}

function createSpecialEventSetup(index) {
	return function() {
		var thisObject = this,
			$this = $( thisObject );

		var hammer = new Hammer( thisObject );

		hammer['on'+ events[index]] = (function($this, eventName) {
			return function( event ) {
				var origTarget = event.originalEvent.target;
				return triggerCustomEvent( thisObject, eventName, $.Event( eventName, { target: origTarget, delegateTarget: thisObject } ));
			};
		})($this, events[index]);

	};
}

for(var i=0; i<events.length; i++) {
	$.event.special[events[i]] = {
		setup: createSpecialEventSetup(i)
	};
}

}));

