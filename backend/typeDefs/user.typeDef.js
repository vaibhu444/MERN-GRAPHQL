const userTypeDef = `#graphql
    type User {
        _id: ID!
        username: String!
        user: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    type Query{
        authUser: User
        user(userId: ID!): User
    }

    type Mutation{
        signUp(input: signUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    input signUpInput{
        name: String!
        password: String!
        username: String!
        gender: String!
    }

    input LoginInput{
        username: String!
        password: String!
    }

    type LogoutResponse{
        message: String!
    } 

`

export default userTypeDef;