/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./PlanningCalendarHeader","./SegmentedButtonItem","./SinglePlanningCalendarWeekView","./SinglePlanningCalendarGrid","./SinglePlanningCalendarMonthGrid","./SinglePlanningCalendarRenderer","sap/base/Log","sap/ui/core/Control","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","sap/ui/core/format/DateFormat","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/DateRange","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/jquery"],function(e,t,i,a,r,s,n,o,g,l,p,d,h,u,c,_){"use strict";var f=e.PlanningCalendarStickyMode;var m="_sHeaderResizeHandlerId";var y=4;var D="--item";var w=g.extend("sap.m.SinglePlanningCalendar",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},startHour:{type:"int",group:"Data",defaultValue:0},endHour:{type:"int",group:"Data",defaultValue:24},fullDay:{type:"boolean",group:"Data",defaultValue:true},stickyMode:{type:"sap.m.PlanningCalendarStickyMode",group:"Behavior",defaultValue:f.None},enableAppointmentsDragAndDrop:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsResize:{type:"boolean",group:"Misc",defaultValue:false},enableAppointmentsCreate:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action",forwarding:{getter:"_getHeader",aggregation:"actions"}},appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment",forwarding:{getter:"_getCurrentGrid",aggregation:"appointments"}},views:{type:"sap.m.SinglePlanningCalendarView",multiple:true,singularName:"view"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate",forwarding:{getter:"_getCurrentGrid",aggregation:"specialDates"}},_header:{type:"sap.m.PlanningCalendarHeader",multiple:false,visibility:"hidden"},_grid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_mvgrid:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{selectedView:{type:"sap.m.SinglePlanningCalendarView",multiple:false},legend:{type:"sap.m.PlanningCalendarLegend",multiple:false}},events:{appointmentSelect:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"}}},appointmentDrop:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"},copy:{type:"boolean"}}},appointmentResize:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},startDate:{type:"object"},endDate:{type:"object"}}},appointmentCreate:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},headerDateSelect:{parameters:{date:{type:"object"}}},startDateChange:{parameters:{date:{type:"object"}}},cellPress:{parameters:{startDate:{type:"object"},endDate:{type:"object"}}},moreLinkPress:{parameters:{date:{type:"object"}}},viewChange:{}}}});w.prototype.init=function(){var e=this.getId();this._oRB=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oDefaultView=new a({key:"DEFAULT_INNER_WEEK_VIEW_CREATED_FROM_CONTROL",title:""});this.setAssociation("selectedView",this._oDefaultView);this.setAggregation("_header",this._createHeader());this.setAggregation("_grid",new r(e+"-Grid"));this.setAggregation("_mvgrid",new s(e+"-GridMV"));this._attachHeaderEvents();this._attachGridEvents();this._attachDelegates();this.setStartDate(new Date)};w.prototype.onBeforeRendering=function(){this._toggleStickyClasses()};w.prototype.onAfterRendering=function(){var e=this._getHeader();this._adjustColumnHeadersTopOffset();this.toggleStyleClass("sapMSinglePCActionsHidden",!e._getActionsToolbar().getVisible());this._registerResizeHandler(m,e,this._onHeaderResize.bind(this))};w.prototype.exit=function(){if(this._oDefaultView){this._oDefaultView.destroy();this._oDefaultView=null}if(this._afterRenderFocusCell){this.removeDelegate(this._afterRenderFocusCell);this._afterRenderFocusCell=null}this._deRegisterResizeHandler(m)};w.prototype._onHeaderResize=function(e){if(e.oldSize.height===e.size.height){return this}this.toggleStyleClass("sapMSinglePCActionsHidden",!this._getHeader()._getActionsToolbar().getVisible());this._adjustColumnHeadersTopOffset();return this};w.prototype.setTitle=function(e){this._getHeader().setTitle(e);return this.setProperty("title",e,true)};w.prototype.setStartDate=function(e){this.setProperty("startDate",e,true);this._alignColumns();return this};w.prototype.setStartHour=function(e){this.getAggregation("_grid").setStartHour(e);this.setProperty("startHour",e,true);return this};w.prototype.setEndHour=function(e){this.getAggregation("_grid").setEndHour(e);this.setProperty("endHour",e,true);return this};w.prototype.setFullDay=function(e){this.getAggregation("_grid").setFullDay(e);this.setProperty("fullDay",e,true);return this};w.prototype.setEnableAppointmentsDragAndDrop=function(e){this.getAggregation("_grid").setEnableAppointmentsDragAndDrop(e);this.getAggregation("_mvgrid").setEnableAppointmentsDragAndDrop(e);return this.setProperty("enableAppointmentsDragAndDrop",e,true)};w.prototype.setEnableAppointmentsResize=function(e){this.getAggregation("_grid").setEnableAppointmentsResize(e);return this.setProperty("enableAppointmentsResize",e,true)};w.prototype.setEnableAppointmentsCreate=function(e){this.getAggregation("_grid").setEnableAppointmentsCreate(e);return this.setProperty("enableAppointmentsCreate",e,true)};w.prototype._toggleStickyClasses=function(){var e=this.getStickyMode();this.toggleStyleClass("sapMSinglePCStickyAll",e===f.All);this.toggleStyleClass("sapMSinglePCStickyNavBarAndColHeaders",e===f.NavBarAndColHeaders);return this};w.prototype._adjustColumnHeadersTopOffset=function(){var e=this.getStickyMode(),t=this.getAggregation("_grid"),i=t&&t._getColumnHeaders(),a;if(!i||!i.getDomRef()){return this}switch(e){case f.All:a=this._getHeader().$().outerHeight();break;case f.NavBarAndColHeaders:a=this._getHeader()._getNavigationToolbar().$().outerHeight();break;default:a="auto";break}i.$().css("top",a);i._setTopPosition(a);return this};w.prototype.addView=function(e){var t,a=this._getHeader(),r=e.getId()+D,s;if(!e){return this}if(this._isViewKeyExisting(e.getKey())){o.error("There is an existing view with the same key.",this);return this}this.addAggregation("views",e);t=a._getOrCreateViewSwitch();s=new i(r,{key:e.getKey(),text:e.getTitle()});t.addItem(s);this._observeViewTitle(e);if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",e)}this._alignView();if(this.getViews().length>y){a._convertViewSwitchToSelect()}return this};w.prototype.insertView=function(e,t){var a,r=this._getHeader(),s=e.getId()+D,n;if(!e){return this}if(this._isViewKeyExisting(e.getKey())){o.error("There is an existing view with the same key.",this);return this}this.insertAggregation("views",e,t);a=r._getOrCreateViewSwitch();n=new i(s,{key:e.getKey(),text:e.getTitle()});a.insertItem(n,t);this._observeViewTitle(e);if(this._getSelectedView().getKey()===this._oDefaultView.getKey()){this.setAssociation("selectedView",e)}this._alignView();if(this.getViews().length>y){r._convertViewSwitchToSelect()}return this};w.prototype.removeView=function(e){if(!e){return this}var t=this._getHeader(),i=t._getOrCreateViewSwitch(),a=i.getItems(),r=this._getSelectedView(),s=e.getKey(),n,o;if(this.getViews().length===1){this._disconnectAndDestroyViewsObserver()}else{this._oViewsObserver.unobserve(e,{properties:["title"]})}for(o=0;o<a.length;o++){n=a[o];if(n.getKey()===s){i.removeItem(n);break}}this.removeAggregation("views",e);if(s===r.getKey()){this.setAssociation("selectedView",this.getViews()[0]||this._oDefaultView)}this._alignView();if(this.getViews().length<=y){t._convertViewSwitchToSegmentedButton()}return this};w.prototype.removeAllViews=function(){var e=this._getHeader()._getOrCreateViewSwitch();this._disconnectAndDestroyViewsObserver();e.removeAllItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.removeAllAggregation("views")};w.prototype.destroyViews=function(){var e=this._getHeader()._getOrCreateViewSwitch();this._disconnectAndDestroyViewsObserver();e.destroyItems();this.setAssociation("selectedView",this._oDefaultView);this._alignView();return this.destroyAggregation("views")};w.prototype._viewsObserverCallbackFunction=function(e){sap.ui.getCore().byId(e.object.getId()+D).setText(e.current)};w.prototype._getViewsObserver=function(){if(!this._oViewsObserver){this._oViewsObserver=new c(this._viewsObserverCallbackFunction)}return this._oViewsObserver};w.prototype._observeViewTitle=function(e){this._getViewsObserver().observe(e,{properties:["title"]})};w.prototype._disconnectAndDestroyViewsObserver=function(){if(this._oViewsObserver){this._oViewsObserver.disconnect();this._oViewsObserver.destroy();this._oViewsObserver=null}};w.prototype.setSelectedView=function(e){var t=this._getCurrentGrid();this.setAssociation("selectedView",e);this._transferAggregations(t);this._alignColumns();this._adjustColumnHeadersTopOffset();this._getHeader()._getOrCreateViewSwitch().setSelectedKey(e.getKey());return this};w.prototype.getSelectedAppointments=function(){return this.getAggregation("_grid").getSelectedAppointments()};w.prototype.setLegend=function(e){var t,i,a;this.setAssociation("legend",e);this.getAggregation("_grid").setAssociation("legend",e);this.getAggregation("_mvgrid").setAssociation("legend",e);i=this.getLegend();if(i){this.getAggregation("_grid")._sLegendId=i;this.getAggregation("_mvgrid")._sLegendId=i;a=sap.ui.getCore().byId(i)}if(a){t=new c(function(e){this.invalidate()}.bind(this));t.observe(a,{destroy:true})}return this};w.prototype._alignView=function(){this._switchViewButtonVisibility();this._alignColumns();return this};w.prototype._createHeader=function(){var e=new t(this.getId()+"-Header");e.getAggregation("_actionsToolbar").addAriaLabelledBy(l.getStaticId("sap.m","SPC_ACTIONS_TOOLBAR"));e.getAggregation("_navigationToolbar").addAriaLabelledBy(l.getStaticId("sap.m","SPC_NAVIGATION_TOOLBAR"));return e};w.prototype._isViewKeyExisting=function(e){return this.getViews().some(function(t){return t.getKey()===e})};w.prototype._getSelectedView=function(){var e,t=this.getViews(),i=sap.ui.getCore().byId(this.getAssociation("selectedView")).getKey();for(var a=0;a<t.length;a++){if(i===t[a].getKey()){e=t[a];break}}return e||this._oDefaultView};w.prototype._switchViewButtonVisibility=function(){var e=this._getHeader()._getOrCreateViewSwitch(),t=e.getItems().length>1;e.setProperty("visible",t);return this};w.prototype._attachHeaderEvents=function(){var e=this._getHeader();e.attachEvent("viewChange",this._handleViewChange,this);e.attachEvent("pressPrevious",this._handlePressArrow,this);e.attachEvent("pressToday",this._handlePressToday,this);e.attachEvent("pressNext",this._handlePressArrow,this);e.attachEvent("dateSelect",this._handleCalendarPickerDateSelect,this);e._getOrCreateViewSwitch().attachEvent("selectionChange",this._handleViewSwitchChange,this);return this};w.prototype._attachDelegates=function(){this._afterRenderFocusCell={onAfterRendering:function(){if(this._sGridCellFocusSelector){_(this._sGridCellFocusSelector).focus();this._sGridCellFocusSelector=null}}.bind(this)};this.getAggregation("_grid").addDelegate(this._afterRenderFocusCell);this.getAggregation("_mvgrid").addDelegate(this._afterRenderFocusCell)};w.prototype._attachGridEvents=function(){var e=this.getAggregation("_grid"),t=this.getAggregation("_mvgrid");var i=function(e){this.fireHeaderDateSelect({date:e.getSource().getDate()})};var a=function(e){this.fireAppointmentSelect({appointment:e.getParameter("appointment"),appointments:e.getParameter("appointments")})};var r=function(e){this.fireAppointmentDrop({appointment:e.getParameter("appointment"),startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate"),copy:e.getParameter("copy")})};var s=function(e){this.fireAppointmentResize({appointment:e.getParameter("appointment"),startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var n=function(e){this.fireAppointmentCreate({startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var o=function(e){this.fireEvent("cellPress",{startDate:e.getParameter("startDate"),endDate:e.getParameter("endDate")})};var g=function(e){this.fireEvent("moreLinkPress",{date:e.getParameter("date")})};var l=function(e){var t=this.getAggregation("_grid"),i=t._getDateFormatter(),a=this._getSelectedView().getScrollEntityCount()-t._getColumns()+1,r=new Date(e.getParameter("startDate")),s=e.getParameter("fullDay"),n=this.getStartDate();if(e.getParameter("next")){r.setDate(r.getDate()+a);n=new Date(n.setDate(n.getDate()+this._getSelectedView().getScrollEntityCount()));this.setStartDate(n)}else{r.setDate(r.getDate()-a);n=new Date(n.setDate(n.getDate()-this._getSelectedView().getScrollEntityCount()));this.setStartDate(n)}this._sGridCellFocusSelector=s?"[data-sap-start-date='"+i.format(r)+"'].sapMSinglePCBlockersColumn":"[data-sap-start-date='"+i.format(r)+"'].sapMSinglePCRow"};var p=function(e){var t=new Date(e.getParameter("startDate")),i=h.fromLocalJSDate(t),a;i.setDate(i.getDate()+e.getParameter("offset"));a=i.toLocalJSDate();this.setStartDate(a);this._sGridCellFocusSelector="[sap-ui-date='"+i.valueOf()+"'].sapMSPCMonthDay"};e._getColumnHeaders().attachEvent("select",i,this);e.attachEvent("appointmentSelect",a,this);e.attachEvent("appointmentDrop",r,this);t.attachEvent("appointmentDrop",r,this);e.attachEvent("appointmentResize",s,this);e.attachEvent("appointmentCreate",n,this);e.attachEvent("cellPress",o,this);t.attachEvent("cellPress",o,this);t.attachEvent("moreLinkPress",g,this);e.attachEvent("borderReached",l,this);t.attachEvent("borderReached",p,this);return this};w.prototype._handleViewChange=function(){this.fireViewChange()};w.prototype._handlePressArrow=function(e){this._applyArrowsLogic(e.getId()==="pressPrevious");this._adjustColumnHeadersTopOffset()};w.prototype._handlePressToday=function(){var e=this._getSelectedView().calculateStartDate(new Date);this.setStartDate(e);this.fireStartDateChange({date:e});this._adjustColumnHeadersTopOffset()};w.prototype._handleViewSwitchChange=function(e){var t=this._getCurrentGrid();this.setAssociation("selectedView",e.getParameter("item"));this._transferAggregations(t);this._alignColumns();this._adjustColumnHeadersTopOffset()};w.prototype._transferAggregations=function(e){var t=this._getCurrentGrid(),i,a,r;if(e.getId()!==t.getId()){i=e.removeAllAggregation("appointments",true);for(r=0;r<i.length;r++){t.addAggregation("appointments",i[r],true)}a=e.removeAllAggregation("specialDates",true);for(r=0;r<a.length;r++){t.addAggregation("specialDates",a[r],true)}}};w.prototype._handleCalendarPickerDateSelect=function(){var e=this._getHeader().getStartDate(),t;t=this._getSelectedView().calculateStartDate(new Date(e.getTime()));this.setStartDate(t);if(!this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){this.getAggregation("_grid")._getColumnHeaders().setDate(e)}this.fireStartDateChange({date:t});this._adjustColumnHeadersTopOffset()};w.prototype._updateCalendarPickerSelection=function(){var e=this._getFirstAndLastRangeDate(),t;t=new u({startDate:e.oStartDate.toLocalJSDate(),endDate:e.oEndDate.toLocalJSDate()});this._getHeader().getAggregation("_calendarPicker").removeAllSelectedDates();this._getHeader().getAggregation("_calendarPicker").addSelectedDate(t)};w.prototype._formatPickerText=function(){var e=this._getFirstAndLastRangeDate(),t=e.oStartDate.toLocalJSDate(),i=e.oEndDate.toLocalJSDate(),a=d.getDateInstance({format:"yMMMMd"}),r=a.format(t);if(t.getTime()!==i.getTime()){r+=" - "+a.format(i)}return r};w.prototype._applyArrowsLogic=function(e){var t=h.fromLocalJSDate(this.getStartDate()||new Date),i=e?-1:1,a=this._getSelectedView().getScrollEntityCount(this.getStartDate(),i),r;if(e){a*=-1}t.setDate(t.getDate()+a);r=t.toLocalJSDate();this.setStartDate(r);this.fireStartDateChange({date:r})};w.prototype._getFirstAndLastRangeDate=function(){var e=this._getSelectedView(),t=this._getHeader().getStartDate()||new Date,i=e.getEntityCount()-1,a,r;a=h.fromLocalJSDate(e.calculateStartDate(new Date(t.getTime())));r=new h(a);r.setDate(a.getDate()+i);return{oStartDate:a,oEndDate:r}};w.prototype._alignColumns=function(){var e=this._getHeader(),t=this.getAggregation("_grid"),i=this.getAggregation("_mvgrid"),a=this._getSelectedView(),r=this.getStartDate()||new Date,s=a.calculateStartDate(new Date(r.getTime())),n=h.fromLocalJSDate(s);e.setStartDate(s);e.setPickerText(this._formatPickerText(n));this._updateCalendarPickerSelection();t.setStartDate(s);i.setStartDate(s);t._setColumns(a.getEntityCount());this._setColumnHeaderVisibility()};w.prototype._setColumnHeaderVisibility=function(){var e;if(this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){return}e=!this._getSelectedView().isA("sap.m.SinglePlanningCalendarDayView");this.getAggregation("_grid")._getColumnHeaders().setVisible(e);this.toggleStyleClass("sapMSinglePCHiddenColHeaders",!e)};w.prototype._getHeader=function(){return this.getAggregation("_header")};w.prototype._getCurrentGrid=function(){if(this._getSelectedView().isA("sap.m.SinglePlanningCalendarMonthView")){return this.getAggregation("_mvgrid")}else{return this.getAggregation("_grid")}};w.prototype._registerResizeHandler=function(e,t,i){if(!this[e]){this[e]=p.register(t,i)}return this};w.prototype._deRegisterResizeHandler=function(e){if(this[e]){p.deregister(this[e]);this[e]=null}return this};return w});