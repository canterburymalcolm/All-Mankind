webpackHotUpdate("static/development/pages/shop/[pageData].js",{

/***/ "./components/ProductGroup/ProductGroup.js":
/*!*************************************************!*\
  !*** ./components/ProductGroup/ProductGroup.js ***!
  \*************************************************/
/*! exports provided: GET_CATALOG_ITEMS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CATALOG_ITEMS", function() { return GET_CATALOG_ITEMS; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/react-hooks */ "./node_modules/@apollo/react-hooks/lib/react-hooks.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ProductGroupItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductGroupItem */ "./components/ProductGroup/ProductGroupItem.js");

var _jsxFileName = "/Users/malcolm/Dev/VS/amis/All-Mankind/client/components/ProductGroup/ProductGroup.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  query GetCatalogItems($shopId: ID!, $first: ConnectionLimitInt, $last: ConnectionLimitInt, \n                        $before: ConnectionCursor, $after: ConnectionCursor, $sortBy: CatalogItemSortByField, \n                        $sortByPriceCurrencyCode: String, $sortOrder: SortOrder) {\n      catalogItems(shopIds: [$shopId], first: $first, last: $last, before: $before,\n                   after: $after, sordBy: $sortBy, sortByPriceCurrencyCode: $sortByPriceCurrencyCode, \n                   sortOrder: $sortOrder) {\n      totalCount\n      pageInfo {\n        endCursor\n        startCursor\n        hasNextPage\n        hasPreviousPage\n      }\n      edges {\n        cursor\n        node {\n          _id\n          ... on CatalogItemProduct {\n            product {\n              _id\n              title\n              slug\n              description\n              vendor\n              pricing {\n                compareAtPrice {\n                  displayAmount\n                }\n                displayPrice\n              }\n              primaryImage {\n                URLs {\n                  small\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var GET_CATALOG_ITEMS = graphql_tag__WEBPACK_IMPORTED_MODULE_3___default()(_templateObject());

function ProductGroup() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Product Group"), __jsx(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, __jsx(_ProductGroupItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (ProductGroup);

/***/ }),

/***/ "./components/ProductGroup/index.js":
/*!******************************************!*\
  !*** ./components/ProductGroup/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductGroup */ "./components/ProductGroup/ProductGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductGroup__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

})
//# sourceMappingURL=[pageData].js.d9de5a864f50a1bbc439.hot-update.js.map