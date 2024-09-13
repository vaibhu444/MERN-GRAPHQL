import { gql } from '@apollo/client'
export const GET_AUTHENTICATED_USER = gql`
    query getAuthenticatedUser{
        authUser{
            _id
            name
            username
            profilePicture
        }
    }
`;

export const GET_USER_AND_TERANSACTIONS = gql`
    query getUserAndTransaction($userId: ID!){
        user(userId: $userId){
            _id
            name
            username
            profilePicture
            transactions{
                _id
                description
                paymentType
                category
                amount
                location
                date
            }
        }
    }
`;