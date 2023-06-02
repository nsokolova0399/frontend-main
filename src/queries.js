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

export const RESULTS_QUERY = gql`
    query ResultsQuery {
   resultsQuery {
    result {
      id
      user{
        id
        username
      }
      title
      matchPercentage
      dataset{
        id
        title
         solutions{
          values{
            value
          }
        }
      }
      
      solutionPredictValues{
        id
        value
      }
      testParameters{
        values{
          value
        }
        parameter{
          id
          title
          values{
          id
          value
          }
        }
      }
      algorithm{
        id
        title
        type
      }
      info
    }
  }
  }
`


export const DATASETS_QUERYID = gql`
     query DatasetQuery($id: ID!){
                               datasetQuery(id: $id) {
                                    id
                                    title
                                    public
                                    parameters {
                                      id
                                      title
                                      type
                                      description
                                      values{
                                        id
                                        value
                                      }
                                    }
                                    solutions {
                                      id
                                      title
                                      description
                                      values{
                                        id
                                        value
                                      }
                                    }
                                    user {
                                      id
                                      username
                                    }
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
                    description
                    values{
                    value
                    }
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

