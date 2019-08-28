webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./lib/apollo/init-apollo.js":
/*!***********************************!*\
  !*** ./lib/apollo/init-apollo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initApollo; });
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-boost */ "./node_modules/apollo-boost/lib/bundle.esm.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1__);


var apolloClient = null;

function create(initialState) {
  var isBrowser = typeof window !== 'undefined';
  var httpLink = new apollo_boost__WEBPACK_IMPORTED_MODULE_0__["HttpLink"]({
    uri: 'http://localhost:3000/graphql-beta',
    credentials: 'same-origin',
    fetch: !isBrowser && isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_1___default.a
  });
  return new apollo_boost__WEBPACK_IMPORTED_MODULE_0__["ApolloClient"]({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: httpLink,
    cache: new apollo_boost__WEBPACK_IMPORTED_MODULE_0__["InMemoryCache"]().restore(initialState || {})
  });
}
/**
 * @name initApollo
 * @param {Object} initialState Initial state to initialize the Apollo client with
 * @return {ApolloClient} Apollo client instance
 */


function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (typeof window === 'undefined') {
    return create(initialState);
  } // Reuse client on the client-side


  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

/***/ })

})
//# sourceMappingURL=_app.js.8f2e2b03bafe71ea9b0f.hot-update.js.map