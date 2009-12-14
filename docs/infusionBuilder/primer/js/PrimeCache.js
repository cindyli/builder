/*
 Copyright 2008-2009 University of Cambridge
 Copyright 2008-2009 University of Toronto
 
 Licensed under the Educational Community License (ECL), Version 2.0 or the New
 BSD license. You may not use this file except in compliance with one these
 Licenses.
 
 You may obtain a copy of the ECL 2.0 License and BSD License at
 https://source.fluidproject.org/svn/LICENSE.txt
 
 */
/*global jQuery*/
/*global fluid*/

(function($) {

	var primer = function(that) {

		var moduleSelections = that.model.moduleSelections;
		for ( var i in moduleSelections) {
			$.ajax( {
				type : that.options.ajaxOptions.type,
				url : that.options.ajaxOptions.url,
				timeout : that.options.ajaxOptions.timeout,
				async : that.options.ajaxOptions.async,
				data : {
					moduleSelections : that.model.moduleSelections[i],
					typeSelections : that.model.typeSelections
				}
			});
		}
	}

	/**
	 * Sets up the event handlers for listeners.
	 * 
	 * @param {Object}
	 *            that, the component
	 */
	var bindEventHandlers = function(that) {

		var button = that.locate("initiatePriming");
		button.click(function() {
			button.attr('disabled', 'disabled');
			primer(that);
		});
	};

	/**
	 * Calls all of the setup functions that the component needs to run.
	 * 
	 * @param {Object}
	 *            that, the component
	 */
	var setup = function(that) {
		bindEventHandlers(that);
	};

	/**
	 * The creator function
	 * 
	 * @param {Object}
	 *            container, selector representing the components container
	 * @param {Object}
	 *            options, the options to be passed in to the component
	 */
	fluid.primeCache = function(container, options) {
		var that = fluid.initView("fluid.primeCache", container, options);

		that.model = {
			typeSelections: "minified",
			moduleSelections : [ "framework", "fss"]
		};

		setup(that);

		return that;
	};

	/**
	 * The component's defaults
	 */
	fluid.defaults("fluid.primeCache", {

		selectors : {
			initiatePriming : ".flc-primeCache-button"
		},
		ajaxOptions : {
			type : "POST",
			url : "../../php/builder.php",
			timeout : 120000,
			async: false
		}
	});

})(jQuery);