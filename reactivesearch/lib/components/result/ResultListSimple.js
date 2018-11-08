'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);


var _ListItem = require('../../styles/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ReactiveList = require('./ReactiveList');

var _ReactiveList2 = _interopRequireDefault(_ReactiveList);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultListSimple = function (_Component) {
	_inherits(ResultListSimple, _Component);

	function ResultListSimple() {
		var _temp, _this, _ret;

		_classCallCheck(this, ResultListSimple);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderAsListItem = function (item) {
			var result = _this.props.onData(item);

			if (result) {
				return JSON.stringify(result);
			}

			return null;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	ResultListSimple.prototype.render = function render() {
		var _props = this.props,
		    onData = _props.onData,
		    props = _objectWithoutProperties(_props, ['onData']);

		return _react2.default.createElement(_ReactiveList2.default, _extends({}, props, {
			onData: this.renderAsListItem,
			listClass: _ListItem.container
		}));
	};

	return ResultListSimple;
}(_react.Component);

ResultListSimple.propTypes = {
	innerClass: _types2.default.style,
	target: _types2.default.stringRequired,
	onData: _types2.default.func
};

ResultListSimple.defaultProps = {
	target: '_blank'
};

exports.default = ResultListSimple;