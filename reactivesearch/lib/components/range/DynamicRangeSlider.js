'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Slider = require('rheostat/lib/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _HistogramContainer = require('./addons/HistogramContainer');

var _HistogramContainer2 = _interopRequireDefault(_HistogramContainer);

var _RangeLabel = require('./addons/RangeLabel');

var _RangeLabel2 = _interopRequireDefault(_RangeLabel);

var _Slider3 = require('../../styles/Slider');

var _Slider4 = _interopRequireDefault(_Slider3);

var _Title = require('../../styles/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Label = require('../../styles/Label');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DynamicRangeSlider = function (_Component) {
	_inherits(DynamicRangeSlider, _Component);

	function DynamicRangeSlider(props) {
		_classCallCheck(this, DynamicRangeSlider);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		_this.state = {
			currentValue: null,
			range: null,
			stats: []
		};
		_this.internalHistogramComponent = _this.props.componentId + '__histogram__internal';
		_this.internalRangeComponent = _this.props.componentId + '__range__internal';
		_this.internalMatchAllComponent = _this.props.componentId + '__match_all__internal';
		_this.locked = false;
		return _this;
	}

	DynamicRangeSlider.prototype.componentWillMount = function componentWillMount() {
		this.props.addComponent(this.props.componentId);
		this.props.addComponent(this.internalHistogramComponent);
		this.props.addComponent(this.internalRangeComponent);

		// get range before executing other queries
		this.updateRangeQueryOptions(this.props);
		this.setReact(this.props);
	};

	DynamicRangeSlider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this2 = this;

		if (!(0, _helper.isEqual)(this.props.range, nextProps.range) && nextProps.range) {
			this.updateQueryOptions(nextProps, nextProps.range);
			// floor and ceil to take edge cases into account
			this.updateRange({
				start: Math.floor(nextProps.range.start),
				end: Math.ceil(nextProps.range.end)
			});

			// only listen to selectedValue initially, after the
			// component has mounted and range is received
			if (nextProps.selectedValue && !this.state.currentValue) {
				this.handleChange(nextProps.selectedValue, nextProps);
			} else if (nextProps.defaultSelected) {
				var _nextProps$defaultSel = nextProps.defaultSelected(nextProps.range.start, nextProps.range.end),
				    start = _nextProps$defaultSel.start,
				    end = _nextProps$defaultSel.end;

				this.handleChange([start, end], nextProps);
			} else {
				this.handleChange([Math.floor(nextProps.range.start), Math.ceil(nextProps.range.end)], nextProps);
			}
		} else if (!(0, _helper.isEqual)(this.props.defaultSelected, nextProps.defaultSelected) && nextProps.range) {
			var _nextProps$defaultSel2 = nextProps.defaultSelected(nextProps.range.start, nextProps.range.end),
			    _start = _nextProps$defaultSel2.start,
			    _end = _nextProps$defaultSel2.end;

			this.handleChange([_start, _end], nextProps);
		}

		(0, _helper.checkPropChange)(this.props.react, nextProps.react, function () {
			_this2.updateRangeQueryOptions(nextProps);
			_this2.setReact(nextProps);
		});
		(0, _helper.checkPropChange)(this.props.dataField, nextProps.dataField, function () {
			_this2.updateRangeQueryOptions(nextProps);
		});
		(0, _helper.checkSomePropChange)(this.props, nextProps, ['showHistogram', 'interval'], function () {
			return _this2.updateQueryOptions(nextProps, nextProps.range || _this2.state.range);
		});
		(0, _helper.checkPropChange)(this.props.options, nextProps.options, function () {
			var options = nextProps.options;

			options.sort(function (a, b) {
				if (a.key < b.key) return -1;
				if (a.key > b.key) return 1;
				return 0;
			});
			_this2.setState({
				stats: options
			});
		});
	};

	DynamicRangeSlider.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		if (nextState.range) {
			var upperLimit = Math.floor((nextState.range.end - nextState.range.start) / 2);
			if (nextProps.stepValue < 1 || nextProps.stepValue > upperLimit) {
				console.warn('stepValue for DynamicRangeSlider ' + nextProps.componentId + ' should be greater than 0 and less than or equal to ' + upperLimit);
				return false;
			}
			return true;
		}
		return true;
	};

	DynamicRangeSlider.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalHistogramComponent);
		this.props.removeComponent(this.internalRangeComponent);
		this.props.removeComponent(this.internalMatchAllComponent);
	};

	DynamicRangeSlider.prototype.render = function render() {
		if (!this.state.currentValue || !this.state.range) {
			return null;
		}

		var _getRangeLabels = this.getRangeLabels(),
		    startLabel = _getRangeLabels.startLabel,
		    endLabel = _getRangeLabels.endLabel;

		return _react2.default.createElement(
			_Slider4.default,
			{ primary: true, style: this.props.style, className: this.props.className },
			this.props.title && _react2.default.createElement(
				_Title2.default,
				{
					className: (0, _helper.getClassName)(this.props.innerClass, 'title') || null
				},
				this.props.title
			),
			this.state.stats.length && this.props.showHistogram ? _react2.default.createElement(_HistogramContainer2.default, {
				stats: this.state.stats,
				range: this.state.range,
				interval: this.getValidInterval(this.props, this.state.range)
			}) : null,
			_react2.default.createElement(_Slider2.default, {
				min: this.state.range.start,
				max: this.state.range.end,
				values: this.state.currentValue,
				onChange: this.handleSlider,
				onValuesUpdated: this.handleDrag,
				snap: this.props.snap,
				snapPoints: this.props.snap ? this.getSnapPoints() : null,
				className: (0, _helper.getClassName)(this.props.innerClass, 'slider')
			}),
			_react2.default.createElement(
				'div',
				{ className: _Label.rangeLabelsContainer },
				_react2.default.createElement(
					_RangeLabel2.default,
					{
						align: 'left',
						className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null
					},
					startLabel
				),
				_react2.default.createElement(
					_RangeLabel2.default,
					{
						align: 'right',
						className: (0, _helper.getClassName)(this.props.innerClass, 'label') || null
					},
					endLabel
				)
			)
		);
	};

	return DynamicRangeSlider;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.setReact = function (props) {
		var react = props.react;

		if (react) {
			props.watchComponent(_this3.internalRangeComponent, props.react);
			var newReact = (0, _helper.pushToAndClause)(react, _this3.internalHistogramComponent);
			props.watchComponent(props.componentId, newReact);
		} else {
			// internalRangeComponent watches internalMatchAll component allowing execution of query
			// in case of no react prop
			_this3.props.addComponent(_this3.internalMatchAllComponent);
			props.setQueryOptions(_this3.internalMatchAllComponent, { aggs: { match_all: {} } }, false);
			props.watchComponent(_this3.internalRangeComponent, { and: _this3.internalMatchAllComponent });
			props.watchComponent(props.componentId, { and: _this3.internalHistogramComponent });
		}
	};

	this.defaultQuery = function (value, props) {
		if (Array.isArray(value) && value.length) {
			var _range;

			return {
				range: (_range = {}, _range[props.dataField] = {
					gte: value[0],
					lte: value[1],
					boost: 2.0
				}, _range)
			};
		}
		return null;
	};

	this.getSnapPoints = function () {
		var snapPoints = [];
		var stepValue = _this3.props.stepValue;
		var range = _this3.state.range;

		// limit the number of steps to prevent generating a large number of snapPoints

		if ((range.end - range.start) / stepValue > 100) {
			stepValue = (range.end - range.start) / 100;
		}

		for (var i = range.start; i <= range.end; i += stepValue) {
			snapPoints = snapPoints.concat(i);
		}
		if (snapPoints[snapPoints.length - 1] !== range.end) {
			snapPoints = snapPoints.concat(range.end);
		}
		return snapPoints;
	};

	this.getValidInterval = function (props, range) {
		var min = Math.ceil((range.end - range.start) / 100) || 1;
		if (!props.interval) {
			return min;
		} else if (props.interval < min) {
			console.error(props.componentId + ': interval prop\'s value should be greater than or equal to ' + min);
			return min;
		}
		return props.interval;
	};

	this.histogramQuery = function (props, range) {
		var _ref;

		return _ref = {}, _ref[props.dataField] = {
			histogram: {
				field: props.dataField,
				interval: _this3.getValidInterval(props, range),
				offset: range.start
			}
		}, _ref;
	};

	this.rangeQuery = function (props) {
		return {
			min: { min: { field: props.dataField } },
			max: { max: { field: props.dataField } }
		};
	};

	this.handleChange = function (currentValue) {
		var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this3.props;

		// ignore state updates when component is locked
		if (props.beforeValueChange && _this3.locked) {
			return;
		}
		// always keep the values within range
		var normalizedValue = [currentValue[0] < props.range.start ? props.range.start : currentValue[0], currentValue[1] > props.range.end ? props.range.end : currentValue[1]];
		_this3.locked = true;
		var performUpdate = function performUpdate() {
			_this3.setState({
				currentValue: normalizedValue
			}, function () {
				_this3.updateQuery([normalizedValue[0], normalizedValue[1]], props);
				_this3.locked = false;
			});
		};
		(0, _helper.checkValueChange)(props.componentId, {
			start: normalizedValue[0],
			end: normalizedValue[1]
		}, props.beforeValueChange, props.onValueChange, performUpdate);
	};

	this.handleSlider = function (_ref2) {
		var values = _ref2.values;

		_this3.handleChange(values);
	};

	this.handleDrag = function (values) {
		if (_this3.props.onDrag) {
			var min = values.min,
			    max = values.max,
			    currentValue = values.values;

			_this3.props.onDrag(currentValue, [min, max]);
		}
	};

	this.updateQuery = function (value, props) {
		var query = props.customQuery || _this3.defaultQuery;

		var _props$onQueryChange = props.onQueryChange,
		    onQueryChange = _props$onQueryChange === undefined ? null : _props$onQueryChange;


		props.updateQuery({
			componentId: props.componentId,
			query: query(value, props),
			value: value,
			label: props.filterLabel,
			showFilter: false, // disable filters for DynamicRangeSlider
			URLParams: props.URLParams,
			onQueryChange: onQueryChange
		});
	};

	this.updateQueryOptions = function (props, range) {
		if (props.showHistogram) {
			var queryOptions = {
				aggs: _this3.histogramQuery(props, range)
			};

			props.setQueryOptions(_this3.internalHistogramComponent, queryOptions, false);

			var query = props.customQuery || _this3.defaultQuery;

			props.updateQuery({
				componentId: _this3.internalHistogramComponent,
				query: query([range.start, range.end], props)
			});
		}
	};

	this.updateRange = function (range) {
		_this3.setState({
			range: range
		});
	};

	this.updateRangeQueryOptions = function (props) {
		var queryOptions = {
			aggs: _this3.rangeQuery(props)
		};

		props.setQueryOptions(_this3.internalRangeComponent, queryOptions);
	};

	this.getRangeLabels = function () {
		var _state$range = _this3.state.range,
		    startLabel = _state$range.start,
		    endLabel = _state$range.end;


		if (_this3.props.rangeLabels) {
			var rangeLabels = _this3.props.rangeLabels(_this3.props.range.start, _this3.props.range.end);
			startLabel = rangeLabels.start;
			endLabel = rangeLabels.end;
		}

		return {
			startLabel: startLabel,
			endLabel: endLabel
		};
	};
};

