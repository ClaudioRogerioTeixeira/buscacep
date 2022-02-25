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
			this.getView().byId("idIconTabBarNoIcons").setVisible(false);
		},

		consultarCep: function(oEvent) {
			this.getView().byId("idIconTabBarNoIcons").setVisible(true);					
			var cep = this.getView().byId("inputCep").getValue().toString();
			var url = 'https://viacep.com.br/ws/' + cep.replace(/[^0-9]/g, '') + '/json/';
			var that = this;

			const options = {
				method: 'GET',
				mode: 'no-cors',
				async: true, 
				cache: 'default'
				// 	headers: {
				// 		'Accept': 'application/json',
				// 		'Content-Type': 'application/json'					
				// }
			}

			// fetch('https://viacep.com.br/ws/14780350/json/', options)
			// 	.then((response) => response.json())
			// 	.then((response) => console.log('dados: ', response))

			jQuery.ajax({
				method: "GET",
				url: url,
				"dataType": "jsonp",
				success: function (response) {
					// console.log("response: ", response);
					var oModel = new JSONModel(response);
					console.log('oModel: ', oModel);
					that.getView().setModel(oModel, "data");									
					
					if (response.status == "ERROR") {
						MessageToast.show(response.message);
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
						// that.onValueHelpRequest(oEvent);
					} else {
						MessageToast.show("Consulta efetuada com sucesso.");
						$(".sapMMessageToast").addClass("sapMMessageToastSuccess");
					}

				},
				error: function(error) {
					MessageToast.show("Consulta não efetuada com sucesso.");
					$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					// that.onValueHelpRequest(oEvent);
				}
			})			


		}

	});
});