webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./lib/apollo/with-apollo-client.js":
/*!******************************************!*\
  !*** ./lib/apollo/with-apollo-client.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _apollo_react_ssr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @apollo/react-ssr */ "./node_modules/@apollo/react-ssr/lib/react-ssr.esm.js");
/* harmony import */ var _init_apollo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./init-apollo */ "./lib/apollo/init-apollo.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_12__);









var _jsxFileName = "/Users/malcolm/Dev/VS/amis/All-Mankind/client/lib/apollo/with-apollo-client.js";




/* harmony default export */ __webpack_exports__["default"] = (function (App) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(Apollo, _React$Component);

    Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(Apollo, null, [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(
        /*#__PURE__*/
        _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx) {
          var AppTree, appProps, apollo, apolloState;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  AppTree = ctx.AppTree; // TODO:
                  // - pass prop data to url 
                  // - check if getInitialProps was called without a requrest object
                  // - parse user object
                  //ctx.ctx.apolloClient = apollo;

                  appProps = {};

                  if (!App.getInitialProps) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return App.getInitialProps(ctx);

                case 5:
                  appProps = _context.sent;

                case 6:
                  // TODO: don't render if the response is finished while redirecting
                  // const apolloState = {};
                  // if (!process.browser) {
                  //   // Run all GraphQL queries
                  //   await getDataFromTree((
                  //     <ApolloProvider client={apollo}>
                  //       <WrappedComponent {...appProps} Component={Component} router={router} />
                  //     </ApolloProvider>
                  //   ));
                  apollo = Object(_init_apollo__WEBPACK_IMPORTED_MODULE_11__["default"])();

                  if (!(typeof window === 'undefined')) {
                    _context.next = 17;
                    break;
                  }

                  _context.prev = 8;
                  _context.next = 11;
                  return Object(_apollo_react_ssr__WEBPACK_IMPORTED_MODULE_10__["getDataFromTree"])(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(AppTree, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, appProps, {
                    apolloClient: apollo,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 40
                    },
                    __self: this
                  })));

                case 11:
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](8);
                  console.error('Error while running `getDataFromTree`', _context.t0);

                case 16:
                  // getDataFromTree does not call componentWillUnmount
                  // head sideeffect therefore need to be cleared manually
                  next_head__WEBPACK_IMPORTED_MODULE_12___default.a.rewind();

                case 17:
                  //Extract query data from the Apollo store
                  apolloState = apollo.cache.extract();
                  return _context.abrupt("return", Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, appProps, {
                    apolloState: apolloState
                  }));

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[8, 13]]);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }() // static propTypes = {
      //   apolloState: PropTypes.object.isRequired
      // };
      // TODO: getDerivedStateFromProps(nextProps)
      // - update routing store and rewrite routing path

    }]);

    function Apollo(props) {
      var _this;

      Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Apollo);

      _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Apollo).call(this, props)); // `getDataFromTree` renders the component first, then the client is passed off as a property.
      // After that, render is done using Next's normal rendering pipeline

      _this.apolloClient = Object(_init_apollo__WEBPACK_IMPORTED_MODULE_11__["default"])(props.apolloState);
      return _this;
    }

    Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_7__["default"])(Apollo, [{
      key: "render",
      value: function render() {
        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(App, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
          apolloClient: this.apolloClient
        }, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 74
          },
          __self: this
        }));
      }
    }]);

    return Apollo;
  }(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component), _class.displayName = "WithApolloClient(App)", _temp;
});

/***/ })

})
//# sourceMappingURL=_app.js.52818ceb4522722da683.hot-update.js.map