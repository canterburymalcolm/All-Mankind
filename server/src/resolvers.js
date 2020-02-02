module.exports = {
    Query: {
        inventory: (_, __, { datasources }) =>
            datasources.productApi.getInventory(),
        product: (_, { id }, { datasources }) =>
            datasources.productApi.getProductById({ productId: id })
    }
};