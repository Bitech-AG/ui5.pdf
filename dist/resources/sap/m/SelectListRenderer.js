/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/Device"],function(e,t,s,i){"use strict";var a={apiVersion:2};a.CSS_CLASS="sapMSelectList";a.render=function(e,t){this.writeOpenListTag(e,t,{elementData:true});this.renderItems(e,t);this.writeCloseListTag(e,t)};a.writeOpenListTag=function(e,t,s){var i=a.CSS_CLASS;if(s.elementData){e.openStart("ul",t)}else{e.openStart("ul")}e.class(i);if(t.getShowSecondaryValues()){e.class(i+"TableLayout")}if(!t.getEnabled()){e.class(i+"Disabled")}e.style("width",t.getWidth());e.style("max-width",t.getMaxWidth());this.writeAccessibilityState(e,t);e.openEnd()};a.writeCloseListTag=function(e,t){e.close("ul")};a.renderItems=function(e,t){var s=t._getNonSeparatorItemsCount(),i=t.getItems(),a=t.getSelectedItem(),n=1,l;for(var o=0;o<i.length;o++){l={selected:a===i[o],setsize:s,elementData:true};if(!(i[o]instanceof sap.ui.core.SeparatorItem)){l.posinset=n++}this.renderItem(e,t,i[o],l)}};a.renderItem=function(t,s,n,l){if(!(n instanceof e)){return}var o=n.getEnabled(),c=s.getSelectedItem(),r=a.CSS_CLASS,d=n.getTooltip_AsString(),S=s.getShowSecondaryValues();t.openStart("li",l.elementData?n:null);if(n.getIcon&&n.getIcon()){t.class("sapMSelectListItemWithIcon")}if(n instanceof sap.ui.core.SeparatorItem){t.class(r+"SeparatorItem");if(S){t.class(r+"Row")}}else{t.class(r+"ItemBase");if(S){t.class(r+"Row")}else{t.class(r+"Item")}if(n.bVisible===false){t.class(r+"ItemBaseInvisible")}if(!o){t.class(r+"ItemBaseDisabled")}if(o&&i.system.desktop){t.class(r+"ItemBaseHoverable")}if(n===c){t.class(r+"ItemBaseSelected")}if(o){t.attr("tabindex","0")}}t.style("max-width",s.getMaxWidth());if(d){t.attr("title",d)}this.writeItemAccessibilityState.apply(this,arguments);t.openEnd();if(S){t.openStart("span");t.class(r+"Cell");t.class(r+"FirstCell");t.attr("disabled","disabled");t.openEnd();this._renderIcon(t,n);t.text(n.getText());t.close("span");t.openStart("span");t.class(r+"Cell");t.class(r+"LastCell");t.attr("disabled","disabled");t.openEnd();if(typeof n.getAdditionalText==="function"){t.text(n.getAdditionalText())}t.close("span")}else{this._renderIcon(t,n);t.text(n.getText())}t.close("li")};a.writeAccessibilityState=function(e,t){e.accessibilityState(t,{role:"listbox"})};a.writeItemAccessibilityState=function(e,t,i,a){var n=i.isA("sap.ui.core.SeparatorItem")?"separator":"option";var l;if(!i.getText()&&i.getIcon&&i.getIcon()){var o=s.getIconInfo(i.getIcon());if(o){l=o.text||o.name}}e.accessibilityState(i,{role:n,selected:a.selected,setsize:a.setsize,posinset:a.posinset,label:l})};a._renderIcon=function(e,t){if(t.getIcon&&t.getIcon()){e.icon(t.getIcon(),a.CSS_CLASS+"ItemIcon",{id:t.getId()+"-icon"})}};return a},true);