sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast
) {
	"use strict";

	return Controller.extend("buscacnpj.ui5.controller.Testbuttonopa5", {
		onPress: function(oEvent) {
			MessageToast.show("Button Pressed");
			this.byId("pressMeButton").setText("I got pressed");
		},
		
		onInit: function() {
			var that = this;
			// that.byId("pressMeButton").setVisible(false);
			
			window.setTimeout(function() {
				that.byId("pressMeButton").setVisible(true);
			}, Math.random() * 10000);

		},  

	});

});
// }, true);

// "Controller" required from module "sap/ui/core/mvc/Controller"
// Controller.create({
//   name: "buscacnpj.ui5.controller.Testbuttonopa5"
// });