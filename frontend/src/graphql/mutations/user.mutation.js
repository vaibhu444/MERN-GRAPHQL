import { gql } from "@apollo/client";


export const SIGN_UP = gql`
    mutation signUp($input: signUpInput!){
        signUp(input: $input){
            _id
            name
            username
        }
    }
`;

export const LOG_IN = gql`
    mutation login($input: LoginInput!){
        login(input: $input){
            _id
            name
            username
        }
    }
`;

export const LOG_OUT = gql`
    mutation logout{
        logout{
            message
        }
    }
`;
