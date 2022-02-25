sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
], function(
	Controller, MessageToast, JSONModel
) {
	"use strict";

	return Controller.extend("buscacep.controller.App", {

		/**
		 * @override
		 */
		onInit: function() {
			MessageToast.show('onInit...');
		}

	});
});