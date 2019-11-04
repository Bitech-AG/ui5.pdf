/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/isEmptyObject","sap/base/util/merge","sap/base/util/uid","sap/ui/thirdparty/URI"],function(e,t,n,r,i){"use strict";var a=/&/g,u="sap.ui.model.odata.v4.lib._Helper",f=/\=/g,o=/%29/g,s=/%28/g,c=/%27/g,l=/#/g,d,p=/\([^/]*|\/-?\d+/g,h=/\+/g,g=/'/g;d={addByPath:function(e,t,n){if(n){if(!e[t]){e[t]=[n]}else if(e[t].indexOf(n)<0){e[t].push(n)}}},addChildrenWithAncestor:function(e,t,n){if(t.length){e.forEach(function(e){var r;if(t.indexOf(e)>=0){n[e]=true;return}r=e.split("/");r.pop();while(r.length){if(t.indexOf(r.join("/"))>=0){n[e]=true;break}r.pop()}})}},addToSelect:function(e,t){e.$select=e.$select||[];t.forEach(function(t){if(e.$select.indexOf(t)<0){e.$select.push(t)}})},buildPath:function(){var e,t="",n;for(e=0;e<arguments.length;e+=1){n=arguments[e];if(n||n===0){if(t&&t!=="/"&&n[0]!=="("){t+="/"}t+=n}}return t},buildQuery:function(e){var t,n;if(!e){return""}t=Object.keys(e);if(t.length===0){return""}n=[];t.forEach(function(t){var r=e[t];if(Array.isArray(r)){r.forEach(function(e){n.push(d.encodePair(t,e))})}else{n.push(d.encodePair(t,r))}});return"?"+n.join("&")},clone:function e(t){return t===undefined||t===Infinity||t===-Infinity||t!==t?t:JSON.parse(JSON.stringify(t))},createError:function(t,n,r,i){var a=t.responseText,f=t.getResponseHeader("Content-Type"),o=new Error(n+": "+t.status+" "+t.statusText);o.status=t.status;o.statusText=t.statusText;o.requestUrl=r;o.resourcePath=i;if(t.status===0){o.message="Network error";return o}if(f){f=f.split(";")[0]}if(t.status===412){o.isConcurrentModification=true}if(f==="application/json"){try{o.error=JSON.parse(a).error;o.message=o.error.message;if(typeof o.message==="object"){o.message=o.error.message.value}}catch(t){e.warning(t.toString(),a,u)}}else if(f==="text/plain"){o.message=a}return o},createGetMethod:function(e,t){return function(){var n=this[e].apply(this,arguments);if(n.isFulfilled()){return n.getResult()}else if(t){if(n.isRejected()){n.caught();throw n.getResult()}else{throw new Error("Result pending")}}}},createRequestMethod:function(e){return function(){return Promise.resolve(this[e].apply(this,arguments))}},createTechnicalDetails:function(e){var t,n=e["@$ui5.originalMessage"]||e,r={};if(!(n instanceof Error)){Object.defineProperty(r,"originalMessage",{enumerable:true,get:function(){if(!t){t=d.publicClone(n)}return t}})}return r},deletePrivateAnnotation:function(e,t){var n=e["@$ui5._"];if(n){delete n[t]}},drillDown:function(e,t){return t.reduce(function(e,t){return e&&t in e?e[t]:undefined},e)},encode:function(e,t){var n=encodeURI(e).replace(a,"%26").replace(l,"%23").replace(h,"%2B");if(t){n=n.replace(f,"%3D")}return n},encodePair:function(e,t){return d.encode(e,true)+"="+d.encode(t,false)},fireChange:function(e,t,n){var r=e[t],i;if(r){for(i=0;i<r.length;i+=1){r[i].onChange(n)}}},fireChanges:function(e,t,n,r){Object.keys(n).forEach(function(i){var a=d.buildPath(t,i),u=n[i];if(u&&typeof u==="object"){d.fireChanges(e,a,u,r)}else{d.fireChange(e,a,r?undefined:u)}});d.fireChange(e,t,r?undefined:n)},formatLiteral:function(e,t){if(e===undefined){throw new Error("Illegal value: undefined")}if(e===null){return"null"}switch(t){case"Edm.Binary":return"binary'"+e+"'";case"Edm.Boolean":case"Edm.Byte":case"Edm.Double":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":case"Edm.Single":return String(e);case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return e;case"Edm.Duration":return"duration'"+e+"'";case"Edm.String":return"'"+e.replace(g,"''")+"'";default:throw new Error("Unsupported type: "+t)}},getKeyFilter:function(e,t,n){var r=[],i,a=d.getKeyProperties(e,t,n);if(!a){return undefined}for(i in a){r.push(i+" eq "+a[i])}return r.join(" and ")},getKeyPredicate:function(e,t,n){var r=[],i=d.getKeyProperties(e,t,n,true);if(!i){return undefined}r=Object.keys(i).map(function(e,t,n){var r=encodeURIComponent(i[e]);return n.length===1?r:encodeURIComponent(e)+"="+r});return"("+r.join(",")+")"},getKeyProperties:function(e,t,n,r){var i,a={};i=n[t].$Key.some(function(i){var u,f,o,s,c,l;if(typeof i==="string"){u=f=i}else{u=Object.keys(i)[0];f=i[u];if(!r){u=f}}o=f.split("/");l=d.drillDown(e,o);if(l===undefined){return true}s=o.pop();c=n[d.buildPath(t,o.join("/"))];l=d.formatLiteral(l,c[s].$Type);a[u]=l});return i?undefined:a},getMetaPath:function(e){return e.replace(p,"")},getPrivateAnnotation:function(e,t){var n=e["@$ui5._"];return n&&n[t]},getQueryOptionsForPath:function(e,t){t=t[0]==="("?d.getMetaPath(t).slice(1):d.getMetaPath("/"+t).slice(1);if(t){t.split("/").some(function(t){e=e&&e.$expand&&e.$expand[t];if(!e||e===true){e={};return true}})}return e||{}},getRelativePath:function(e,t){if(!e.startsWith(t)){return undefined}e=e.slice(t.length);if(e){if(e[0]==="/"){return e.slice(1)}if(e[0]!=="("){return undefined}}return e},hasPrivateAnnotation:function(e,t){var n=e["@$ui5._"];return n?t in n:false},intersectQueryOptions:function(e,n,r,i,a,u){var f=[],o={},s,c,l={};function p(e,t){var n=t.split("/");return n.every(function(t,a){return a===0&&e||r(i+"/"+n.slice(0,a+1).join("/")).getResult().$kind==="Property"})}if(n.indexOf("")>=0){throw new Error("Unsupported empty navigation property path")}if(e&&e.$select&&e.$select.indexOf("*")<0){d.addChildrenWithAncestor(n,e.$select,l);d.addChildrenWithAncestor(e.$select,n,l);c=Object.keys(l).filter(p.bind(null,true))}else{c=n.filter(p.bind(null,false))}if(e&&e.$expand){f=Object.keys(e.$expand);f.forEach(function(f){var s,c=i+"/"+f,l=d.buildPath(u,f),p={},h;d.addChildrenWithAncestor([f],n,p);if(!t(p)){if(r(c).getResult().$isCollection){a[l]=true}o[f]=e.$expand[f];return}h=d.stripPathPrefix(f,n);if(h.length){if(r(c).getResult().$isCollection){throw new Error("Unsupported collection-valued navigation property "+c)}s=d.intersectQueryOptions(e.$expand[f]||{},h,r,i+"/"+f,a,l);if(s){o[f]=s}}})}if(!c.length&&t(o)){return null}if(!c.length){c=Object.keys(o).slice(0,1)}s=Object.assign({},e,{$select:c});if(t(o)){delete s.$expand}else{s.$expand=o}return s},isSafeInteger:function(e){if(typeof e!=="number"||!isFinite(e)){return false}e=Math.abs(e);return e<=9007199254740991&&Math.floor(e)===e},makeAbsolute:function(e,t){return new i(e).absoluteTo(t).toString().replace(c,"'").replace(s,"(").replace(o,")")},merge:n,mergeQueryOptions:function(e,t,n){var r;function i(t,n){if(n&&(!e||e[t]!==n)){if(!r){r=e?d.clone(e):{}}r[t]=n}}i("$orderby",t);i("$filter",n);return r||e},namespace:function(e){var t=e.indexOf("/");if(t>=0){e=e.slice(0,t)}t=e.lastIndexOf(".");return t<0?"":e.slice(0,t)},parseLiteral:function(e,t,n){function r(r){if(!isFinite(r)){throw new Error(n+": Not a valid "+t+" literal: "+e)}return r}if(e==="null"){return null}switch(t){case"Edm.Boolean":return e==="true";case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":return r(parseInt(e));case"Edm.Date":case"Edm.DateTimeOffset":case"Edm.Decimal":case"Edm.Guid":case"Edm.Int64":case"Edm.TimeOfDay":return e;case"Edm.Double":case"Edm.Single":return e==="INF"||e==="-INF"||e==="NaN"?e:r(parseFloat(e));default:throw new Error(n+": Unsupported type: "+t)}},publicClone:function(e){var t=d.clone(e);if(t){delete t["@$ui5._"]}return t},removeByPath:function(e,t,n){var r=e[t],i;if(r){i=r.indexOf(n);if(i>=0){if(r.length===1){delete e[t]}else{r.splice(i,1)}}}},resolveIfMatchHeader:function(e){var t=e&&e["If-Match"];if(t&&typeof t==="object"){t=t["@odata.etag"];e=Object.assign({},e);if(t===undefined){delete e["If-Match"]}else{e["If-Match"]=t}}return e},selectKeyProperties:function(e,t){if(t&&t.$Key){d.addToSelect(e,t.$Key.map(function(e){if(typeof e==="object"){return e[Object.keys(e)[0]]}return e}))}},setPrivateAnnotation:function(e,t,n){var r=e["@$ui5._"];if(!r){r=e["@$ui5._"]={}}r[t]=n},stripPathPrefix:function(e,t){var n=e+"/";if(e===""){return t}return t.filter(function(t){return t===e||t.startsWith(n)}).map(function(e){return e.slice(n.length)})},toArray:function(e){if(e===undefined||e===null){return[]}if(Array.isArray(e)){return e}return[e]},uid:r,updateExisting:function(e,t,n,r){if(!r){return}Object.keys(n).forEach(function(i){var a=d.buildPath(t,i),u=n[i],f;if(i in r||i[0]==="#"){f=r[i];if(f&&typeof f==="object"){if(Array.isArray(f)){n[i]=f}else if(u){d.updateExisting(e,a,u,f)}else{n[i]=f;d.fireChanges(e,a,f,false)}}else if(u&&typeof u==="object"){n[i]=f;d.fireChanges(e,a,u,true)}else{n[i]=f;if(u!==f){d.fireChange(e,a,f)}}}});Object.keys(r).filter(function(e){return e[0]==="#"}).filter(function(e){return!(e in n)}).forEach(function(i){var a=r[i],u=d.buildPath(t,i);n[i]=a;d.fireChanges(e,u,a,false)})},updateSelected:function(e,t,n,r,i){var a;function u(n,r,i){var a=n.split("/");a.every(function(u,f){var o=r[u],s=i[u];if(o&&typeof o==="object"){i[u]=s||{}}else if(s&&typeof s==="object"){i[u]=o;d.fireChanges(e,d.buildPath(t,a.slice(0,f+1).join("/")),s,true);return false}else if(s!==o){i[u]=o;if(f===a.length-1){d.fireChange(e,d.buildPath(t,n),o)}return false}else if(!s){return false}i=i[u];r=o;return true})}function f(e,t){Object.keys(e).forEach(function(n){var r,a;if(n==="@$ui5._"){return}r=d.buildPath(t,n);a=e[n];if(a!==null&&typeof a==="object"){f(a,r)}else{i.push(r)}})}if(!i||i.indexOf("*")>=0){i=[];f(r)}else{i=i.concat("@odata.etag")}i.forEach(function(e){u(e,r,n)});a=d.getPrivateAnnotation(r,"predicate");if(a){d.setPrivateAnnotation(n,"predicate",a)}},updateTransientPaths:function(e,t,n){var r;for(r in e){if(r.includes(t)){e[r.replace(t,n)]=e[r];delete e[r]}}},wrapChildQueryOptions:function(t,n,r,i){var a="",f,o=n.split("/"),s,c=t,l={},p=l;if(n===""){return r}for(f=0;f<o.length;f+=1){c=d.buildPath(c,o[f]);a=d.buildPath(a,o[f]);s=i(c).getResult();if(s.$kind==="NavigationProperty"){p.$expand={};p=p.$expand[a]=f===o.length-1?r:{};d.selectKeyProperties(p,i(c+"/").getResult());a=""}else if(s.$kind!=="Property"){return undefined}}if(s.$kind==="Property"){if(Object.keys(r).length>0){e.error("Failed to enhance query options for auto-$expand/$select as the"+" child binding has query options, but its path '"+n+"' points to a structural property",JSON.stringify(r),u);return undefined}d.addToSelect(p,[a])}if("$apply"in r){e.debug("Cannot wrap $apply into $expand: "+n,JSON.stringify(r),u);return undefined}return l}};return d},false);