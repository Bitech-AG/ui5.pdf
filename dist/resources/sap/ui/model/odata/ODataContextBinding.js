/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ContextBinding","sap/ui/model/ChangeReason"],function(t,e){"use strict";var i=t.extend("sap.ui.model.odata.ODataContextBinding",{constructor:function(e,i,o,s,n){t.call(this,e,i,o,s,n)}});i.prototype.initialize=function(){var t=this,i=this.oModel.resolve(this.sPath,this.oContext),o=this.oModel._getObject(this.sPath,this.oContext),s=this.oModel._isReloadNeeded(i,o,this.mParameters);if(this.oModel.oMetadata.isLoaded()){if(i&&s){this.fireDataRequested()}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(o){t.oElementContext=o;t._fireChange({reason:e.Context});if(i&&s){t.fireDataReceived()}},s)}};i.prototype.refresh=function(t,i){var o=this,s,n,a=false,h=this.oModel.resolve(this.sPath,this.oContext);if(i){n=this.oModel._getObject(this.sPath,this.oContext);if(n){s=this.oModel._getKey(n);if(s in i){a=true}}}else{a=true}if(t||a){if(h){this.fireDataRequested()}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(i){if(o.oElementContext===i){if(t){o._fireChange({reason:e.Context})}}else{o.oElementContext=i;o._fireChange({reason:e.Context})}if(h){o.fireDataReceived()}},true)}};i.prototype.setContext=function(t){var i=this,o,s,n;if(this.oContext!==t&&this.isRelative()){this.oContext=t;o=this.oModel.resolve(this.sPath,this.oContext);s=this.oModel._getObject(this.sPath,this.oContext);n=this.oModel._isReloadNeeded(o,s,this.mParameters);if(o&&n){this.fireDataRequested()}this.oModel.createBindingContext(this.sPath,this.oContext,this.mParameters,function(t){i.oElementContext=t;i._fireChange({reason:e.Context});if(o&&n){i.fireDataReceived()}},n)}};return i});