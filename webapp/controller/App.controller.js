sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("buscacnpj.ui5.controller.App", {

			onInit: function() {			
			this.getView().byId("idIconTabBarNoIcons").setVisible(false);
			//this.getView().byId("button").setEnabled(false);
		},

		consultaCnpj: function(oEvent) {

			// if para teste unitário
			if (this.getView().byId("inputCnpj").getValue().toString() == "") {
				this.getView().byId("button").setText("Selecionado");
				this.getView().byId("inputCnpj").setValue("12564060000116");
			}

			// this.getView().byId("button").setText("Selecionado");
			// this.getView().byId("inputCnpj").setValue("12564060000116");
		
			this.getView().byId("idIconTabBarNoIcons").setVisible(true);					
			var cnpj = this.getView().byId("inputCnpj").getValue().toString();

			// ternario para teste unitário 
			// cnpj = (cnpj == "") ? '12564060000116'  : "cnpj";
						
			var url = 'https://www.receitaws.com.br/v1/cnpj/' + cnpj.replace(/[^0-9]/g, '');
			var that = this;
			jQuery.ajax({
				method: "GET",
				url: url,
				"dataType": "jsonp",
				success: function (response) {
					console.log("response: ", response);
					var oModel = new JSONModel(response);
					that.getView().setModel(oModel, "data");									
					
					if (response.status == "ERROR") {
						MessageToast.show(response.message);
						$(".sapMMessageToast").addClass("sapMMessageToastDanger");
						that.onValueHelpRequest(oEvent);
					} else {
						MessageToast.show("Consulta efetuada com sucesso.");
						$(".sapMMessageToast").addClass("sapMMessageToastSuccess");
					}

				},
				error: function(error) {
					MessageToast.show("Consulta não efetuada com sucesso.");
					$(".sapMMessageToast").addClass("sapMMessageToastDanger");
					that.onValueHelpRequest(oEvent);
				}
			})
		},

		onValueHelpRequest: function(oEvent) {
			this.getView().byId("idIconTabBarNoIcons").setVisible(false);
			this.getView().byId("inputCnpj").setValue("");
			this.getView().byId("button").setEnabled(false);

			var msgOnInvalidInput = oEvent.getSource().data()["liveChangeMsgOnInvalidInput"];
			oEvent.getSource().setValueStateText(" ");
		},	

		onLiveChange: function(oEvent) {
			var inputValue = oEvent.getParameter('value').trim();
			inputValue = inputValue.replace(/[^\d]/g, '');
			inputValue = inputValue.substring(0, 14);

			var msgOnInvalidInput = oEvent.getSource().data()["liveChangeMsgOnInvalidInput"];
			if(inputValue.length < 14){
				oEvent.getSource().setValue(inputValue);								
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText(msgOnInvalidInput);
			} else {				
			 	oEvent.getSource().setValueStateText("CNPJ Válido");
				 this.getView().byId("button").setEnabled(true);
			}
						
			oEvent.getSource().setValue(inputValue);
		},

		toggleBusyIndicator: function(oEvent) {
			MessageToast.show("Clicou Botão busca cnpj");
		},

	});
});