/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/matchers/Interactable","sap/ui/test/matchers/Visible","sap/ui/test/matchers/_Enabled","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/test/matchers/matchers"],function(e,t,r,a,i,s){"use strict";var n=e.extend("sap.ui.test.matchers.MatcherFactory",{getStateMatchers:function(e){e=e||{};var i=[];if(e.visible!==false){if(e.enabled){i.push(new a)}if(e.interactable){i.push(new t)}else{i.push(new r)}}return i},getFilteringMatchers:function(e){var t=this._getPlainObjectMatchers(e);if(e.matchers){if(s.isPlainObject(e.matchers)){t=t.concat(this._getPlainObjectMatchers(e.matchers))}else if(s.isArray(e.matchers)){e.matchers.forEach(function(e){if(s.isPlainObject(e)){t=t.concat(this._getPlainObjectMatchers(e))}else{t.push(e)}}.bind(this))}else{t=t.concat(e.matchers)}}return t},_getPlainObjectMatchers:function(e){if(e["isMatching"]){return[e]}var t=this._getSupportedMatchers();return Object.keys(e).filter(function(e){return this._IMPLICIT_MATCHERS.indexOf(e)===-1}.bind(this)).map(function(r){if(t.indexOf(i(r))===-1){throw new Error("Matcher is not supported! Matcher name: '"+r+"', arguments: '"+JSON.stringify(e[r])+"'")}var a=sap.ui.test.matchers[i(r)];var n=s.isArray(e[r])?e[r]:[e[r]];return n.map(function(e){if(s.isArray(e)){return new function(){return a.apply(this,e)}}else{return new a(e)}})}).reduce(function(e,t){return e.concat(t)},[])},_getSupportedMatchers:function(e){e=e||sap.ui.test.matchers;return Object.keys(e).filter(function(e){return!e.match(/^(_|matcher)/i)})},_IMPLICIT_MATCHERS:["matchers","viewName","viewNamespace","viewId","fragmentId","visible","enabled","id","controlType","sOriginalControlType","searchOpenDialogs","useDeclarativeMatchers","interaction"]});return n});