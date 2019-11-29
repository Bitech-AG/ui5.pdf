sap.ui.define([
	"sap/ui/core/Control"
], function (Control, Pdf) {
	"use strict";

	return Control.extend("bitech.ui5.pdf.Page", {
		metadata: {
			properties: {
				scale: "float",
				number: "int"
			},
			events: {
				click: {},
				drawn: { },
				scaleDetermined: {
					parameters: {
						scale: "float"
					}
				}
			},
			aggregations: {
				_pages: {
					type: "bitech.ui5.pdf.Page",
					multiple: true,
					visibillity: "hidden"
				}
			}
		},
		renderer: function (oRm, oControl) {
			oRm.write("<div ");
			oRm.addClass("bitechUi5PdfPage");
			oRm.writeClasses();
			oRm.writeControlData(oControl);
			oRm.write("><canvas></canvas></div>");
		},

		setPage: function (oPdf, iPageNumber) {
			this.oPdf = oPdf;
			this.setProperty("number", iPageNumber, true);
		},
		
		onAfterRendering: function () {
			if (sap.ui.core.Control.prototype.onAfterRendering) {
				sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments);
			}
			
			if(!this.oPdf) {
				return;
			}
			
			this.oPdf.getPage(this.getNumber()).then(function (oPage) {
				// you can now use *page* here
				var oViewport, nScale,
					oDomRef = this.getDomRef();

				// Determination of scale
				var oParent = oDomRef.parentNode;

				oViewport = oPage.getViewport({ scale: 1 });
				
				if(oParent.localName === "aside") {
					// determine preview scale
					nScale = oDomRef.clientWidth / oViewport.width;

				} else {
					// determine page scale
					nScale = this.getParent().getScale();

					nScale = typeof nScale !== "undefined" ? nScale : oDomRef.clientWidth / oViewport.width;

					this.fireEvent("scaleDetermined", {
						scale: nScale
					});
				}
					
				oViewport = oPage.getViewport({ scale: nScale });

				// Prepare canvas using PDF page dimensions
				var oCanvas = oDomRef.firstChild;
				var oContext = oCanvas.getContext("2d");
				oCanvas.height = oViewport.height;
				oCanvas.width = oViewport.width;

				// Render PDF page into canvas context
				var oRenderContext = {
					canvasContext: oContext,
					viewport: oViewport
				};
				var oRenderTask = oPage.render(oRenderContext);
				oRenderTask.promise.then(function () {
					this.fireEvent("drawn");
				}.bind(this));

				this.setBusy(false);
			}.bind(this));
		},

		onclick: function(){
			this.toggleStyleClass("bitechUi5PdfSelected");
			this.fireEvent("click");
		}
	});
});