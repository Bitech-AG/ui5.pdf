/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./P13nConditionPanel","./P13nPanel","./library","sap/m/Panel","./P13nFilterItem"],function(e,t,i,n,a){"use strict";var r=i.P13nPanelType;var o=i.P13nConditionOperation;var s=t.extend("sap.m.P13nFilterPanel",{metadata:{library:"sap.m",properties:{maxIncludes:{type:"string",group:"Misc",defaultValue:"-1"},maxExcludes:{type:"string",group:"Misc",defaultValue:"-1"},containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},filterItems:{type:"sap.m.P13nFilterItem",multiple:true,singularName:"filterItem",bindable:"bindable"}},events:{addFilterItem:{},removeFilterItem:{},updateFilterItem:{},filterItemChanged:{parameters:{reason:{type:"string"},key:{type:"string"},index:{type:"int"},itemData:{type:"object"}}}}},renderer:function(e,t){e.write("<section");e.writeControlData(t);e.addClass("sapMFilterPanel");e.writeClasses();e.writeStyles();e.write(">");e.write("<div");e.addClass("sapMFilterPanelContent");e.addClass("sapMFilterPanelBG");e.writeClasses();e.write(">");var i=t.getAggregation("content");var n=i.length;for(var a=0;a<n;a++){e.renderControl(i[a])}e.write("</div>");e.write("</section>")}});s.prototype.setConditions=function(e){var t=[];var i=[];if(e.length){for(var n=0;n<e.length;n++){var a=e[n];if(!a.exclude){t.push(a)}else{i.push(a)}}}this._oIncludeFilterPanel.setConditions(t);this._oExcludeFilterPanel.setConditions(i);if(i.length>0){this._oExcludePanel.setExpanded(true)}return this};s.prototype.getConditions=function(){var e=this._oIncludeFilterPanel.getConditions();var t=this._oExcludeFilterPanel.getConditions();return e.concat(t)};s.prototype.setContainerQuery=function(e){this.setProperty("containerQuery",e);this._oIncludeFilterPanel.setContainerQuery(e);this._oExcludeFilterPanel.setContainerQuery(e);return this};s.prototype.setLayoutMode=function(e){this.setProperty("layoutMode",e);this._oIncludeFilterPanel.setLayoutMode(e);this._oExcludeFilterPanel.setLayoutMode(e);return this};s.prototype.validateConditions=function(){return this._oIncludeFilterPanel.validateConditions()&&this._oExcludeFilterPanel.validateConditions()};s.prototype.removeInvalidConditions=function(){this._oIncludeFilterPanel.removeInvalidConditions();this._oExcludeFilterPanel.removeInvalidConditions()};s.prototype.removeValidationErrors=function(){this._oIncludeFilterPanel.removeValidationErrors();this._oExcludeFilterPanel.removeValidationErrors()};s.prototype.onBeforeNavigationFrom=function(){return this.validateConditions()};s.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions()};s.prototype.setIncludeOperations=function(e,t){t=t||"default";this._aIncludeOperations[t]=e;if(this._oIncludeFilterPanel){this._oIncludeFilterPanel.setOperations(this._aIncludeOperations[t],t)}};s.prototype.getIncludeOperations=function(e){if(this._oIncludeFilterPanel){return this._oIncludeFilterPanel.getOperations(e)}};s.prototype.setExcludeOperations=function(e,t){t=t||"default";this._aExcludeOperations[t]=e;if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setOperations(this._aExcludeOperations[t],t)}};s.prototype.getExcludeOperations=function(e){if(this._oExcludeFilterPanel){return this._oExcludeFilterPanel.getOperations(e)}};s.prototype.setKeyFields=function(e){this._aKeyFields=e;if(this._oIncludeFilterPanel){e.some(function(e){if(e.isDefault){this._oIncludeFilterPanel.setAutoAddNewRow(true)}}.bind(this));this._oIncludeFilterPanel.setKeyFields(this._aKeyFields)}if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setKeyFields(this._aKeyFields)}};s.prototype.getKeyFields=function(){return this._aKeyFields};s.prototype.setMaxIncludes=function(e){this.setProperty("maxIncludes",e);if(this._oIncludeFilterPanel){this._oIncludeFilterPanel.setMaxConditions(e)}this._updatePanel();return this};s.prototype.setMaxExcludes=function(e){this.setProperty("maxExcludes",e);if(this._oExcludeFilterPanel){this._oExcludeFilterPanel.setMaxConditions(e)}this._updatePanel();return this};s.prototype._updatePanel=function(){var e=this.getMaxIncludes()==="-1"?1e3:parseInt(this.getMaxIncludes());var t=this.getMaxExcludes()==="-1"?1e3:parseInt(this.getMaxExcludes());if(e>0){if(t<=0){this._oIncludePanel.setHeaderText(null);this._oIncludePanel.setExpandable(false);this._oIncludePanel.addStyleClass("panelTopMargin");this._oIncludePanel.addStyleClass("panelNoHeader")}}if(t===0){this._oExcludePanel.setHeaderText(null);this._oExcludePanel.setExpandable(false);this._oExcludePanel.addStyleClass("panelNoHeader")}};s.prototype.init=function(){this.setType(r.filter);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("FILTERPANEL_TITLE"));sap.ui.getCore().loadLibrary("sap.ui.layout");this._aKeyFields=[];this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._aIncludeOperations={};if(!this._aIncludeOperations["default"]){this.setIncludeOperations([o.EQ,o.BT,o.LT,o.LE,o.GT,o.GE])}if(!this._aIncludeOperations["string"]){this.setIncludeOperations([o.Contains,o.EQ,o.BT,o.StartsWith,o.EndsWith,o.LT,o.LE,o.GT,o.GE],"string")}if(!this._aIncludeOperations["date"]){this.setIncludeOperations([o.EQ,o.BT,o.LT,o.LE,o.GT,o.GE],"date")}if(!this._aIncludeOperations["time"]){this.setIncludeOperations([o.EQ,o.BT,o.LT,o.LE,o.GT,o.GE],"time")}if(!this._aIncludeOperations["datetime"]){this.setIncludeOperations([o.EQ,o.BT,o.LT,o.LE,o.GT,o.GE],"datetime")}if(!this._aIncludeOperations["numeric"]){this.setIncludeOperations([o.EQ,o.BT,o.LT,o.LE,o.GT,o.GE],"numeric")}if(!this._aIncludeOperations["numc"]){this.setIncludeOperations([o.Contains,o.EQ,o.BT,o.EndsWith,o.LT,o.LE,o.GT,o.GE],"numc")}if(!this._aIncludeOperations["boolean"]){this.setIncludeOperations([o.EQ],"boolean")}this._aExcludeOperations={};if(!this._aExcludeOperations["default"]){this.setExcludeOperations([o.EQ])}this._oIncludePanel=new n({expanded:true,expandable:true,headerText:this._oRb.getText("FILTERPANEL_INCLUDES"),width:"auto"}).addStyleClass("sapMFilterPadding");this._oIncludeFilterPanel=new e({maxConditions:this.getMaxIncludes(),alwaysShowAddIcon:false,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oIncludeFilterPanel._sAddRemoveIconTooltipKey="FILTER";for(var t in this._aIncludeOperations){this._oIncludeFilterPanel.setOperations(this._aIncludeOperations[t],t)}this._oIncludePanel.addContent(this._oIncludeFilterPanel);this.addAggregation("content",this._oIncludePanel);this._oExcludePanel=new n({expanded:false,expandable:true,headerText:this._oRb.getText("FILTERPANEL_EXCLUDES"),width:"auto"}).addStyleClass("sapMFilterPadding");this._oExcludeFilterPanel=new e({exclude:true,maxConditions:this.getMaxExcludes(),alwaysShowAddIcon:false,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oExcludeFilterPanel._sAddRemoveIconTooltipKey="FILTER";for(var t in this._aExcludeOperations){this._oExcludeFilterPanel.setOperations(this._aExcludeOperations[t],t)}this._oExcludePanel.addContent(this._oExcludeFilterPanel);this.addAggregation("content",this._oExcludePanel);this._updatePanel()};s.prototype.exit=function(){var e=function(e){if(e&&e.destroy){e.destroy()}return null};this._aKeyFields=e(this._aKeyFields);this._aIncludeOperations=e(this._aIncludeOperations);this._aExcludeOperations=e(this._aExcludeOperations);this._oRb=e(this._oRb)};s.prototype.onBeforeRendering=function(){if(this._bUpdateRequired){this._bUpdateRequired=false;var e=[];var t=(this.getBindingInfo("items")||{}).model;var i=function(e,t,i){var n=i.getBinding(e);if(n&&t){return t.getObject()[n.getPath()]}return i.getMetadata().getProperty(e)?i.getProperty(e):i.getAggregation(e)};this.getItems().forEach(function(n){var a=n.getBindingContext(t);if(n.getBinding("key")){a.getObject()[n.getBinding("key").getPath()]=n.getKey()}e.push({key:n.getColumnKey(),text:i("text",a,n),tooltip:i("tooltip",a,n),maxLength:i("maxLength",a,n),type:i("type",a,n),typeInstance:i("typeInstance",a,n),formatSettings:i("formatSettings",a,n),precision:i("precision",a,n),scale:i("scale",a,n),isDefault:i("isDefault",a,n),values:i("values",a,n)});var r=e.length;if(e[r-1].maxLength===1||e[r-1].maxLength==="1"){var s=e[r-1];var l=this._oIncludeFilterPanel.getOperations(s.type);s.operations=[];l.forEach(function(e){if([o.Contains,o.StartsWith,o.EndsWith].indexOf(e)===-1){s.operations.push(e)}},this)}},this);this.setKeyFields(e);var n=[];t=(this.getBindingInfo("filterItems")||{}).model;this.getFilterItems().forEach(function(e){var a=e.getBindingContext(t);if(e.getBinding("key")&&a){a.getObject()[e.getBinding("key").getPath()]=e.getKey()}n.push({key:e.getKey(),keyField:i("columnKey",a,e),operation:i("operation",a,e),value1:i("value1",a,e),value2:i("value2",a,e),exclude:i("exclude",a,e)})});this.setConditions(n)}};s.prototype.addItem=function(e){t.prototype.addItem.apply(this,arguments);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};s.prototype.removeItem=function(e){var i=t.prototype.removeItem.apply(this,arguments);this._bUpdateRequired=true;return i};s.prototype.destroyItems=function(){this.destroyAggregation("items");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};s.prototype.addFilterItem=function(e){this.addAggregation("filterItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};s.prototype.insertFilterItem=function(e,t){this.insertAggregation("filterItems",e,t,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};s.prototype.updateFilterItems=function(e){this.updateAggregation("filterItems");if(e==="change"&&!this._bIgnoreBindCalls){this._bUpdateRequired=true;this.invalidate()}};s.prototype.removeFilterItem=function(e){e=this.removeAggregation("filterItems",e,true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};s.prototype.removeAllFilterItems=function(){var e=this.removeAllAggregation("filterItems",true);if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return e};s.prototype.destroyFilterItems=function(){this.destroyAggregation("filterItems");if(!this._bIgnoreBindCalls){this._bUpdateRequired=true}return this};s.prototype._handleDataChange=function(){var e=this;return function(t){var i=t.getParameter("newData");var n=t.getParameter("operation");var r=t.getParameter("key");var o=t.getParameter("index");var s;var l=-1;var d=t.getSource()===e._oExcludeFilterPanel;e.getFilterItems().some(function(e,t){if(!e.getExclude()&&!d||e.getExclude()&&d){o--}l=t;return o<0},this);switch(n){case"update":s=e.getFilterItems()[l];if(s){s.setExclude(i.exclude);s.setColumnKey(i.keyField);s.setOperation(i.operation);s.setValue1(i.value1);s.setValue2(i.value2)}e.fireUpdateFilterItem({key:r,index:l,filterItemData:s});e.fireFilterItemChanged({reason:"updated",key:r,index:l,itemData:{columnKey:i.keyField,operation:i.operation,exclude:i.exclude,value1:i.value1,value2:i.value2}});break;case"add":if(o>=0){l++}s=new a({columnKey:i.keyField,exclude:i.exclude,operation:i.operation});s.setValue1(i.value1);s.setValue2(i.value2);e._bIgnoreBindCalls=true;e.fireAddFilterItem({key:r,index:l,filterItemData:s});e.fireFilterItemChanged({reason:"added",key:r,index:l,itemData:{columnKey:i.keyField,operation:i.operation,exclude:i.exclude,value1:i.value1,value2:i.value2}});e._bIgnoreBindCalls=false;break;case"remove":e._bIgnoreBindCalls=true;e.fireRemoveFilterItem({key:r,index:l});e.fireFilterItemChanged({reason:"removed",key:r,index:l});e._bIgnoreBindCalls=false;break;default:throw"Operation'"+n+"' is not supported yet"}e._notifyChange()}};s.prototype._notifyChange=function(){var e=this.getChangeNotifier();if(e){e(this)}};return s});