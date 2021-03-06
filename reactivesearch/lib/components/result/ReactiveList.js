'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('@appbaseio/reactivecore/lib/actions');

var _helper = require('@appbaseio/reactivecore/lib/utils/helper');

var _types = require('@appbaseio/reactivecore/lib/utils/types');

var _types2 = _interopRequireDefault(_types);

var _Pagination = require('./addons/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _PoweredBy = require('./addons/PoweredBy');

var _PoweredBy2 = _interopRequireDefault(_PoweredBy);

var _Flex = require('../../styles/Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _results = require('../../styles/results');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactiveList = function (_Component) {
	_inherits(ReactiveList, _Component);

	function ReactiveList(props) {
		_classCallCheck(this, ReactiveList);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		var currentPage = 0;
		if (_this.props.defaultPage >= 0) {
			currentPage = _this.props.defaultPage;
		} else if (_this.props.currentPage) {
			currentPage = Math.max(_this.props.currentPage - 1, 0);
		}

		_this.state = {
			from: props.currentPage * props.size,
			isLoading: false,
			currentPage: currentPage
		};
		_this.internalComponent = props.componentId + '__internal';
		return _this;
	}

	ReactiveList.prototype.componentDidMount = function componentDidMount() {
		this.props.addComponent(this.internalComponent);
		this.props.addComponent(this.props.componentId);

		if (this.props.stream) {
			this.props.setStreaming(this.props.componentId, true);
		}

		var options = (0, _helper.getQueryOptions)(this.props);
		options.from = this.state.from;
		if (this.props.sortOptions) {
			var _ref;

			options.sort = [(_ref = {}, _ref[this.props.sortOptions[0].dataField] = {
				order: this.props.sortOptions[0].sortBy
			}, _ref)];
		} else if (this.props.sortBy) {
			var _ref2;

			options.sort = [(_ref2 = {}, _ref2[this.props.dataField] = {
				order: this.props.sortBy
			}, _ref2)];
		}

		// Override sort query with defaultQuery's sort if defined
		this.defaultQuery = null;
		if (this.props.defaultQuery) {
			this.defaultQuery = this.props.defaultQuery();
			if (this.defaultQuery.sort) {
				options.sort = this.defaultQuery.sort;
			}
		}

		this.props.setQueryOptions(this.props.componentId, options, !(this.defaultQuery && this.defaultQuery.query));
		this.setReact(this.props);

		if (this.defaultQuery) {
			var _defaultQuery = this.defaultQuery,
			    sort = _defaultQuery.sort,
			    query = _objectWithoutProperties(_defaultQuery, ['sort']);

			this.props.updateQuery({
				componentId: this.internalComponent,
				query: query
			});
		} else {
			this.props.updateQuery({
				componentId: this.internalComponent,
				query: null
			});
		}

		if (!this.props.pagination) {
			window.addEventListener('scroll', this.scrollHandler);
		}
	};

	ReactiveList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var totalPages = Math.ceil(nextProps.total / nextProps.size) || 0;

		if (!(0, _helper.isEqual)(this.props.sortOptions, nextProps.sortOptions) || this.props.sortBy !== nextProps.sortBy || this.props.size !== nextProps.size || !(0, _helper.isEqual)(this.props.dataField, nextProps.dataField)) {
			var options = (0, _helper.getQueryOptions)(nextProps);
			options.from = this.state.from;
			if (nextProps.sortOptions) {
				var _ref3;

				options.sort = [(_ref3 = {}, _ref3[nextProps.sortOptions[0].dataField] = {
					order: nextProps.sortOptions[0].sortBy
				}, _ref3)];
			} else if (nextProps.sortBy) {
				var _ref4;

				options.sort = [(_ref4 = {}, _ref4[nextProps.dataField] = {
					order: nextProps.sortBy
				}, _ref4)];
			}
			this.props.setQueryOptions(this.props.componentId, options, true);
		}

		if (nextProps.defaultQuery && !(0, _helper.isEqual)(nextProps.defaultQuery(), this.defaultQuery)) {
			var _options = (0, _helper.getQueryOptions)(nextProps);
			_options.from = this.state.from;
			this.defaultQuery = nextProps.defaultQuery();

			var _defaultQuery2 = this.defaultQuery,
			    sort = _defaultQuery2.sort,
			    query = _objectWithoutProperties(_defaultQuery2, ['sort']);

			if (sort) {
				_options.sort = this.defaultQuery.sort;
				nextProps.setQueryOptions(nextProps.componentId, _options, !query);
			}

			this.props.updateQuery({
				componentId: this.internalComponent,
				query: query
			});
		}

		if (this.props.stream !== nextProps.stream) {
			this.props.setStreaming(nextProps.componentId, nextProps.stream);
		}

		if (!(0, _helper.isEqual)(nextProps.react, this.props.react)) {
			this.setReact(nextProps);
		}

		if (this.props.pagination) {
			// called when page is changed
			if (this.state.isLoading) {
				if (nextProps.onPageChange) {
					nextProps.onPageChange(this.state.currentPage + 1, totalPages);
				} else {
					window.scrollTo(0, 0);
				}
				this.setState({
					isLoading: false
				});
			}

			if (this.props.currentPage !== nextProps.currentPage && nextProps.currentPage > 0 && nextProps.currentPage <= totalPages) {
				this.setPage(nextProps.currentPage - 1);
			}
		}

		if (!nextProps.pagination && this.props.hits && nextProps.hits && (this.props.hits.length < nextProps.hits.length || nextProps.hits.length === nextProps.total)) {
			this.setState({
				isLoading: false
			});
		}

		if (!nextProps.pagination && nextProps.hits && this.props.hits && nextProps.hits.length < this.props.hits.length) {
			window.scrollTo(0, 0);
			this.setState({
				from: 0,
				isLoading: false
			});
		}

		if (nextProps.pagination && nextProps.total !== this.props.total) {
			var currentPage = this.props.total ? 0 : this.state.currentPage;
			this.setState({
				currentPage: currentPage
			});

			if (nextProps.onPageChange) {
				nextProps.onPageChange(currentPage + 1, totalPages);
			}
		}

		if (nextProps.pagination !== this.props.pagination) {
			if (nextProps.pagination) {
				window.addEventListener('scroll', this.scrollHandler);
			} else {
				window.removeEventListener('scroll', this.scrollHandler);
			}
		}
	};

	ReactiveList.prototype.componentWillUnmount = function componentWillUnmount() {
		this.props.removeComponent(this.props.componentId);
		this.props.removeComponent(this.internalComponent);
	};

	ReactiveList.prototype.render = function render() {
		var results = (0, _helper.parseHits)(this.props.hits) || [];
		var streamResults = (0, _helper.parseHits)(this.props.streamHits) || [];
		var filteredResults = results;

		if (streamResults.length) {
			var ids = streamResults.map(function (item) {
				return item._id;
			});
			filteredResults = filteredResults.filter(function (item) {
				return !ids.includes(item._id);
			});
		}

		return _react2.default.createElement(
			'div',
			{ style: this.props.style, className: this.props.className },
			this.props.isLoading && this.props.pagination && this.props.loader && this.props.loader,
			_react2.default.createElement(
				_Flex2.default,
				{
					labelPosition: this.props.sortOptions ? 'right' : 'left',
					className: (0, _helper.getClassName)(this.props.innerClass, 'resultsInfo')
				},
				this.props.sortOptions ? this.renderSortOptions() : null,
				this.props.showResultStats ? this.renderResultStats() : null
			),
			this.props.pagination && (this.props.paginationAt === 'top' || this.props.paginationAt === 'both') ? _react2.default.createElement(_Pagination2.default, {
				pages: this.props.pages,
				totalPages: Math.ceil(this.props.total / this.props.size),
				currentPage: this.state.currentPage,
				setPage: this.setPage,
				innerClass: this.props.innerClass
			}) : null,
			this.props.onAllData ? this.props.onAllData(results, streamResults, this.loadMore) : _react2.default.createElement(
				'div',
				{ className: this.props.listClass + ' ' + (0, _helper.getClassName)(this.props.innerClass, 'list') },
				[].concat(streamResults, filteredResults).map(this.props.onData)
			),
			this.state.isLoading && !this.props.pagination ? this.props.loader || _react2.default.createElement(
				'div',
				{ style: { textAlign: 'center', margin: '20px 0', color: '#666' } },
				'Loading...'
			) : null,
			this.props.pagination && (this.props.paginationAt === 'bottom' || this.props.paginationAt === 'both') ? _react2.default.createElement(_Pagination2.default, {
				pages: this.props.pages,
				totalPages: Math.ceil(this.props.total / this.props.size),
				currentPage: this.state.currentPage,
				setPage: this.setPage,
				innerClass: this.props.innerClass
			}) : null,
			this.props.url.endsWith('appbase.io') && results.length ? _react2.default.createElement(
				_Flex2.default,
				{
					direction: 'row-reverse',
					className: (0, _helper.getClassName)(this.props.innerClass, 'poweredBy')
				},
				_react2.default.createElement(_PoweredBy2.default, null)
			) : null
		);
	};

	return ReactiveList;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.setReact = function (props) {
		var react = props.react;

		if (react) {
			var newReact = (0, _helper.pushToAndClause)(react, _this2.internalComponent);
			props.watchComponent(props.componentId, newReact);
		} else {
			props.watchComponent(props.componentId, { and: _this2.internalComponent });
		}
	};

	this.scrollHandler = function () {
		if (!_this2.state.isLoading && window.innerHeight + window.scrollY + 300 >= document.body.offsetHeight) {
			_this2.loadMore();
		}
	};

	this.loadMore = function () {
		if (_this2.props.hits && !_this2.props.pagination && _this2.props.total !== _this2.props.hits.length) {
			var value = _this2.state.from + _this2.props.size;
			var options = (0, _helper.getQueryOptions)(_this2.props);

			_this2.setState({
				from: value,
				isLoading: true
			});
			_this2.props.loadMore(_this2.props.componentId, _extends({}, options, {
				from: value
			}), true);
		} else if (_this2.state.isLoading) {
			_this2.setState({
				isLoading: false
			});
		}
	};

	this.setPage = function (page) {
		var value = _this2.props.size * page;
		var options = (0, _helper.getQueryOptions)(_this2.props);
		options.from = _this2.state.from;
		_this2.setState({
			from: value,
			isLoading: true,
			currentPage: page
		});
		_this2.props.loadMore(_this2.props.componentId, _extends({}, options, {
			from: value
		}), false);

		if (_this2.props.URLParams) {
			_this2.props.setPageURL(_this2.props.componentId + '-page', page + 1, _this2.props.componentId + '-page', false, true);
		}
	};

	this.renderResultStats = function () {
		if (_this2.props.onResultStats && _this2.props.total) {
			return _this2.props.onResultStats(_this2.props.total, _this2.props.time);
		} else if (_this2.props.total) {
			return _react2.default.createElement(
				'p',
				{ className: _results.resultStats + ' ' + (0, _helper.getClassName)(_this2.props.innerClass, 'resultStats') },
				_this2.props.total,
				' results found in ',
				_this2.props.time,
				'ms'
			);
		}
		return null;
	};

	this.handleSortChange = function (e) {
		var _ref5;

		var index = e.target.value;
		var options = (0, _helper.getQueryOptions)(_this2.props);
		options.from = _this2.state.from;

		options.sort = [(_ref5 = {}, _ref5[_this2.props.sortOptions[index].dataField] = {
			order: _this2.props.sortOptions[index].sortBy
		}, _ref5)];
		_this2.props.setQueryOptions(_this2.props.componentId, options, true);
	};

	this.renderSortOptions = function () {
		return _react2.default.createElement(
			'select',
			{
				className: _results.sortOptions + ' ' + (0, _helper.getClassName)(_this2.props.innerClass, 'sortOptions'),
				name: 'sort-options',
				onChange: _this2.handleSortChange
			},
			_this2.props.sortOptions.map(function (sort, index) {
				return _react2.default.createElement(
					'option',
					{ key: sort.label, value: index },
					sort.label
				);
			})
		);
	};
};

