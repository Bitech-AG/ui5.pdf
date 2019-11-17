/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"bitech/demo/ui5/pdf/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});