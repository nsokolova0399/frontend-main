import gql from "graphql-tag";


export const ALL_USERS_QUERY = gql`
    query UsersQuery{
        users {
            edges {
                node {
                    id
                    email
                    username
                }
            }
        }
    }
`

export const USER_QUERY = gql`
    query UserQuery($id: ID!){
        user(id: $id) {
            id
            email
            username
        }
    }
`

export const ME_QUERY = gql`
    query Me{
        me {
            id
            username
            email
            lastName
            firstName
            verified
        }
    }
`

export const DATASETS_QUERY = gql`
    query DatasetsQuery{
        datasetsQuery {
            result {
                id
                title
                public
                parameters{
                    id
                    title
                    type
                }
                solutions{
                    id
                    title
                    values{
                        id
                        value
                    }
                }
                user{
                    id
                    username
                }
            }
        }
    }
`


export const RESULTS_QUERY = gql`
    query ResultsQuery{
        resultsQuery {
            result {
                id
                title
                matchPercentage
            }
        }
    }
`
