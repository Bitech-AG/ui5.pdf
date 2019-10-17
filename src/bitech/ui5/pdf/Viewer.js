sap.ui.define([
    "sap/ui/core/XMLComposite"
], function (Composite) {
    return Composite.extend("bitech.ui5.pdf.Viewer", {
        metadata: {
            properties: {
                height: "sap.ui.core.CSSSize",
                minPagesForSmallNavigation: {
                    type: "int",
                    defaultValue: 2
                },
                minPagesForBigNavigation: {
                    type: "int",
                    defaultValue: 3
                },
                scale: "string",
                src: "string",
                noDataText: {
                    type: "string",
                    defaultValue: "noDataText"
                },
                title: "string",
                width: "sap.ui.core.CSSSize"
            }
        },
        fragment: "bitech.ui5.pdf.Viewer",

        init: function () {
            var oDocument = this.byId("Document");

            oDocument.attachEvent("documentLoaded", null, this._onDocumentLoaded.bind(this));
            oDocument.attachEvent("drawn", null, this._onDocumentDrawn.bind(this));
        },

        _toFirstPage: function(oEvent) {
            var oDocument = this.byId("Document");

            oDocument.setPage(1);
        },

        _toLastPage: function(oEvent) {
            var oDocument = this.byId("Document");

            oDocument.setPage(oDocument.getPageCount());
        },

        _toNextPage: function(oEvent) {
            var oDocument = this.byId("Document");

            oDocument.setPage(oDocument.getPage() + 1);
        },

        _onDocumentDrawn: function(oEvent) {
            var oDocument = oEvent.getSource(),
                oZoomInput = this.byId("zoomInput"),
                oZoomIn = this.byId("zoomIn"),
                oZoomOut = this.byId("zoomOut");

            oZoomInput.setValue((oDocument.getScale() * 100).toFixed(2));
            oZoomInput.setVisible(true);
            oZoomIn.setVisible(true);
            oZoomOut.setVisible(true);
        },

        _onDocumentLoaded: function (oEvent) {
            var oDocument = oEvent.getSource();

            this.getResourceBundle().then(function (oBundle) {
                var oPageCountLabel = this.byId("pageCountLabel")
                    oPageInput = this.byId("pageInput"),
                    oFirstButton = this.byId("firstButton"),
                    oPrevButton = this.byId("prevButton"),
                    oNextButton = this.byId("nextButton"),
                    oLastButton = this.byId("lastButton");

                oFirstButton.setVisible(this.getMinPagesForBigNavigation() <= oDocument.getPageCount());
                oPrevButton.setVisible(this.getMinPagesForSmallNavigation() <= oDocument.getPageCount());

                if (oDocument.getPageCount() > 1) {
                    oPageCountLabel.setText(oBundle.getText("pageCountText", [oDocument.getPageCount()]));

                }
                oPageInput.setVisible(oDocument.getPageCount() > 1);
                oPageInput.setValue(1);
                oPageCountLabel.setVisible(oDocument.getPageCount() > 1);
                
                oNextButton.setVisible(this.getMinPagesForSmallNavigation() <= oDocument.getPageCount());
                oLastButton.setVisible(this.getMinPagesForBigNavigation() <= oDocument.getPageCount());

                this._onPageSelected({
                    getSource: function () {
                        return oDocument;
                    }
                })
            }.bind(this));
        },

        _onPageSelected: function(oEvent) {
            var oDocument = oEvent.getSource(),
                oPageInput = this.byId("pageInput"),
                oFirstButton = this.byId("firstButton"),
                oPrevButton = this.byId("prevButton"),
                oNextButton = this.byId("nextButton"),
                oLastButton = this.byId("lastButton");

            oFirstButton.setEnabled(oDocument.getPage() > 1);
            oPrevButton.setEnabled(oDocument.getPage() > 1);
            oPageInput.setValue(oDocument.getPage());
            oNextButton.setEnabled(oDocument.getPage() < oDocument.getPageCount());
            oLastButton.setEnabled(oDocument.getPage() < oDocument.getPageCount());
        },

        _toPrevPage: function(oEvent) {
            var oDocument = this.byId("Document");

            oDocument.setPage(oDocument.getPage() - 1);
        },

        _uploadFile: function (oEvent) {
            var oReader = new FileReader(),
                oFiles = oEvent.getParameter("files");

            if (!oFiles || !oFiles.length) {
                return;
            }
            this.setBusy(true);

            oReader.onload = function (oEvent) {
                var oDocument = this.byId("Document");
    
                oDocument.setScale();
                this.setSrc(oEvent.target.result);
            }.bind(this);

            this.setTitle(oFiles[0].name);

            oReader.readAsDataURL(oFiles[0]);
        },

        _onChangePageNumber: function (oEvent) {
            var iValue = +oEvent.getParameter("value"),
                oDocument = this.byId("Document");

            oDocument.setPage(iValue);
        },

        _onChangeZoom: function(oEvent) {
            var oZoomInput = oEvent.getSource(),
                nValue = oZoomInput.getValue(),
                oDocument = this.byId("Document");

            nValue = nValue ? nValue / 100 : nValue;

            oDocument.setScale(nValue);

        },

        _zoom: function(nStep) {
            var oDocument = this.byId("Document"),
                nValue = oDocument.getScale();
            
            nValue = nValue + nStep < 0 ? 0 : nValue + nStep;

            oDocument.setScale(nValue);
        },

        _zoomIn: function() {
            this._zoom(0.25);
        },

        _zoomOut: function() {
            this._zoom(-0.25);
        }
    });
}, true);