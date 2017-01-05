/**
 * @Title: 		vjs
 * @Descr: 	 	A javascript library for native DOM manipulation
 * @Package: 	Javascript
 * @Copyright: 	Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author: 	Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

var vjs = {
	addClass: function(object, classname) {

		// Add class, string only
		if (object !== undefined && object.className.indexOf(classname) < 0) {
			object.className += ' ' + classname;
		}
	},

	removeClass: function(object, classname) {

		// Remove class, string only
		if (object !== undefined && object.className.indexOf(classname) >= 0) {
			object.className = object.className.replace(' ' + classname, '');
		}
	},

	toggleClass: function(object, classname) {

		// Toggle class, string only
		if (object !== undefined && object.className.indexOf(classname) >= 0) {
			object.className = object.className.replace(' ' + classname, '');
		}	else {
			object.className += ' ' + classname;
		}
	},

	closest: function (element, identifier) {

		// Return the closest parent element which matches the given identifier, counted from the first given element.
		var result = document.querySelectorAll(identifier);
		for (var i=0; i<result.length; i++) {
			var object = element;
			while (object !== result[i] && object.parentNode !== null) {
				object = object.parentNode;
			}
			if (object !== document) {
				return object;
			}
		}
	},

	capitalize: function (string) {
		
		// Turn the first letter of the given string uppercase.
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
