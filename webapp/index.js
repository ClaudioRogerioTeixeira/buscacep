sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function(
	ComponentContainer
) {
	"use strict";

  sap.ui.getCore().attachInit(function () {
    new sap.m.Shell({
      app: new ComponentContainer({
        height: "100%",
        name: "buscacnpj.ui5"
      })
    }).placeAt("content")
  });

});