ReactiveList.propTypes = {
	addComponent: _types2.default.funcRequired,
	loadMore: _types2.default.funcRequired,
	removeComponent: _types2.default.funcRequired,
	setPageURL: _types2.default.func,
	setQueryOptions: _types2.default.funcRequired,
	setStreaming: _types2.default.func,
	updateQuery: _types2.default.funcRequired,
	watchComponent: _types2.default.funcRequired,
	currentPage: _types2.default.number,
	hits: _types2.default.hits,
	isLoading: _types2.default.bool,
	streamHits: _types2.default.hits,
	time: _types2.default.number,
	total: _types2.default.number,
	url: _types2.default.string,
	// component props
	className: _types2.default.string,
	componentId: _types2.default.stringRequired,
	dataField: _types2.default.stringRequired,
	defaultQuery: _types2.default.func,
	innerClass: _types2.default.style,
	loader: _types2.default.title,
	onAllData: _types2.default.func,
	onData: _types2.default.func,
	onResultStats: _types2.default.func,
	pages: _types2.default.number,
	pagination: _types2.default.bool,
	paginationAt: _types2.default.paginationAt,
	react: _types2.default.react,
	showResultStats: _types2.default.bool,
	size: _types2.default.number,
	sortBy: _types2.default.sortBy,
	sortOptions: _types2.default.sortOptions,
	stream: _types2.default.bool,
	style: _types2.default.style,
	URLParams: _types2.default.bool,
	onPageChange: _types2.default.func,
	defaultPage: _types2.default.number,
	listClass: _types2.default.string
};

