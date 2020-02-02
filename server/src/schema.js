const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        inventory: [Product]!
        product(id: ID!): Product
    }

    type Mutation {
        addProduct(product: InputProduct!): Boolean!
        updateProduct(id: ID!): Boolean!
        removeProduct(id: ID!): Product
    }

    input InputProduct {
        name: String
    }

    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        sizes: [Size]!
        stock(size: Size!): Int
    }

    enum Size {
        X_SMALL
        SMALL
        MEDIUM
        LARGE
        X_LARGE
    }
`;

module.exports = typeDefs;