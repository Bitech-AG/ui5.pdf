/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(e){"use strict";var i={};i.render=function(i,t){var a=t.getId();var s=t.getTooltip_AsString();var l=t._getHeader();i.write("<div");i.writeControlData(t);i.writeAccessibilityState({role:"region",labelledby:e.getStaticId("sap.m",t._oRB.getText("PLANNINGCALENDAR"))});i.addClass("sapMPlanCal");if(t._iSize!==undefined&&t._iSize!==null){i.addClass("sapMSize"+t._iSize)}if(!t.getSingleSelection()){i.addClass("sapMPlanCalMultiSel")}if(!t.getShowRowHeaders()){i.addClass("sapMPlanCalNoHead")}if(t.getShowWeekNumbers()&&t._viewAllowsWeekNumbers(t.getViewKey())){i.addClass("sapMPlanCalWithWeekNumbers")}if(t.getShowDayNamesLine()&&t._viewAllowsDayNamesLine(t.getViewKey())){i.addClass("sapMPlanCalWithDayNamesLine")}if(s){i.writeAttributeEscaped("title",s)}var r=t.getWidth();if(r){i.addStyle("width",r)}var d=t.getHeight();if(d){i.addStyle("height",d)}i.writeAccessibilityState(t);i.writeClasses();i.writeStyles();i.write(">");i.renderControl(l);var n=t.getAggregation("table");i.renderControl(n);var o=t._oRB.getText("PLANNINGCALENDAR");i.write('<span id="'+a+'-Descr" class="sapUiInvisibleText">'+o+"</span>");o=t._oRB.getText("PLANNINGCALENDAR_VIEW");i.write('<span id="'+a+'-SelDescr" class="sapUiInvisibleText">'+o+"</span>");i.write("</div>")};return i},true);