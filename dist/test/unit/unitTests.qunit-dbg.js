/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"bitech/demo/ui5/pdf/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});