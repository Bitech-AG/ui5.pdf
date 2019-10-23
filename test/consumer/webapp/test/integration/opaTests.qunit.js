/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ui5lab/rm/file/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});