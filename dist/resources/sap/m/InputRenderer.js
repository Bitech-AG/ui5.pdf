/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Renderer","./InputBaseRenderer","sap/m/library"],function(e,t,i,a){"use strict";var n=a.InputType;var s=t.extend(i);s.apiVersion=2;s.addOuterClasses=function(e,t){e.class("sapMInput");if(t.getDescription()){e.class("sapMInputWithDescription")}};s.writeInnerAttributes=function(e,t){e.attr("type",t.getType().toLowerCase());if(t.getType()==n.Number){e.attr("step","any")}if(t.getType()==n.Number&&sap.ui.getCore().getConfiguration().getRTL()){e.attr("dir","ltr");e.style("text-align","right")}if(t.getShowSuggestion()||t.getShowValueStateMessage()){e.attr("autocomplete","off")}if(!t.getEnabled()&&t.getType()=="Password"||t.getShowSuggestion()&&t._bUseDialog||t.getValueHelpOnly()&&t.getEnabled()&&t.getEditable()&&t.getShowValueHelp()){e.attr("readonly","readonly")}};s.addInnerClasses=function(e,t){};s.writeDescription=function(e,t){e.openStart("div");e.class("sapMInputDescriptionWrapper");e.style("width","calc(100% - "+t.getFieldWidth()+")");e.openEnd();e.openStart("span",t.getId()+"-descr");e.class("sapMInputDescriptionText");e.openEnd();e.text(t.getDescription());e.close("span");e.close("div")};s.writeDecorations=function(e,t){if(t.getDescription()){this.writeDescription(e,t)}if(sap.ui.getCore().getConfiguration().getAccessibility()){if(t.getShowSuggestion()&&t.getEnabled()&&t.getEditable()){e.openStart("span",t.getId()+"-SuggDescr").class("sapUiPseudoInvisibleText").attr("role","status").attr("aria-live","polite").openEnd().close("span")}}};s.addWrapperStyles=function(e,t){e.style("width",t.getDescription()?t.getFieldWidth():"100%")};s.getAriaLabelledBy=function(e){var t=i.getAriaLabelledBy.call(this,e)||"";if(e.getDescription()){t=t+" "+e.getId()+"-descr"}return t};s.getAriaDescribedBy=function(t){var a=i.getAriaDescribedBy.apply(this,arguments);function n(e){a=a?a+" "+e:e}if(t.getShowValueHelp()&&t.getEnabled()&&t.getEditable()){n(e.getStaticId("sap.m","INPUT_VALUEHELP"));if(t.getValueHelpOnly()){n(e.getStaticId("sap.m","INPUT_DISABLED"))}}if(t.getShowSuggestion()&&t.getEnabled()&&t.getEditable()){n(t.getId()+"-SuggDescr")}return a};s.getAriaRole=function(e){return""};s.getAccessibilityState=function(e){var t=i.getAccessibilityState.apply(this,arguments);if(e.getShowSuggestion()&&e.getEnabled()&&e.getEditable()){t.autocomplete="list"}return t};return s},true);