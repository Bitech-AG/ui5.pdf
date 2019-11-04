/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Popup","sap/m/Text","sap/m/Button","sap/ui/core/ResizeHandler","sap/ui/Device","sap/ui/core/Icon","sap/ui/layout/VerticalLayout","./InstanceManager","sap/ui/core/InvisibleText","sap/ui/core/library","./LightBoxRenderer","sap/m/BusyIndicator","sap/ui/thirdparty/jquery","sap/ui/core/Core"],function(t,e,i,s,o,r,n,a,h,p,g,u,l,_,c,d){"use strict";var f=u.OpenState;var m=u.TextAlign;var y=t.ButtonType;var I=t.LightBoxLoadingStates;var x=e.extend("sap.m.LightBox",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",aggregations:{imageContent:{type:"sap.m.LightBoxItem",multiple:true,bindable:"bindable"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_errorIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_errorTitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_errorSubtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_verticalLayout:{type:"sap.ui.layout.VerticalLayout",multiple:false,visibility:"hidden"},_invisiblePopupText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_busy:{type:"sap.m.BusyIndicator",multiple:false,visibility:"hidden"}},events:{},defaultAggregation:"imageContent",designtime:"sap/m/designtime/LightBox.designtime"}});x.prototype.init=function(){this._createPopup();this._width=0;this._height=0;this._isRendering=true;this._resizeListenerId=null;this._$lightBox=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._closeButtonText=this._rb.getText("LIGHTBOX_CLOSE_BUTTON");if(sap.ui.getCore().getConfiguration().getAccessibility()){this.setAggregation("_invisiblePopupText",new g)}};x.prototype.onBeforeRendering=function(){var t=this._getImageContent(),e=t._getNativeImage(),i=t.getImageSrc(),s=t._getImageState(),o=this.getAggregation("_invisiblePopupText"),a=this._rb.getText("LIGHTBOX_ARIA_ENLARGED",[t.getTitle(),t.getSubtitle()]),h=this._rb.getText("LIGHTBOX_IMAGE_ERROR"),p=this._rb.getText("LIGHTBOX_IMAGE_ERROR_DETAILS");this._createErrorControls();if(e.getAttribute("src")!==i){e.src=i}if(this._resizeListenerId){n.resize.detachHandler(this._onResizeHandler);r.deregister(this._resizeListenerId);this._resizeListenerId=null}switch(s){case I.Loading:this._timeoutId=setTimeout(function(){t._setImageState(I.TimeOutError)},1e4);break;case I.Loaded:clearTimeout(this._timeoutId);this._calculateSizes(e);break;case I.Error:clearTimeout(this._timeoutId);a+=" "+h+" "+p;break;default:break}if(t&&o){o.setText(a)}this._isRendering=true};x.prototype.onAfterRendering=function(){this._isRendering=false;this._$lightBox=this.$();if(!this._resizeListenerId){this._onResizeHandler=this._onResize.bind(this);n.resize.attachHandler(this._onResizeHandler);this._resizeListenerId=r.register(this,this._onResizeHandler)}};x.prototype.forceInvalidate=e.prototype.invalidate;x.prototype.invalidate=function(t){var e=this._getImageContent();if(this.isOpen()){if(e&&e.getImageSrc()){this.forceInvalidate(t)}else{this.close()}}return this};x.prototype.exit=function(){if(this._oPopup){this._oPopup.detachOpened(this._fnOpened,this);this._oPopup.detachClosed(this._fnClosed,this);this._oPopup.destroy();this._oPopup=null}if(this._resizeListenerId){n.resize.detachHandler(this._onResizeHandler);r.deregister(this._resizeListenerId);this._resizeListenerId=null}p.removeLightBoxInstance(this)};x.prototype.open=function(){var t=this._getImageContent();this._oPopup.setContent(this);if(t&&t.getImageSrc()){this._oPopup.open(300,"center center","center center",document.body,null);p.addLightBoxInstance(this)}return this};x.prototype.isOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){return true}return false};x.prototype.close=function(){if(this._resizeListenerId){n.resize.detachHandler(this._onResizeHandler);r.deregister(this._resizeListenerId);this._resizeListenerId=null}this._oPopup.close();p.removeLightBoxInstance(this);return this};x.prototype._getCloseButton=function(){var t=this.getAggregation("_closeButton");if(!t){t=new o({id:this.getId()+"-closeButton",text:this._closeButtonText,type:y.Transparent,press:function(){this.close()}.bind(this)});this.setAggregation("_closeButton",t,true)}return t};x.prototype._getBusyIndicator=function(){var t=this.getAggregation("_busy");if(!t){t=new _;this.setAggregation("_busy",t,true)}return t};x.prototype._imageStateChanged=function(t){var e=t===I.Loaded||t===I.Error;if(e&&!this._isRendering){this.rerender()}};x.prototype._createPopup=function(){this._oPopup=new i(this,true,true);this._oPopup.attachOpened(this._fnOpened,this);this._oPopup.attachClosed(this._fnClosed,this)};x.prototype._fnOpened=function(){var t=this;t._onResize();c("#sap-ui-blocklayer-popup").on("click",function(){t.close()})};x.prototype._fnClosed=function(){c("#sap-ui-blocklayer-popup").off("click")};x.prototype._createErrorControls=function(){var t=this._rb;var e;var i;if(this._getImageContent()._getImageState()===I.TimeOutError){e=t.getText("LIGHTBOX_IMAGE_TIMED_OUT");i=t.getText("LIGHTBOX_IMAGE_TIMED_OUT_DETAILS")}else{e=t.getText("LIGHTBOX_IMAGE_ERROR");i=t.getText("LIGHTBOX_IMAGE_ERROR_DETAILS")}if(!this.getAggregation("_verticalLayout")){var o=new s({text:e,textAlign:m.Center}).addStyleClass("sapMLightBoxErrorTitle"),r=new s({text:i,textAlign:m.Center}).addStyleClass("sapMLightBoxErrorSubtitle"),n=new a({src:"sap-icon://picture"}).addStyleClass("sapMLightBoxErrorIcon");this.setAggregation("_verticalLayout",new h({content:[n,o,r]}).addStyleClass("sapMLightBoxVerticalLayout"))}};x.prototype._onResize=function(){var t=L()/2+"px",e=t,i=t,s="",o="",r=this._getImageContent(),n=this.getDomRef(),a,h,p=L(),g=2;if(r._getImageState()===I.Loaded){this._calculateSizes(r._getNativeImage());a=this._width;h=this._height;this._$lightBox.width(a);this._$lightBox.height(h)}else{a=n.clientWidth;h=n.clientHeight}if(window.innerWidth>a+p){i="50%";o=Math.round(-a/2)}if(window.innerHeight>h+p){e="50%";s=Math.round(-h/2)}if(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb"){s-=g;o-=g}this._$lightBox.css({top:e,"margin-top":s,left:i,"margin-left":o})};x.prototype._calculateSizes=function(t){var e=this._calculateFooterHeightInPx(),i=288-e,s=this._getImageContent().getAggregation("_image"),o;this._setImageSize(s,t.naturalWidth,t.naturalHeight);this._calculateAndSetLightBoxSize(s);o=this._pxToNumber(s.getHeight());this.toggleStyleClass("sapMLightBoxMinSize",o<i);this._isBusy=false};x.prototype._calculateFooterHeightInPx=function(){var t=d.getConfiguration().getTheme();var e=this.$().parents().hasClass("sapUiSizeCompact");var i=this._getImageContent().getSubtitle();var s=2.5;if(!e){if(t.startsWith("sap_fiori_")){s+=.375}else{s+=.5}}if(i){if(t.startsWith("sap_fiori_")){s+=1.375}else{s+=1.5}}return s*16};x.prototype._calculateAndSetLightBoxSize=function(t){var e,i,s=20*16,o=18*16,r=this._calculateFooterHeightInPx();e=this._pxToNumber(t.getHeight());i=this._pxToNumber(t.getWidth());this._width=Math.max(s,i);this._height=Math.max(o,e+r);this._isLightBoxBiggerThanMinDimensions=i>=s&&e>=o-r};x.prototype._setImageSize=function(t,e,i){var s=this._calculateFooterHeightInPx(),o=this._getDimensions(e,i,s),r=o.width+"px",n=o.height+"px",a=t.getDomRef();t.setProperty("width",r,true);t.setProperty("height",n,true);if(a){a.style.width=r;a.style.height=n}};x.prototype._getDimensions=function(t,e,i){var s=20*16,o=18*16,r=c(window),n=r.height(),a=r.width(),h=L(),p=Math.max(a-h,s),g=Math.max(n-h,o),u;g-=i;if(e<=g){if(t<=p){}else{e*=p/t;t=p}}else{if(t<=p){t*=g/e;e=g}else{u=Math.max(t/p,e/g);t/=u;e/=u}}return{width:Math.round(t),height:Math.round(e)}};x.prototype._pxToNumber=function(t){return t.substring(0,t.length-2)*1};x.prototype._getImageContent=function(){var t=this.getAggregation("imageContent");return t&&t[0]};function L(){var t=n.system;if(t.desktop){return 4*16}if(t.tablet){return 2*16}return 0}x.prototype.onsapescape=function(t){var e=this._oPopup.getOpenState();if(e!==f.CLOSED&&e!==f.CLOSING){this.close();t.stopPropagation()}};return x});