DynamicRangeSlider.propTypes = {
	addComponent: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setQueryOptions: _types2.default.funcRequired,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	options: _types2.default.options,
	range: _types2.default.range,
	selectedValue: _types2.default.selectedValue,
	// component props
	beforeValueChange: _types2.default.func,
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	customQuery: _types2.default.func,
	dataField: _types2.default.stringRequired,
	defaultSelected: _types2.default.func,
	filterLabel: _types2.default.string,
	innerClass: _types2.default.style,
	interval: _types2.default.number,
	onDrag: _types2.default.func,
	onQueryChange: _types2.default.func,
	onValueChange: _types2.default.func,
	rangeLabels: _types2.default.func,
	react: _types2.default.react,
	showHistogram: _types2.default.bool,
	snap: _types2.default.bool,
	stepValue: _types2.default.number,
	style: _types2.default.style,
	title: _types2.default.title,
	URLParams: _types2.default.boolRequired
};

DynamicRangeSlider.defaultProps = {
	className: null,
	showHistogram: true,
	snap: true,
	stepValue: 1,
	style: {},
	URLParams: false
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		options: state.aggregations[props.componentId] && state.aggregations[props.componentId][props.dataField] && state.aggregations[props.componentId][props.dataField].buckets ? state.aggregations[props.componentId][props.dataField].buckets : [],
		range: state.aggregations[props.componentId + '__range__internal'] && state.aggregations[props.componentId + '__range__internal'].min ? {
			start: state.aggregations[props.componentId + '__range__internal'].min.value,
			end: state.aggregations[props.componentId + '__range__internal'].max.value
		} : null,
		selectedValue: state.selectedValues[props.componentId] ? state.selectedValues[props.componentId].value : null
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch) {
	return {
		addComponent: function addComponent(component) {
			return dispatch((0, _actions.addComponent)(component));
		},
		removeComponent: function removeComponent(component) {
			return dispatch((0, _actions.removeComponent)(component));
		},
		setQueryOptions: function setQueryOptions(component, props, execute) {
			return dispatch((0, _actions.setQueryOptions)(component, props, execute));
		},
		updateQuery: function updateQuery(updateQueryObject) {
			return dispatch((0, _actions.updateQuery)(updateQueryObject));
		},
		watchComponent: function watchComponent(component, react) {
			return dispatch((0, _actions.watchComponent)(component, react));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(DynamicRangeSlider);