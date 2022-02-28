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
			this.getView().byId("button").setEnabled(false);
		},

		consultarCep: function(oEvent) {
			// this.getView().byId("idIconTabBarNoIcons").setVisible(true);					
			var cep = this.getView().byId("inputCep").getValue().toString();
			var url = 'https://viacep.com.br/ws/' + cep.replace(/[^0-9]/g, '') + '/json/';
			var that = this;

			jQuery.ajax({
				method: "GET",
				url: url,
				"dataType": "jsonp",
				success: function (response) {

					if (response.erro) {
						MessageToast.show("Cep Inválido");
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");						
						that.onValueHelpRequest(oEvent);
						// console.log("If response.erro: ", response.erro);
						
					} else {
						that.getView().byId("idIconTabBarNoIcons").setVisible(true);					
						var oModel = new JSONModel(response);
						// console.log('oModel: ', oModel);
						that.getView().setModel(oModel, "data");									
						
						if (response.status == "ERROR") {
							MessageToast.show(response.message);
							$(".sapMMessageToast").addClass("sapMMessageToastDanger");
							// that.onValueHelpRequest(oEvent);
						} else {
							MessageToast.show("Consulta efetuada com sucesso.");
							$(".sapMMessageToast").addClass("sapMMessageToastSuccess");
						}
					}					

				},
				error: function(error) {
					MessageToast.show("Consulta não efetuada com sucesso.");
					$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					// that.onValueHelpRequest(oEvent);
				}
			})			

		},

		onValueHelpRequest: function(oEvent) {
			this.getView().byId("idIconTabBarNoIcons").setVisible(false);
			this.getView().byId("inputCep").setValue("");
			this.getView().byId("button").setEnabled(false);

			var msgOnInvalidInput = oEvent.getSource().data()["liveChangeMsgOnInvalidInput"];
			oEvent.getSource().setValueStateText(" ");
		},

		onLiveChange: function(oEvent) {
			var inputValue = oEvent.getParameter('value').trim();
			inputValue = inputValue.replace(/[^\d]/g, '');
			inputValue = inputValue.substring(0, 8);

			var msgOnInvalidInput = oEvent.getSource().data()["liveChangeMsgOnInvalidInput"];
			if(inputValue.length < 8){
				oEvent.getSource().setValue(inputValue);								
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText(msgOnInvalidInput);
			} else {				
			 	oEvent.getSource().setValueStateText("CEP Válido");
				this.getView().byId("button").setEnabled(true);
				oEvent.getSource().setValueState("Success");
			}
						
			oEvent.getSource().setValue(inputValue);
		}

	});
});