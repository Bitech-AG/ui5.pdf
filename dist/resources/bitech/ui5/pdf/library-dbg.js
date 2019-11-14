/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library bitech.ui5.pdf.
 */
sap.ui.define([], function () {
		"use strict";

		/**
		 * An example library containing pdf viewer
		 *
		 * @namespace
		 * @name bitech.ui5.pdf
		 * @public
		 */
		sap.ui.getCore().initLibrary({
			name: "bitech.ui5.pdf",
			dependecies: [
				"sap.m"
			],
			types: [],
			interfaces: [],
			controls: [
				"src.bitech.ui5.pdf.Document",
				"src.bitech.ui5.pdf.Page",
				"src.bitech.ui5.pdf.Viewer"
			],
			noLibraryCSS: false,
			version: "1.1.6"
		});

		return bitech.ui5.pdf;
	},
	false); //bExport