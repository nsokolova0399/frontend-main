import gql from "graphql-tag";

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
          info
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

