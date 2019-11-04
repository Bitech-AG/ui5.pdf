/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","./BindingMode","./ChangeReason","./PropertyBinding","./CompositeType","./CompositeDataState","sap/ui/base/SyncPromise","sap/base/util/deepEqual","sap/base/assert","sap/base/Log"],function(t,e,n,a,i,s,r,u,o,h){"use strict";var l=a.extend("sap.ui.model.CompositeBinding",{constructor:function(t,e,n){a.apply(this,[null,""]);this.aBindings=t;this.aValues=null;this.bRawValues=e;this.bPreventUpdate=false;this.bInternalValues=n},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});l.prototype.destroy=function(){a.prototype.destroy.apply(this);this.aBindings.forEach(function(t){t.destroy()})};l.prototype.getPath=function(){o(null,"Composite Binding has no path!");return null};l.prototype.getModel=function(){o(null,"Composite Binding has no model!");return null};l.prototype.getContext=function(){o(null,"Composite Binding has no context!");return null};l.prototype.isResolved=function(){return this.aBindings.every(function(t){return t.isResolved()})};l.prototype.setType=function(t,e){if(t&&!(t instanceof i)){throw new Error("Only CompositeType can be used as type for composite bindings!")}a.prototype.setType.apply(this,arguments);if(this.oType){this.bRawValues=this.oType.getUseRawValues();this.bInternalValues=this.oType.getUseInternalValues();if(this.bRawValues&&this.bInternalValues){throw new Error(this.oType+" has both 'bUseRawValues' & 'bUseInternalValues' set to true. Only one of them is allowed to be true")}}};l.prototype.setContext=function(t){this.aBindings.forEach(function(e){if(!t||e.updateRequired(t.getModel())){e.setContext(t)}})};l.prototype.setValue=function(t){if(this.bSuspended){return}this.aBindings.forEach(function(n,a){var i=t[a],s=n.getBindingMode();if(i!==undefined&&s!==e.OneWay&&s!==e.OneTime){n.setValue(i)}});this.getDataState().setValue(this.getValue())};l.prototype.getValue=function(){return this.aBindings.map(function(t){return t.getValue()})};l.prototype.getOriginalValue=function(){return this.aBindings.map(function(t){return t.getDataState().getOriginalValue()})};l.prototype.getExternalValue=function(){var e=[],n,a;switch(this.sInternalType){case"raw":return this.getRawValue();case"internal":return this.getInternalValue();default:n=this.sInternalType&&t.getType(this.sInternalType);e=this.getCurrentValues();if(this.fnFormatter){a=this.fnFormatter.apply(this,e)}else if(this.oType){a=this.oType.formatValue(e,this.sInternalType)}else if(n instanceof t&&n.isArrayType()){a=e}else if(e.length>1){a=e.join(" ")}else{a=e[0]}return a}};l.prototype.setExternalValue=function(n){var a,i,s,u=this;if(this.sInternalType==="raw"){this.setRawValue(n);return}else if(this.sInternalType==="internal"){this.setInternalValue(n);return}a=this.sInternalType&&t.getType(this.sInternalType);if(this.fnFormatter){h.warning("Tried to use twoway binding, but a formatter function is used");return}i=this.getDataState();if(this.oType){s=r.resolve().then(function(){var t;if(u.oType.getParseWithValues()){t=u.getCurrentValues()}return u.oType.parseValue(n,u.sInternalType,t)}).then(function(t){var e=u.getValidateValues(t);return r.all([t,u.oType.validateValue(e)])}).then(function(t){return t[0]}).catch(function(t){i.setInvalidValue(n);u.checkDataState();throw t})}else if(Array.isArray(n)&&a instanceof t&&a.isArrayType()){s=r.resolve(n)}else if(typeof n=="string"){s=r.resolve(n.split(" "))}else{s=r.resolve([n])}return s.then(function(t){u.aBindings.forEach(function(a,i){var s=a.getBindingMode();n=t[i];if(n!==undefined&&s!==e.OneWay&&s!==e.OneTime){if(u.bRawValues){a.setRawValue(n)}else if(u.bInternalValues){a.setInternalValue(n)}else{a.setExternalValue(n)}}});i.setValue(u.getValue());i.setInvalidValue(undefined)}).unwrap()};l.prototype.getInternalValue=function(){return this.aBindings.map(function(t){return t.getInternalValue()})};l.prototype.setInternalValue=function(t){var n=this.getDataState(),a,i=this;if(this.oType){a=r.resolve(t).then(function(t){if(!i.bInternalValues){t=i.aBindings.map(function(e,n){return e._internalToRaw(t[n])});if(!i.bRawValues){t=i.aBindings.map(function(e,n){return e._rawToExternal(t[n])})}}return i.oType.validateValue(t)}).then(function(){return t}).catch(function(e){n.setInvalidValue(t);i.checkDataState();throw e})}else{a=r.resolve(t)}return a.then(function(){i.aBindings.forEach(function(n,a){var i=t[a],s=n.getBindingMode();if(i!==undefined&&s!==e.OneWay&&s!==e.OneTime){n.setInternalValue(i)}});n.setValue(i.getValue());n.setInvalidValue(undefined)}).unwrap()};l.prototype.getRawValue=function(){return this.aBindings.map(function(t){return t.getRawValue()})};l.prototype.setRawValue=function(t){var n=this.getDataState(),a,i=this;if(this.oType){a=r.resolve(t).then(function(t){if(!i.bRawValues){if(i.bInternalValues){t=i.aBindings.map(function(e,n){return e._rawToInternal(t[n])})}else{t=i.aBindings.map(function(e,n){return e._rawToExternal(t[n])})}}return i.oType.validateValue(t)}).then(function(){return t}).catch(function(e){n.setInvalidValue(t);i.checkDataState();throw e})}else{a=r.resolve(t)}return a.then(function(){i.aBindings.forEach(function(n,a){var i=t[a],s=n.getBindingMode();if(i!==undefined&&s!==e.OneWay&&s!==e.OneTime){n.setRawValue(i)}});n.setValue(i.getValue());n.setInvalidValue(undefined)}).unwrap()};l.prototype.getCurrentValues=function(){if(this.bRawValues){return this.getRawValue()}else if(this.bInternalValues){return this.getInternalValue()}else{return this.aBindings.map(function(t){return t.getExternalValue()})}};l.prototype.getValidateValues=function(t){var e,n,a=t;n=this.aBindings.some(function(e,n){return t[n]===undefined});if(n){e=this.getCurrentValues();a=e.map(function(e,n){return t[n]===undefined?e:t[n]})}return a};l.prototype.getBindings=function(){return this.aBindings};l.prototype.hasValidation=function(){if(this.getType()){return true}var t=this.getBindings();for(var e=0;e<t.length;++e){if(t[e].hasValidation()){return true}}return false};l.prototype.attachChange=function(t,n){var a=this;this.fChangeHandler=function(t){if(a.bSuspended){return}var n=t.getSource();if(n.getBindingMode()==e.OneTime){n.detachChange(a.fChangeHandler)}a.checkUpdate(true)};this.attachEvent("change",t,n);if(this.aBindings){this.aBindings.forEach(function(t){t.attachChange(a.fChangeHandler)})}};l.prototype.detachChange=function(t,e){var n=this;this.detachEvent("change",t,e);if(this.aBindings){this.aBindings.forEach(function(t){t.detachChange(n.fChangeHandler)})}};l.prototype.attachDataStateChange=function(t,n){var a=this;this.fDataStateChangeHandler=function(t){var n=t.getSource();if(n.getBindingMode()==e.OneTime){n.detachDataStateChange(a.fChangeHandler)}a.checkDataState()};this.attachEvent("DataStateChange",t,n);if(this.aBindings){this.aBindings.forEach(function(t){t.attachEvent("DataStateChange",a.fDataStateChangeHandler)})}};l.prototype.detachDataStateChange=function(t,e){var n=this;this.detachEvent("DataStateChange",t,e);if(this.aBindings){this.aBindings.forEach(function(t){t.detachEvent("DataStateChange",n.fDataStateChangeHandler)})}};l.prototype.attachAggregatedDataStateChange=function(t,n){var a=this;if(!this.fDataStateChangeHandler){this.fDataStateChangeHandler=function(t){var n=t.getSource();if(n.getBindingMode()==e.OneTime){n.detachDataStateChange(a.fChangeHandler)}a.checkDataState()}}this.attachEvent("AggregatedDataStateChange",t,n);if(this.aBindings){this.aBindings.forEach(function(t){t.attachEvent("DataStateChange",a.fDataStateChangeHandler)})}};l.prototype.detachAggregatedDataStateChange=function(t,e){var n=this;this.detachEvent("AggregatedDataStateChange",t,e);if(this.aBindings){this.aBindings.forEach(function(t){t.detachEvent("DataStateChange",n.fDataStateChangeHandler)})}};l.prototype.updateRequired=function(t){var e=false;this.aBindings.forEach(function(n){e=e||n.updateRequired(t)});return e};l.prototype.initialize=function(){this.bPreventUpdate=true;if(this.aBindings){this.aBindings.forEach(function(t){t.initialize()})}this.bPreventUpdate=false;if(!this.bSuspended){this.checkUpdate(true)}return this};l.prototype.getDataState=function(){if(!this.oDataState){this.oDataState=new s(this.aBindings.map(function(t){return t.getDataState()}))}return this.oDataState};l.prototype.suspend=function(){this.bSuspended=true;this.aBindings.forEach(function(t){t.suspend()})};l.prototype.resume=function(){this.aBindings.forEach(function(t){t.resume()});this.bSuspended=false;this.checkUpdate(true)};l.prototype.checkUpdate=function(t){var e=false;if(this.bPreventUpdate||this.bSuspended&&!t){return}var a=this.getDataState();var i=this.getOriginalValue();if(t||!u(i,this.aOriginalValues)){this.aOriginalValues=i;a.setOriginalValue(i);e=true}var s=this.getValue();if(!u(s,this.aValues)||t){this.aValues=s;a.setValue(s);this._fireChange({reason:n.Change});e=true}if(e){this.checkDataState()}};return l});