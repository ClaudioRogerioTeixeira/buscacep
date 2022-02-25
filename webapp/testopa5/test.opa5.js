QUnit.config.autostart = false; 

sap.ui.require([
  "sap/ui/test/Opa5",
  "sap/ui/test/opaQunit",    
  "sap/ui/test/actions/EnterText",
  "sap/ui/test/actions/Press",  
  "sap/ui/test/matchers/PropertyStrictEquals",
  "sap/m/MessageToast",
], function(Opa5, opaTest, EnterText, Press, PropertyStrictEquals, MessageToast) {
  "use strict";

  Opa5.extendConfig({        
		viewNamespace: "view.App",
		autoWait : true    
  });

  // var incluirCNPJInput = {
	// 	controlType: "sap.m.Input",
	// 	matchers: new PropertyStrictEquals({
	// 		name: "tooltip",
	// 		value: "Digite o CNPJ da empresa"
	// 	}),
	// 	actions:  new EnterText({text: "12564060000116"}),
	// 	errorMessage: "Input não encontrado",
  //   success : function () {     
  //     Opa5.assert.ok(true, "alterou o input");
  //     // Opa5.assert.strictEqual( $("#inputCnpj").val(cnpj), cnpj, "Input Preenchido igualmente: " + cnpj);           
	// 	}
	//};

  // código OK não alterar
  var selecionarCNPJ = {
		controlType: "sap.m.Button",
		matchers: new PropertyStrictEquals({
			name: "text",
			value: "Selecionar"
		}),
		actions: new Press(),   
		errorMessage: "O botão não foi encontrado",
    success : function () {   
      Opa5.assert.ok(true, "Botão Clicado - Seleção CNPJ Iniciada");
      Opa5.assert.ok(true, "Consulta Realizado com sucesso");
		}
	};

  QUnit.module("Async - Ajax Mock Test", {
		beforeEach: function (assert) {
      assert.ok(true, "Inicio do Teste - OPA5");
		},
		afterEach: function (assert) {
			assert.ok(true, "Final do Teste - OPA5");
		}
	});

  opaTest("Pressionando o Botão", function(Given, When, Then) {
     
    Given.iStartMyAppInAFrame("../index.html");

    // When.waitFor(incluirCNPJInput);

    When.waitFor({
      id: new RegExp("inputCnpj"),
      // If you want you can provide multiple actions
      // actions: new EnterText({ text: "Hello " }),
      actions: new EnterText({
				keepFocus: true,
        text: "Jo"
			}),
      success : function (aInputs) {
				Opa5.assert.ok(true, "Input encontrado pelo id: " + aInputs[0]);
			},
    });


    // when ok não apagar
    When.waitFor(selecionarCNPJ);

    Then.waitFor({
			id: new RegExp("button"),
			success : function (aButtons) {
				Opa5.assert.ok(true, "Botão Selecionar Encontrado: " + aButtons[0]);
			},
			errorMessage : "Não encontrou o botão com o id correspondente"
		});

    Then.waitFor({
			id: new RegExp("inputCnpj"),
			success : function (aInputs) {
				Opa5.assert.ok(true, "Input inputCnpj Encontrado: " + aInputs[0]);
			},
			errorMessage : "Não encontrou o botão com o id correspondente"
		});

    // When.waitFor({
    //   // id: "inputCnpj",
    //   id: new RegExp("inputCnpj"),
    //   actions: new EnterText({
    //       text: "Incluindo Texto",
    //       keepFocus: true
    //   }),
    //   errorMessage: "Input inputCnpj não encontrado",
    // })


    // Given = arrangements (Dado = arranjos)
    // When = actions (Quando = ações)
    // Then = assertions (Então = afirmações)

    // remove o iframe com o index.html 
    // new Opa5().iTeardownMyAppFrame();  
    
  });
 
  QUnit.start();
    
});
