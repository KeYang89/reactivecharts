Object.defineProperty(exports,"__esModule",{value:true});exports.setValue=setValue;exports.clearValues=clearValues;var _constants=require('../constants');function setValue(component,value,label,showFilter,URLParams){return{type:_constants.SET_VALUE,component:component,value:value,label:label,showFilter:showFilter,URLParams:URLParams};}function clearValues(){return{type:_constants.CLEAR_VALUES};}