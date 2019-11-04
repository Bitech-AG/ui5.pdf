sap.ui.define([
    "bitech/ui5/pdf/Viewer"
], function (Viewer) {
	"use strict";
	
	new Viewer({
		width: "100%",
		height: "100%"
	}).placeAt("viewer");

});