ReactiveList.defaultProps = {
	className: null,
	pages: 5,
	pagination: false,
	paginationAt: 'bottom',
	showResultStats: true,
	size: 10,
	style: {},
	URLParams: false,
	currentPage: 0
};

var mapStateToProps = function mapStateToProps(state, props) {
	return {
		defaultPage: state.selectedValues[props.componentId + '-page'] && state.selectedValues[props.componentId + '-page'].value - 1 || -1,
		hits: state.hits[props.componentId] && state.hits[props.componentId].hits,
		isLoading: state.isLoading[props.componentId] || false,
		streamHits: state.streamHits[props.componentId] || [],
		time: state.hits[props.componentId] && state.hits[props.componentId].time || 0,
		total: state.hits[props.componentId] && state.hits[props.componentId].total,
		url: state.config.url
	};
};

var mapDispatchtoProps = function mapDispatchtoProps(dispatch) {
	return {
		addComponent: function addComponent(component) {
			return dispatch((0, _actions.addComponent)(component));
		},
		loadMore: function loadMore(component, options, append) {
			return dispatch((0, _actions.loadMore)(component, options, append));
		},
		removeComponent: function removeComponent(component) {
			return dispatch((0, _actions.removeComponent)(component));
		},
		setPageURL: function setPageURL(component, value, label, showFilter, URLParams) {
			return dispatch((0, _actions.setValue)(component, value, label, showFilter, URLParams));
		},
		setQueryOptions: function setQueryOptions(component, props, execute) {
			return dispatch((0, _actions.setQueryOptions)(component, props, execute));
		},
		setStreaming: function setStreaming(component, stream) {
			return dispatch((0, _actions.setStreaming)(component, stream));
		},
		updateQuery: function updateQuery(updateQueryObject) {
			return dispatch((0, _actions.updateQuery)(updateQueryObject));
		},
		watchComponent: function watchComponent(component, react) {
			return dispatch((0, _actions.watchComponent)(component, react));
		}
	};
};

exports.default = (0, _utils.connect)(mapStateToProps, mapDispatchtoProps)(ReactiveList);