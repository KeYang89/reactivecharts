'use strict';

exports.__esModule = true;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var left = /*#__PURE__*/(0, _reactEmotion.css)('padding-left:12px;left:0;');

var right = /*#__PURE__*/(0, _reactEmotion.css)('padding-right:12px;right:0;');

var InputIcon = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
	target: 'ekqohx90'
})('position:absolute;top:calc(50% - 8px);', function (_ref) {
	var iconPosition = _ref.iconPosition;

	if (iconPosition === 'left') {
		return left;
	} else if (iconPosition === 'right') {
		return right;
	}
	return null;
}, '\n\n\tsvg.search-icon{fill:', function (_ref2) {
	var theme = _ref2.theme;
	return theme.colors.primaryColor;
}, ';}');

exports.default = InputIcon;