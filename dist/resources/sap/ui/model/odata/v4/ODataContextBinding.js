/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/ContextBinding","sap/ui/thirdparty/jquery"],function(e,t,n,o,i,r,s,a,h,u){"use strict";var d="sap.ui.model.odata.v4.ODataContextBinding",l={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true};function c(e,t){var n=e.slice(0,e.lastIndexOf("/")),o=n.indexOf("(");return(o<0?n:e.slice(0,o))+t}var p=h.extend("sap.ui.model.odata.v4.ODataContextBinding",{constructor:function(n,o,i,r){var s=o.indexOf("(...)");h.call(this,n,o);t.call(this);if(o.slice(-1)==="/"){throw new Error("Invalid path: "+o)}this.sGroupId=undefined;this.bInheritExpandSelect=false;this.oOperation=undefined;this.oReturnValueContext=null;this.sUpdateGroupId=undefined;if(s>=0){this.oOperation={bAction:undefined,mParameters:{},sResourcePath:undefined};if(s!==this.sPath.length-5){throw new Error("The path must not continue after a deferred operation: "+this.sPath)}}this.applyParameters(u.extend(true,{},r));this.oElementContext=this.bRelative?null:e.create(this.oModel,this,o);if(!this.oOperation&&(!this.bRelative||i&&!i.fetchValue)){this.createReadGroupLock(this.getGroupId(),true)}this.setContext(i);n.bindingCreated(this)},metadata:{publicMethods:[]}});t(p.prototype);p.prototype._delete=function(e,t){var n=this._findEmptyPathParentContext(this.oElementContext),o=n.getBinding();if(!o.execute){return this.fetchValue("",undefined,true).then(function(t){return n._delete(e,t)})}return this.deleteFromCache(e,t,"",undefined,function(){o._destroyContextAfterDelete()})};p.prototype._destroyContextAfterDelete=function(){this.oElementContext.destroy();this.oElementContext=null;if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}this._fireChange({reason:a.Remove})};p.prototype._execute=function(t){var n=this.oModel.getMetaModel(),o,r,s=this.getResolvedPath(),h=this;function u(){h._fireChange({reason:a.Change});return h.refreshDependentBindings("",t.getGroupId(),true)}r=n.fetchObject(n.getMetaPath(s)+"/@$ui5.overload").then(function(e){var n,i,r;if(!e){throw new Error("Unknown operation: "+s)}if(e.length!==1){throw new Error("Expected a single overload, but found "+e.length+" for "+s)}if(h.bRelative&&h.oContext.getBinding){i=h.sPath.lastIndexOf("/");r=i>=0?h.sPath.slice(0,i):"";n=h.oContext.getValue.bind(h.oContext,r)}o=e[0];return h.createCacheAndRequest(t,s,o,n)}).then(function(t){var n,r,a;return u().then(function(){if(h.isReturnValueLikeBindingParameter(o)){r=h.oContext.getValue();n=r&&i.getPrivateAnnotation(r,"predicate");a=i.getPrivateAnnotation(t,"predicate");if(n===a){h.oContext.patch(t)}}if(h.hasReturnValueContext(o)){if(h.oReturnValueContext){h.oReturnValueContext.destroy()}h.oReturnValueContext=e.createReturnValueContext(h.oModel,h,c(s,a));return h.oReturnValueContext}})},function(e){var t;function n(e){if(e.target){var n=e.target.split("/");if(n.shift()===t){e.target=n.join("/");return}}delete e.target}if(o&&o.$IsBound){t=o.$Parameter[0].$Name;e.resourcePath=h.oContext.getPath().slice(1);if(e.error){n(e.error);if(e.error.details){e.error.details.forEach(n)}}}return u().then(function(){throw e})}).catch(function(e){t.unlock(true);if(h.oReturnValueContext){h.oReturnValueContext.destroy();h.oReturnValueContext=null}h.oModel.reportError("Failed to execute "+s,d,e);throw e});return Promise.resolve(r)};p.prototype.adjustPredicate=function(e,t){if(this.oElementContext){this.oElementContext.adjustPredicate(e,t)}};p.prototype.applyParameters=function(e,t){this.checkBindingParameters(e,["$$canonicalPath","$$groupId","$$inheritExpandSelect","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.sGroupId=e.$$groupId;this.sUpdateGroupId=e.$$updateGroupId;this.bInheritExpandSelect=e.$$inheritExpandSelect;this.mQueryOptions=this.oModel.buildQueryOptions(e,true);this.mParameters=e;if(this.isRootBindingSuspended()){return}if(!this.oOperation){this.fetchCache(this.oContext);if(t){this.refreshInternal("",undefined,true).catch(function(){})}else{this.checkUpdate()}}else if(this.oOperation.bAction===false){this.execute()}};p.prototype.attachEvent=function(e){if(!(e in l)){throw new Error("Unsupported event '"+e+"': v4.ODataContextBinding#attachEvent")}return h.prototype.attachEvent.apply(this,arguments)};p.prototype.computeOperationQueryOptions=function(){var e,t=u.extend({},this.oModel.mUriParameters,this.mQueryOptions);if(this.bInheritExpandSelect){e=this.oContext.getBinding().mCacheQueryOptions;if("$select"in e){t.$select=e.$select}if("$expand"in e){t.$expand=e.$expand}}return t};p.prototype.createCacheAndRequest=function(e,t,o,s){var a=o.$kind==="Action",h,d=s,l=this.oModel,p=l.getMetaModel().getMetaPath(t)+"/@$ui5.overload/0/$ReturnType",f=t.slice(1),C=u.extend({},this.oOperation.mParameters),x=l.oRequestor,g=this;function m(e){if(g.hasReturnValueContext(o)){return c(f,i.getPrivateAnnotation(e,"predicate"))}if(g.isReturnValueLikeBindingParameter(o)&&i.getPrivateAnnotation(d,"predicate")===i.getPrivateAnnotation(e,"predicate")){return f.slice(0,f.lastIndexOf("/"))}return f}if(!a&&o.$kind!=="Function"){throw new Error("Not an operation: "+t)}if(this.bInheritExpandSelect&&!this.isReturnValueLikeBindingParameter(o)){throw new Error("Must not set parameter $$inheritExpandSelect on this binding")}this.oOperation.bAction=a;if(a&&s){d=s()}this.mCacheQueryOptions=this.computeOperationQueryOptions();t=x.getPathAndAddQueryOptions(t,o,C,this.mCacheQueryOptions,d);h=n.createSingle(x,t,this.mCacheQueryOptions,l.bAutoExpandSelect,m,a,p,o.$ReturnType&&!o.$ReturnType.$Type.startsWith("Edm."));this.oCachePromise=r.resolve(h);return a?h.post(e,C,d):h.fetchValue(e)};p.prototype.destroy=function(){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=undefined}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=undefined}this.oModel.bindingDestroyed(this);this.mCacheByResourcePath=undefined;this.oOperation=undefined;this.mParameters=undefined;this.mQueryOptions=undefined;t.prototype.destroy.apply(this);h.prototype.destroy.apply(this)};p.prototype.doCreateCache=function(e,t,o,i){return n.createSingle(this.oModel.oRequestor,e,t,this.oModel.bAutoExpandSelect,function(){return i})};p.prototype.doFetchQueryOptions=function(){return r.resolve(this.mQueryOptions)};p.prototype.execute=function(e){var t=this.oModel.resolve(this.sPath,this.oContext);this.checkSuspended();this.oModel.checkGroupId(e);if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(this.bRelative){if(!t){throw new Error("Unresolved binding: "+this.sPath)}if(this.oContext.isTransient&&this.oContext.isTransient()){throw new Error("Execute for transient context not allowed: "+t)}if(this.oContext.getPath().indexOf("(...)")>=0){throw new Error("Nested deferred operation bindings not supported: "+t)}}return this._execute(this.lockGroup(e,true))};p.prototype.fetchValue=function(e,t,n){var i,r,s=this.getRootBinding(),a=this;if(s&&s.isSuspended()){i=new Error("Suspended binding provides no value");i.canceled="noDebugLog";throw i}return this.oCachePromise.then(function(i){var s=false,h;if(i){h=a.getRelativePath(e);if(h!==undefined){if(n){r=o.$cached}else{r=a.oReadGroupLock||a.lockGroup();a.oReadGroupLock=undefined}return a.resolveRefreshPromise(i.fetchValue(r,h,function(){s=true;a.fireDataRequested()},t,a.oModel.bAutoExpandSelect)).then(function(e){if(s){a.fireDataReceived({data:{}})}return e},function(e){r.unlock(true);if(s){a.oModel.reportError("Failed to read path "+a.sPath,d,e);a.fireDataReceived(e.canceled?{data:{}}:{error:e})}throw e})}}if(!a.oOperation&&a.oContext&&a.oContext.fetchValue){return a.oContext.fetchValue(e,t,n)}})};p.prototype.getDependentBindings=function(){return this.oModel.getDependentBindings(this)};p.prototype.getResolvedPath=function(){var e="",t=this.oModel.resolve(this.sPath,this.oContext),n,o=this;if(t&&t.includes("($uid=")){n=t.slice(1).split("/");t="";n.forEach(function(n){var r,s,a;e+="/"+n;a=n.indexOf("($uid=");if(a>=0){r=o.oContext.getValue(e);s=r&&i.getPrivateAnnotation(r,"predicate");if(!s){throw new Error("No key predicate known at "+e)}t+="/"+n.slice(0,a)+s}else{t+="/"+n}})}return t};p.prototype.hasReturnValueContext=function(e){var t=this.oModel.getMetaModel(),n;if(!this.isReturnValueLikeBindingParameter(e)){return false}n=t.getMetaPath(this.oModel.resolve(this.sPath,this.oContext)).split("/");return n.length===3&&t.getObject("/"+n[1]).$kind==="EntitySet"};p.prototype.initialize=function(){if((!this.bRelative||this.oContext)&&!this.getRootBinding().isSuspended()){this._fireChange({reason:a.Change})}};p.prototype.isReturnValueLikeBindingParameter=function(e){if(!(this.bRelative&&this.oContext&&this.oContext.getBinding)){return false}return e.$IsBound&&e.$ReturnType&&!e.$ReturnType.$isCollection&&e.$EntitySetPath&&e.$EntitySetPath.indexOf("/")<0};p.prototype.refreshInternal=function(t,n,o,i){var s=this;if(this.oOperation&&this.oOperation.bAction!==false){return r.resolve()}if(this.isRootBindingSuspended()){this.refreshSuspended(n);return this.refreshDependentBindings(t,n,o,i)}this.createReadGroupLock(n,this.isRoot());return this.oCachePromise.then(function(h){var u=s.oRefreshPromise,d=s.oReadGroupLock;if(!s.oElementContext){s.oElementContext=e.create(s.oModel,s,s.oModel.resolve(s.sPath,s.oContext));if(!h){s._fireChange({reason:a.Refresh})}}if(s.oOperation){s.oReadGroupLock=undefined;return s._execute(d)}if(h&&!u){s.removeCachesAndMessages(t);s.fetchCache(s.oContext);u=s.createRefreshPromise();if(i){u.catch(function(){s.oCachePromise=r.resolve(h);h.setActive(true);s.checkUpdate()})}if(!o){s.fetchValue("").catch(function(){})}}return r.all([u,s.refreshDependentBindings(t,n,o,i)])})};p.prototype.refreshReturnValueContext=function(e,t){var o,i=this.oModel;if(this.oReturnValueContext!==e){return null}this.mCacheQueryOptions=this.computeOperationQueryOptions();o=n.createSingle(i.oRequestor,this.oReturnValueContext.getPath().slice(1),this.mCacheQueryOptions,true);this.oCachePromise=r.resolve(o);this.createReadGroupLock(t,true);return this.refreshDependentBindings("",t,true)};p.prototype.requestSideEffects=function(e,t,n){var o=this.oModel,i={},s=[];function a(e){return e.catch(function(e){o.reportError("Failed to request side effects",d,e);throw e})}if(t.indexOf("")<0){try{s.push(this.oCachePromise.getResult().requestSideEffects(this.lockGroup(e),t,i,n&&n.getPath().slice(1)));this.visitSideEffects(e,t,n,i,s);return r.all(s.map(a))}catch(e){if(!e.message.startsWith("Unsupported collection-valued navigation property ")){throw e}}}return n&&this.refreshReturnValueContext(n,e)||this.refreshInternal("",e,true,true)};p.prototype.requestObject=function(e){return this.oElementContext?this.oElementContext.requestObject(e):Promise.resolve()};p.prototype.resumeInternal=function(e){var t=this.sResumeChangeReason;this.sResumeChangeReason=a.Change;if(!this.oOperation){this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.getDependentBindings().forEach(function(t){t.resumeInternal(e)});this._fireChange({reason:t})}else if(this.oOperation.bAction===false){this.execute()}};p.prototype.setContext=function(t){if(this.oContext!==t){if(this.bRelative&&(this.oContext||t)){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=null}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null}this.fetchCache(t);if(t){this.oElementContext=e.create(this.oModel,this,this.oModel.resolve(this.sPath,t))}s.prototype.setContext.call(this,t)}else{this.oContext=t}}};p.prototype.setParameter=function(e,t){if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath)}if(!e){throw new Error("Missing parameter name")}if(t===undefined){throw new Error("Missing value for parameter: "+e)}this.oOperation.mParameters[e]=t;this.oOperation.bAction=undefined;return this};return p});