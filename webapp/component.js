sap.ui.define([
	"sap/ui/core/UIComponent"
], function(
	UIComponent
) {
	"use strict";

	return UIComponent.extend("buscacnpj.ui5.component", {
		
		metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments)

			// create tehe views based on the uri/hash
			// inicializa as rotas (manifest)
			this.getRouter().initialize();
    }

	});
});