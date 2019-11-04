/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./MonthRenderer","./DatesRowRenderer"],function(e,r,a){"use strict";var n=e.extend(a);["getClass","renderMonth","renderDays","renderHeader"].forEach(function(e){n[e]=function(n,t){if(t.iMode<2){return r[e].apply(r,arguments)}else{if(e==="getClass"){var s="sapUiCalDatesRow sapUiCalRow sapUiCalOneMonthDatesRow";if(!t.getShowDayNamesLine()){s=s+" sapUiCalNoNameLine"}return s}return a[e].apply(a,arguments)}}});return n},true);