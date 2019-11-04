/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./ListItemBase","./Text","./Image","./OverflowToolbar","sap/ui/core/Icon","sap/ui/core/library","sap/ui/core/Element"],function(t,e,r,o,i,a,n,s,l){"use strict";var u=s.Priority;var g=r.extend("sap.m.NotificationListBase",{metadata:{library:"sap.m",properties:{priority:{type:"sap.ui.core.Priority",group:"Appearance",defaultValue:u.None},title:{type:"string",group:"Appearance",defaultValue:""},datetime:{type:"string",group:"Appearance",defaultValue:""},showButtons:{type:"boolean",group:"Behavior",defaultValue:true},showCloseButton:{type:"boolean",group:"Behavior",defaultValue:true},authorName:{type:"string",group:"Appearance",defaultValue:""},authorPicture:{type:"sap.ui.core.URI",multiple:false}},aggregations:{buttons:{type:"sap.m.Button",multiple:true},_headerTitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_dateTime:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_authorName:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_authorImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_overflowToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_collapseButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{close:{}}}});g.prototype.init=function(){this.setAggregation("_overflowToolbar",new a)};g.prototype.setTitle=function(t){var e=this.setProperty("title",t);this._getHeaderTitle().setText(t);return e};g.prototype.setDatetime=function(t){var e=this.setProperty("datetime",t);this._getDateTimeText().setText(t);return e};g.prototype.setAuthorName=function(t){var e=this.setProperty("authorName",t);this._getAuthorName().setText(t);return e};g.prototype.close=function(){var t=this.getParent();this.fireClose();var e=!!this.getParent();if(!e&&t&&t instanceof l){var r={onAfterRendering:function(){t.focus();t.removeEventDelegate(r)}};t.addEventDelegate(r)}};g.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments);t.destroyAggregation("_overflowToolbar");var r=this.getAggregation("_overflowToolbar");t.setAggregation("_overflowToolbar",r.clone(),true);return t};g.getMetadata().forwardAggregation("buttons",{getter:function(){return this.getAggregation("_overflowToolbar")},aggregation:"content",forwardBinding:true});g.prototype._getHeaderTitle=function(){var t=this.getAggregation("_headerTitle");if(!t){t=new o({id:this.getId()+"-title",text:this.getTitle(),maxLines:2});this.setAggregation("_headerTitle",t,true)}return t};g.prototype._getDateTimeText=function(){var t=this.getAggregation("_dateTime");if(!t){t=new o({id:this.getId()+"-datetime",text:this.getDatetime()}).addStyleClass("sapMNLI-Datetime");this.setAggregation("_dateTime",t,true)}return t};g.prototype._getAuthorName=function(){var t=this.getAggregation("_authorName");if(!t){t=new o({text:this.getAuthorName()}).addStyleClass("sapMNLI-Text");this.setAggregation("_authorName",t,true)}return t};g.prototype._getAuthorImage=function(){var t=this.getAggregation("_authorImage");if(!t){var e=this.getAuthorPicture();var r=this.getAuthorName();if(p(e)){t=new n({src:e,alt:r})}else{t=new i({src:e,alt:r})}this.setAggregation("_authorImage",t,true)}return t};g.prototype._getToolbar=function(){var t=this.getAggregation("_overflowToolbar");if(!t){t=new a;this.setAggregation("_overflowToolbar",t,true)}return t};function p(t){if(!t){return false}var e=window.URI.parse(t);return e.protocol&&e.protocol=="sap-icon"}return g});