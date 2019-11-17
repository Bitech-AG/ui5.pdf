//@ui5-bundle bitech/ui5/pdf/library-preload.js
sap.ui.predefine("bitech/ui5/pdf/Container",["sap/ui/core/Control"],function(e){"use strict";return e.extend("bitech.ui5.pdf.Container",{metadata:{properties:{width:"sap.ui.core.CSSSize",height:"sap.ui.core.CSSSize"},aggregations:{header:{type:"sap.ui.core.Control",multiple:true},content:{type:"sap.ui.core.Control",multiple:true},footer:{type:"sap.ui.core.Control",multiple:true}},defaultAggregation:"content"},renderer(e,t){e.write("<div ");e.writeControlData(t);if(t.getWidth()){e.addStyle("width",t.getWidth())}if(t.getHeight()){e.addStyle("height",t.getHeight())}e.writeStyles();e.write(">");t._renderAggregation("header","bitechUi5PdfContainerHeader",e,t);var i=t.getAggregation("content");if(i){e.write("<div ");e.addClass("bitechUi5PdfContainerContent");e.writeClasses();e.write(">");i.forEach(function(t){e.renderControl(t)});e.write("</div>")}t._renderAggregation("footer","bitechUi5PdfContainerFooter",e,t);e.write("</div>")},_renderAggregation:function(e,t,i,r){var n=r.getAggregation(e);if(n){i.write("<"+e+" ");i.addClass(t);i.writeClasses();i.write(">");n.forEach(function(e){i.renderControl(e)});i.write("</"+e+">")}}})});
sap.ui.predefine("bitech/ui5/pdf/Document",["sap/ui/core/Control","sap/ui/unified/FileUploader","mozilla/pdfjs/build/pdf.min","bitech/ui5/pdf/Page"],function(e,t,i,r){"use strict";return e.extend("bitech.ui5.pdf.Document",{metadata:{properties:{scale:"float",src:"string",noDataText:"string",page:{type:"int",defaultValue:1},pageCount:"int"},aggregations:{_pages:{type:"bitech.ui5.pdf.Page",multiple:true,visibillity:"hidden"},_previewPages:{type:"bitech.ui5.pdf.Page",multiple:true,visibillity:"hidden"}},events:{documentLoaded:{},drawn:{},pageSelected:{}}},init:function(){},onPageClick:function(e){var t=this.getAggregation("_previewPages"),i=e.getSource();this.setPage(i.getNumber());t.forEach(function(e){if(e!=i){e.removeStyleClass("bitechUi5PdfSelected")}})},setPage:function(e){this.setProperty("page",e,true);var t=this.getAggregation("_pages");if(e<1||e>t.length){throw new Error("PageNumberIsOutOfRange")}var i=t[e-1],r=i.getDomRef();r.scrollIntoView();this.fireEvent("pageSelected")},loadDocument:function(e){this.setBusy(true);var t=sap.ui.getCore(),i=t.getLibraryResourceBundle("mozilla.pdfjs"),a;a=i.oUrlInfo.url.replace("messagebundle.properties","");pdfjsLib.GlobalWorkerOptions.workerSrc=a+"build/pdf.worker.min.js";pdfjsLib.getDocument(this.getSrc()).promise.then(function(e){var t,i;this.setPageCount(e.numPages);this.fireEvent("documentLoaded");for(var a=1;a<=e.numPages;++a){t=new r;i=new r;t.setBusy(true);i.setBusy(true);if(a===1){t.attachEvent("scaleDetermined",function(e){this.setProperty("scale",e.getParameter("scale"),true)}.bind(this))}this.addAggregation("_pages",t);this.addAggregation("_previewPages",i);i.attachEvent("click",this.onPageClick.bind(this));t.setPage(e,a);i.setPage(e,a);if(a===e.numPages){t.attachEvent("drawn",null,function(){this.setBusy(false);this.fireEvent("drawn")}.bind(this))}}}.bind(this),function(e){throw new Error(e)})},renderer:function(e,t){e.write("<div ");e.writeControlData(t);e.addClass("bitechUi5PdfDocument");e.writeClasses();e.write(">");if(t.getAggregation("_previewPages")){e.write("<aside ");e.addClass("bitechUi5PdfPreview");e.writeClasses();e.write(">");t._renderPages(e,t,"_previewPages");e.write("</aside>")}if(t.getAggregation("_pages")){e.write("<div ");e.addClass("bitechUi5PdfPages");e.writeClasses();e.write(">");t._renderPages(e,t,"_pages");e.write("</div>")}if(t.getNoDataText()&&!t.getAggregation("_pages")){e.write("<div ");e.addClass("sapMListNoData");e.writeClasses();e.write(">");e.write(t.getNoDataText());e.write("</div>")}e.write("</div>")},setSrc:function(e){if(e!==this.getSrc()){this.setProperty("src",e,false);this.removeAllAggregation("_pages");this.removeAllAggregation("_previewPages");if(e){this.loadDocument(e)}}},_renderPages:function(e,t,i){if(t.getAggregation(i)){t.getAggregation(i).forEach(function(t){e.renderControl(t)})}}})});
sap.ui.predefine("bitech/ui5/pdf/Page",["sap/ui/core/Control"],function(e,t){"use strict";return e.extend("bitech.ui5.pdf.Page",{metadata:{properties:{scale:"float",number:"int"},events:{click:{},drawn:{},scaleDetermined:{parameters:{scale:"float"}}},aggregations:{_pages:{type:"bitech.ui5.pdf.Page",multiple:true,visibillity:"hidden"}}},renderer:function(e,t){e.write("<div ");e.addClass("bitechUi5PdfPage");e.writeClasses();e.writeControlData(t);e.write("><canvas></canvas></div>")},setPage:function(e,t){this.oPdf=e;this.setProperty("number",t,true)},onAfterRendering:function(){if(sap.ui.core.Control.prototype.onAfterRendering){sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments)}if(!this.oPdf){return}this.oPdf.getPage(this.getNumber()).then(function(e){var t,i,n=this.getDomRef();var r=n.parentNode;t=e.getViewport({scale:1});if(r.localName==="aside"){i=n.clientWidth/t.width}else{i=this.getParent().getScale();i=typeof i!="undefined"?i:n.clientWidth/t.width;this.fireEvent("scaleDetermined",{scale:i})}t=e.getViewport({scale:i});var a=n.firstChild;var s=a.getContext("2d");a.height=t.height;a.width=t.width;var o={canvasContext:s,viewport:t};var d=e.render(o);d.promise.then(function(){this.fireEvent("drawn")}.bind(this));this.setBusy(false)}.bind(this))},onclick:function(){this.toggleStyleClass("bitechUi5PdfSelected");this.fireEvent("click")}})});
sap.ui.predefine("bitech/ui5/pdf/Viewer",["sap/ui/core/XMLComposite"],function(t){return t.extend("bitech.ui5.pdf.Viewer",{metadata:{properties:{height:"sap.ui.core.CSSSize",minPagesForSmallNavigation:{type:"int",defaultValue:2},minPagesForBigNavigation:{type:"int",defaultValue:3},scale:"string",src:"string",noDataText:{type:"string",defaultValue:"noDataText"},title:"string",width:"sap.ui.core.CSSSize"}},fragment:"bitech.ui5.pdf.Viewer",init:function(){var t=this.byId("Document");t.attachEvent("documentLoaded",null,this._onDocumentLoaded.bind(this));t.attachEvent("drawn",null,this._onDocumentDrawn.bind(this))},_toFirstPage:function(t){var e=this.byId("Document");e.setPage(1)},_toLastPage:function(t){var e=this.byId("Document");e.setPage(e.getPageCount())},_toNextPage:function(t){var e=this.byId("Document");e.setPage(e.getPage()+1)},_onDocumentDrawn:function(t){var e=t.getSource(),n=this.byId("zoomInput"),i=this.byId("zoomIn"),a=this.byId("zoomOut");n.setValue((e.getScale()*100).toFixed(2));n.setVisible(true);i.setVisible(true);a.setVisible(true)},_onDocumentLoaded:function(t){var e=t.getSource();this.getResourceBundle().then(function(t){var n=this.byId("pageCountLabel");oPageInput=this.byId("pageInput"),oFirstButton=this.byId("firstButton"),oPrevButton=this.byId("prevButton"),oNextButton=this.byId("nextButton"),oLastButton=this.byId("lastButton");oFirstButton.setVisible(this.getMinPagesForBigNavigation()<=e.getPageCount());oPrevButton.setVisible(this.getMinPagesForSmallNavigation()<=e.getPageCount());if(e.getPageCount()>1){n.setText(t.getText("pageCountText",[e.getPageCount()]))}oPageInput.setVisible(e.getPageCount()>1);oPageInput.setValue(1);n.setVisible(e.getPageCount()>1);oNextButton.setVisible(this.getMinPagesForSmallNavigation()<=e.getPageCount());oLastButton.setVisible(this.getMinPagesForBigNavigation()<=e.getPageCount());this._onPageSelected({getSource:function(){return e}})}.bind(this))},_onPageSelected:function(t){var e=t.getSource(),n=this.byId("pageInput"),i=this.byId("firstButton"),a=this.byId("prevButton"),o=this.byId("nextButton"),s=this.byId("lastButton");i.setEnabled(e.getPage()>1);a.setEnabled(e.getPage()>1);n.setValue(e.getPage());o.setEnabled(e.getPage()<e.getPageCount());s.setEnabled(e.getPage()<e.getPageCount())},_toPrevPage:function(t){var e=this.byId("Document");e.setPage(e.getPage()-1)},_uploadFile:function(t){var e=new FileReader,n=t.getParameter("files");if(!n||!n.length){return}this.setBusy(true);e.onload=function(t){var e=this.byId("Document");e.setScale();this.setSrc(t.target.result)}.bind(this);this.setTitle(n[0].name);e.readAsDataURL(n[0])},_onChangePageNumber:function(t){var e=+t.getParameter("value"),n=this.byId("Document");n.setPage(e)},_onChangeZoom:function(t){var e=t.getSource(),n=e.getValue(),i=this.byId("Document");n=n?n/100:n;i.setScale(n)},_zoom:function(t){var e=this.byId("Document"),n=e.getScale();n=n+t<0?0:n+t;e.setScale(n)},_zoomIn:function(){this._zoom(.25)},_zoomOut:function(){this._zoom(-.25)}})},true);
sap.ui.predefine("bitech/ui5/pdf/library",[],function(){"use strict";sap.ui.getCore().initLibrary({name:"bitech.ui5.pdf",dependecies:["sap.m"],types:[],interfaces:[],controls:["src.bitech.ui5.pdf.Document","src.bitech.ui5.pdf.Page","src.bitech.ui5.pdf.Viewer"],noLibraryCSS:false,version:"1.1.7"});return bitech.ui5.pdf},false);
sap.ui.require.preload({
	"bitech/ui5/pdf/Viewer.control.xml":'<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core" xmlns:pdf="bitech.ui5.pdf" xmlns:uni="sap.ui.unified"><pdf:Container width="{$this>width}" height="{$this>height}"><pdf:header><Toolbar><Button id="firstButton" icon="sap-icon://back-to-top" tooltip="{i18n>first}" visible="false" press="_toFirstPage" /><Button id="prevButton" icon="sap-icon://arrow-top" tooltip="{i18n>prev}" visible="false"  press="_toPrevPage" /><MaskInput id="pageInput" value="1"  mask="999" placeholderSymbol=" " class="bitechUi5PdfPageNumInput" change="_onChangePageNumber" visible="false" /><Label id="pageCountLabel" text="{i18n>pageCountText}" visible="false" /><Button id="nextButton" icon="sap-icon://arrow-bottom" tooltip="{i18n>next}" visible="false" press="_toNextPage" /><Button id="lastButton" icon="sap-icon://download" tooltip="{i18n>last}" visible="false"  press="_toLastPage" /><Button id="zoomOut" icon="sap-icon://zoom-out" tooltip="{i18n>zoomOut}" press="_zoomOut" visible="false" class="bitechUi5PdfZoomOut" /><Input id="zoomInput" value="{$this>scale}" width="5rem" change="_onChangeZoom" visible="false" /><Button id="zoomIn" icon="sap-icon://zoom-in" tooltip="{i18n>zoomIn}" press="_zoomIn" visible="false" /><ToolbarSpacer /><Title text="{$this>title}" visible="{= ${$this>title} ? true : false}" level="H1" textAlign="Center" titleStyle="H1" /><ToolbarSpacer /><uni:FileUploader buttonOnly="true" iconOnly="true" icon="sap-icon://upload" fileType="pdf" mimeType="application/pdf" change="_uploadFile" ></uni:FileUploader></Toolbar></pdf:header><pdf:content><pdf:Document busy="{$this>busy}" id="Document" src="{$this>src}" noDataText="{$this>noDataText}" pageSelected="_onPageSelected"></pdf:Document></pdf:content></pdf:Container></core:FragmentDefinition>',
	"bitech/ui5/pdf/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"bitech.ui5.pdf","type":"library","embeds":[],"applicationVersion":{"version":"1.1.7"},"title":"PDF viewer","description":"PDF viewer","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.71","libs":{"sap.m":{"minVersion":"1.71.3"}}},"library":{"i18n":"messagebundle.properties","content":{"controls":["src.bitech.ui5.pdf.Document","src.bitech.ui5.pdf.Page","src.bitech.ui5.pdf.Viewer"],"elements":[],"types":[],"interfaces":[]}}}}'
});
