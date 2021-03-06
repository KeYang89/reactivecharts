'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emotionTheming = require('emotion-theming');

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _Button = require('../../styles/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Container = require('../../styles/Container');

var _Container2 = _interopRequireDefault(_Container);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedFilters = function (_Component) {
	_inherits(SelectedFilters, _Component);

	function SelectedFilters() {
		var _temp, _this, _ret;

		_classCallCheck(this, SelectedFilters);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.remove = function (component) {
			_this.props.setValue(component, null);
		}, _this.renderValue = function (value, isArray) {
			if (isArray && value.length) {
				var arrayToRender = value.map(function (item) {
					return _this.renderValue(item);
				});
				return arrayToRender.join(', ');
			} else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				// TODO: support for NestedList
				var label = value.label || value.key || value.distance || null;
				if (value.location) {
					label = value.location + ' - ' + label;
				}
				return label;
			}
			return value;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	SelectedFilters.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    selectedValues = _props.selectedValues,
		    theme = _props.theme;

		var hasValues = false;

		return _react2.default.createElement(
			_Container2.default,
			{ style: this.props.style, className: (0, _Button.filters)(theme) + ' ' + (this.props.className || '') },
			Object.keys(selectedValues).filter(function (id) {
				return _this2.props.components.includes(id) && selectedValues[id].showFilter;
			}).map(function (component, index) {
				var _selectedValues$compo = selectedValues[component],
				    label = _selectedValues$compo.label,
				    value = _selectedValues$compo.value;

				var isArray = Array.isArray(value);

				if (label && (isArray && value.length || !isArray && value)) {
					hasValues = true;
					return _react2.default.createElement(
						_Button2.default,
						{
							className: (0, _helper.getClassName)(_this2.props.innerClass, 'button') || null,
							key: component + '-' + index // eslint-disable-line
							, onClick: function onClick() {
								return _this2.remove(component);
							}
						},
						_react2.default.createElement(
							'span',
							null,
							selectedValues[component].label,
							': ',
							_this2.renderValue(value, isArray)
						),
						_react2.default.createElement(
							'span',
							null,
							'\u2715'
						)
					);
				}
				return null;
			}),
			this.props.showClearAll && hasValues ? _react2.default.createElement(
				_Button2.default,
				{
					className: (0, _helper.getClassName)(this.props.innerClass, 'button') || null,
					onClick: this.props.clearValues
				},
				this.props.clearAllLabel
			) : null
		);
	};

	return SelectedFilters;
}(_react.Component);

SelectedFilters.propTypes = {
	clearValues: _types2.default.func,
	setValue: _types2.default.func,
	components: _types2.default.components,
	selectedValues: _types2.default.selectedValues,
	className: _types2.default.string,
	clearAllLabel: _types2.default.title,
	innerClass: _types2.default.style,
	showClearAll: _types2.default.bool,
	style: _types2.default.style,
	theme: _types2.default.style
};

SelectedFilters.defaultProps = {
	className: null,
	clearAllLabel: 'Clear All',
	showClearAll: true,
	style: {}
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		components: state.components,
		selectedValues: state.selectedValues
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch) {
	return {
		clearValues: function clearValues() {
			return dispatch((0, _actions.clearValues)());
		},
		setValue: function setValue(component, value) {
			return dispatch((0, _actions.setValue)(component, value));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)((0, _emotionTheming.withTheme)(SelectedFilters));