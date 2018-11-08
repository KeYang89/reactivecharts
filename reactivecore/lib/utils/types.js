Object.defineProperty(exports,"__esModule",{value:true});var _propTypes=require('prop-types');var _dateFormats=require('./dateFormats');var _dateFormats2=_interopRequireDefault(_dateFormats);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var reactKeyType=(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string),_propTypes.object]);function validateLocation(props,propName){if(isNaN(props[propName])){return new Error(propName+' value must be a number');}if(propName==='lat'&&(props[propName]<-90||props[propName]>90)){return new Error(propName+' value should be between -90 and 90.');}else if(propName==='lng'&&(props[propName]<-180||props[propName]>180)){return new Error(propName+' value should be between -180 and 180.');}return null;}var types={any:_propTypes.any,bool:_propTypes.bool,boolRequired:_propTypes.bool.isRequired,components:(0,_propTypes.arrayOf)(_propTypes.string),children:_propTypes.any,data:(0,_propTypes.arrayOf)(_propTypes.object),dataFieldArray:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string)]).isRequired,dataNumberBox:(0,_propTypes.shape)({label:_propTypes.string,start:_propTypes.number.isRequired,end:_propTypes.number.isRequired}).isRequired,date:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string)]),dateObject:_propTypes.object,dateRange:(0,_propTypes.shape)({start:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string)]),end:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string)])}),fieldWeights:(0,_propTypes.arrayOf)(_propTypes.number),filterLabel:_propTypes.string,func:_propTypes.func,funcRequired:_propTypes.func.isRequired,fuzziness:(0,_propTypes.oneOf)([0,1,2,'AUTO']),headers:_propTypes.object,hits:(0,_propTypes.arrayOf)(_propTypes.object),iconPosition:(0,_propTypes.oneOf)(['left','right']),labelPosition:(0,_propTypes.oneOf)(['left','right','top','bottom']),number:_propTypes.number,options:(0,_propTypes.oneOfType)([(0,_propTypes.arrayOf)(_propTypes.object),_propTypes.object]),paginationAt:(0,_propTypes.oneOf)(['top','bottom','both']),range:(0,_propTypes.shape)({start:_propTypes.number,end:_propTypes.number}),rangeLabels:(0,_propTypes.shape)({start:_propTypes.string,end:_propTypes.string}),react:(0,_propTypes.shape)({and:reactKeyType,or:reactKeyType,not:reactKeyType}),selectedValues:_propTypes.object,selectedValue:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string),(0,_propTypes.arrayOf)(_propTypes.object),_propTypes.object,_propTypes.number,(0,_propTypes.arrayOf)(_propTypes.number)]),suggestions:(0,_propTypes.arrayOf)(_propTypes.object),supportedOrientations:(0,_propTypes.oneOf)(['portrait','portrait-upside-down','landscape','landscape-left','landscape-right']),sortBy:(0,_propTypes.oneOf)(['asc','desc']),sortOptions:(0,_propTypes.arrayOf)((0,_propTypes.shape)({label:_propTypes.string,dataField:_propTypes.string,sortBy:_propTypes.string})),sortByWithCount:(0,_propTypes.oneOf)(['asc','desc','count']),stats:(0,_propTypes.arrayOf)(_propTypes.object),string:_propTypes.string,stringArray:(0,_propTypes.arrayOf)(_propTypes.string),stringOrArray:(0,_propTypes.oneOfType)([_propTypes.string,(0,_propTypes.arrayOf)(_propTypes.string)]),stringRequired:_propTypes.string.isRequired,style:_propTypes.object,themePreset:(0,_propTypes.oneOf)(['light','dark']),queryFormatDate:(0,_propTypes.oneOf)(Object.keys(_dateFormats2.default)),queryFormatSearch:(0,_propTypes.oneOf)(['and','or']),queryFormatNumberBox:(0,_propTypes.oneOf)(['exact','lte','gte']),params:_propTypes.object.isRequired,props:_propTypes.object,rangeLabelsAlign:(0,_propTypes.oneOf)(['left','right']),title:(0,_propTypes.oneOfType)([_propTypes.string,_propTypes.any]),location:(0,_propTypes.shape)({lat:validateLocation,lng:validateLocation}),unit:(0,_propTypes.oneOf)(['mi','miles','yd','yards','ft','feet','in','inch','km','kilometers','m','meters','cm','centimeters','mm','millimeters','NM','nmi','nauticalmiles'])};exports.default=types;