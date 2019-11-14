sap.ui.define([
    'sap/ui/core/Control'
], function(Control) {
    'use strict';
    
    return Control.extend("bitech.ui5.pdf.Container", {
        metadata: {
            properties: {
                width: "sap.ui.core.CSSSize",
                height: "sap.ui.core.CSSSize"
            },
            aggregations: {
                header : {
                    type: "sap.ui.core.Control",
                    multiple: true
                },
                content : {
                    type: "sap.ui.core.Control",
                    multiple: true
                },
                footer : {
                    type: "sap.ui.core.Control",
                    multiple: true
                }
            },
            defaultAggregation: "content"
        },

        renderer(oRm, oControl) {
            oRm.write("<div ");
            oRm.writeControlData(oControl);

            // render style attribute
            if(oControl.getWidth()) {
                oRm.addStyle('width', oControl.getWidth()); 
            }
            if(oControl.getHeight()) {
                oRm.addStyle('height', oControl.getHeight()); 
            }
            oRm.writeStyles();

            oRm.write(">");
            
            oControl._renderAggregation("header", "bitechUi5PdfContainerHeader", oRm, oControl);

            var oContent = oControl.getAggregation("content");
            if(oContent) {
                oRm.write("<div ");
                oRm.addClass("bitechUi5PdfContainerContent");
                oRm.writeClasses();
                oRm.write(">");

                oContent.forEach(function(oItem) {
                    oRm.renderControl(oItem);
                });

                oRm.write("</div>");
            }

            oControl._renderAggregation("footer", "bitechUi5PdfContainerFooter", oRm, oControl);

            oRm.write("</div>");
        },

        _renderAggregation: function(sTag, sClass, oRm, oControl) {
            var oAggregation = oControl.getAggregation(sTag);

            if(oAggregation) {
                oRm.write("<" + sTag + " ");
                oRm.addClass(sClass);
                oRm.writeClasses();
                oRm.write(">");
    
                oAggregation.forEach(function(oItem) {
                    oRm.renderControl(oItem);
                });
    
                oRm.write("</" + sTag + ">");
            }
        }
    });
});