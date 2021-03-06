'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _appbaseJs = require('appbase-js');

var _appbaseJs2 = _interopRequireDefault(_appbaseJs);

var _emotionTheming = require('emotion-theming');

var _reactivecore = require('@appbaseio/reactivecore');

var _reactivecore2 = _interopRequireDefault(_reactivecore);

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _URLParamsProvider = require('./URLParamsProvider');

var _URLParamsProvider2 = _interopRequireDefault(_URLParamsProvider);

var _theme = require('../../styles/theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable global-require */

var URLSearchParams = require('url-search-params');

/* use a custom store key so reactivesearch does not interfere
   with a different redux store in a nested context */
var Provider = (0, _reactRedux.createProvider)(_reactivecore.storeKey);

var ReactiveBase = function (_Component) {
	_inherits(ReactiveBase, _Component);

	function ReactiveBase(props) {
		_classCallCheck(this, ReactiveBase);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.type = props.type ? props.type : '*';

		var credentials = props.url && props.url.trim() !== '' && !props.credentials ? null : props.credentials;

		var config = {
			url: props.url && props.url.trim() !== '' ? props.url : 'https://scalr.api.appbase.io',
			app: props.app,
			credentials: credentials,
			type: _this.type
		};

		var queryParams = '';
		if (typeof window !== 'undefined') {
			queryParams = window.location.search;
		} else {
			queryParams = _this.props.queryParams || '';
		}

		_this.params = new URLSearchParams(queryParams);
		var selectedValues = {};

		try {
			Array.from(_this.params.keys()).forEach(function (key) {
				var _extends2;

				selectedValues = _extends({}, selectedValues, (_extends2 = {}, _extends2[key] = { value: JSON.parse(_this.params.get(key)) }, _extends2));
			});
		} catch (e) {
			selectedValues = {};
		}

		var _props$headers = props.headers,
		    headers = _props$headers === undefined ? {} : _props$headers,
		    themePreset = props.themePreset;


		var appbaseRef = new _appbaseJs2.default(config);
		_this.store = (0, _reactivecore2.default)({
			config: _extends({}, config, { mapKey: props.mapKey, themePreset: themePreset }),
			appbaseRef: appbaseRef,
			selectedValues: selectedValues,
			headers: headers
		});
		return _this;
	}

	ReactiveBase.prototype.componentDidCatch = function componentDidCatch() {
		console.error('An error has occured. You\'re using Reactivesearch Version:', (process.env.VERSION || require('../../../package.json').version) + '.', 'If you think this is a problem with Reactivesearch, please try updating', 'to the latest version. If you\'re already at the latest version, please open', 'an issue at https://github.com/appbaseio/reactivesearch/issues');
	};

	ReactiveBase.prototype.render = function render() {
		var theme = (0, _utils.composeThemeObject)((0, _theme2.default)(this.props.themePreset), this.props.theme);
		return _react2.default.createElement(
			_emotionTheming.ThemeProvider,
			{
				theme: theme
			},
			_react2.default.createElement(
				Provider,
				{ store: this.store },
				_react2.default.createElement(
					_URLParamsProvider2.default,
					{
						params: this.params,
						headers: this.props.headers,
						style: this.props.style,
						className: this.props.className
					},
					this.props.children
				)
			)
		);
	};

	return ReactiveBase;
}(_react.Component);

ReactiveBase.defaultProps = {
	theme: {},
	themePreset: 'light'
};

ReactiveBase.propTypes = {
	app: _types2.default.stringRequired,
	children: _types2.default.children,
	credentials: _types2.default.string,
	headers: _types2.default.headers,
	queryParams: _types2.default.string,
	theme: _types2.default.style,
	themePreset: _types2.default.themePreset,
	type: _types2.default.string,
	url: _types2.default.string,
	mapKey: _types2.default.string,
	style: _types2.default.style,
	className: _types2.default.string
};

exports.default = ReactiveBase;