sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/unified/FileUploader",
	"mozilla/pdfjs/build/pdf.min",
	"bitech/ui5/pdf/Page"
], function (Control, FileUploader, pdf, Page) {
	"use strict";

	return Control.extend("bitech.ui5.pdf.Document", {
		metadata: {
			properties: {
				scale: "float",
				src: "string",
				noDataText: "string",
				page: {
					type: "int",
					defaultValue: 1
				},
				pageCount: "int"
			},
			aggregations: {
				_pages: {
					type: "bitech.ui5.pdf.Page",
					multiple: true,
					visibillity: "hidden"
				},
				_previewPages: {
					type: "bitech.ui5.pdf.Page",
					multiple: true,
					visibillity: "hidden"
				}
			},
			events: {
				documentLoaded: {},
				drawn: {},
				pageSelected: {}
			}
		},
		init: function () {
		},

		onPageClick: function (oEvent) {
			var oPreviewPages = this.getAggregation("_previewPages"),
				oPage = oEvent.getSource();

			this.setPage(oPage.getNumber());

			oPreviewPages.forEach(function (oPagePreview) {
				if (oPagePreview != oPage) {
					oPagePreview.removeStyleClass("bitechUi5PdfSelected");
				}
			});
		},

		setPage: function (iPageNumber) {
			this.setProperty("page", iPageNumber, true);

			var oPages = this.getAggregation("_pages");

			if (iPageNumber < 1 || iPageNumber > oPages.length) {
				throw new Error("PageNumberIsOutOfRange");
			}

			var oPage = oPages[iPageNumber - 1],
				oDomPage = oPage.getDomRef()

			oDomPage.scrollIntoView();

			this.fireEvent("pageSelected");

		},

		loadDocument: function (sSource) {
			this.setBusy(true);

			var oCore = sap.ui.getCore(),
				oBundle = oCore.getLibraryResourceBundle("mozilla.pdfjs"),
				sModulePath;

			// library is bounded
			sModulePath = oBundle.oUrlInfo.url.replace("messagebundle.properties", "");

			/* global pdfjsLib:true */
			// pdf.js version v 2.1.266
			pdfjsLib.GlobalWorkerOptions.workerSrc = sModulePath + "build/pdf.worker.min.js";
			pdfjsLib.getDocument(this.getSrc()).promise.then(function (oPdf) {
				var oPage, oPagePreview;

				this.setPageCount(oPdf.numPages);
				this.fireEvent("documentLoaded");

				for (var i = 1; i <= oPdf.numPages; ++i) {
					oPage = new Page();
					oPagePreview = new Page()

					oPage.setBusy(true);
					oPagePreview.setBusy(true);

					if (i === 1) {
						oPage.attachEvent("scaleDetermined", function (oEvent) {
							this.setProperty("scale", oEvent.getParameter("scale"), true);
						}.bind(this));
					}

					this.addAggregation("_pages", oPage);
					this.addAggregation("_previewPages", oPagePreview);

					oPagePreview.attachEvent("click", this.onPageClick.bind(this));

					oPage.setPage(oPdf, i);
					oPagePreview.setPage(oPdf, i);

					if (i === oPdf.numPages) {
						oPage.attachEvent("drawn", null, function () {
							this.setBusy(false);
							this.fireEvent("drawn");
						}.bind(this));
					}
				}

			}.bind(this), function (sReason) {
				throw new Error(sReason);
			});
		},

		renderer: function (oRm, oControl) {
			oRm.write("<div ");
			oRm.writeControlData(oControl);
			oRm.addClass("bitechUi5PdfDocument");
			oRm.writeClasses();
			oRm.write(">");

			// rendering des Preview
			if (oControl.getAggregation("_previewPages")) {
				oRm.write("<aside ");
				oRm.addClass("bitechUi5PdfPreview");
				oRm.writeClasses();
				oRm.write(">");
				oControl._renderPages(oRm, oControl, "_previewPages");
				oRm.write("</aside>");
			}

			// rendering pages
			if (oControl.getAggregation("_pages")) {
				oRm.write("<div ");
				oRm.addClass("bitechUi5PdfPages");
				oRm.writeClasses();
				oRm.write(">");
				oControl._renderPages(oRm, oControl, "_pages");
				oRm.write("</div>");
			}

			//rendering no data text
			if (oControl.getNoDataText() && !oControl.getAggregation("_pages")) {
				oRm.write("<div ");
				oRm.addClass("sapMListNoData");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write(oControl.getNoDataText());
				oRm.write("</div>");
			}

			oRm.write("</div>");
		},

		setSrc: function (sSource) {
			if (sSource !== this.getSrc()) {
				this.setProperty("src", sSource, false);

				this.removeAllAggregation("_pages");
				this.removeAllAggregation("_previewPages");

				if (sSource) {
					this.loadDocument(sSource);
				}
			}
		},

		_renderPages: function (oRm, oControl, sAggregetation) {
			if (oControl.getAggregation(sAggregetation)) {
				oControl.getAggregation(sAggregetation).forEach(function (oPage) {
					oRm.renderControl(oPage);
				});

			}
		}
	});
});