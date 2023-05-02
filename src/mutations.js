import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation Register($username: String!, $email: String!, $password1: String!, $password2: String!) {
        register(
            username: $username,
            email: $email,
            password1: $password1,
            password2: $password2
        ) {
            token,
            errors
        }
    }
`
export const LOGIN_MUTATION = gql`
    mutation TokenAuth($username: String, $password: String!) {
        tokenAuth(
            username: $username,
            password: $password
        ){
            user{
                id
            },
            success,
            errors,
            token,
            refreshToken,
            token

        }
    }
`
export const REFRESHTOKEN_MUTATION = gql`
    mutation RefreshToken($refreshToken: String!){
        refreshToken(
            refreshToken: $refreshToken
        )
        {
            token
            payload
            success
            errors
            refreshToken
        }
    }
`
export const CHANGEPASSWORD_MUTATION = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword1:String! , $newPassword2:String!) {
        passwordChange(
            oldPassword: $oldPassword,
            newPassword1: $newPassword1,
            newPassword2: $newPassword2)
        {
        success
        errors
        refreshToken
        token
    }
}
`
export const CREATEDATASET_MUTATION = gql`
    mutation DatasetCreate($input: DatasetCreateInput!) {
        datasetCreate(input: $input){
            ok
            errors{field}
            dataset{
                id
                title
                parameters{
                    id
                    title
                }

            }
        }
    }
`
export const UPDATEACCOUNT_MUTATION = gql`
    mutation UpdateAccount($firstName: String, $lastName: String) {
        updateAccount(
            firstName: $firstName, 
            lastName: $lastName
        )
        {
            success
            errors
        }
    }
`
export const VERIFYACCOUNT_MUTATION = gql`
    mutation ($token: String!) {
        verifyAccount(
            token: $token
        )
        {
            success
            errors
        }
    }
`
export const RESENDACTIVATIONEMAIL_MUTATION = gql`
    mutation ResendActivationEmail($email: String!) {
        resendActivationEmail(
            email: $email
        )
        {
            success
            errors
        }
    }
`
export const DATASETCREATE_MUTATION = gql`
    mutation CreateDataset($input: DatasetCreateInput!){
        datasetCreate(
            input: $input
        ){
            ok
            errors {
                field
                messages
            }
            dataset {
                id
                title
                public
                parameters{
                    id
                    title
                }
            }
        }
    }
`
export const DATASETVALUEUPLOAD_MUTATION = gql`
    mutation Upload_file($file: Upload!,$datasetId:ID!){
        datasetValuesUpload(
            input: {
                datasetId:$datasetId,
                file:$file,
            }
        ){
            ok
            errors {
                field
                messages
            }
            dataset {
                id
                title
                public
            }
        }
    }
`
export const ALGORITHMKNN_MUTATION = gql`
    mutation RunAlgorithmKnn($k:Int!, $datasetId:ID!,$testSize:Float,$title:String){
        runAlgorithmKnn(input:
        {
            k: $k
            datasetId:$datasetId
            testSize:$testSize
            title:$title
        }
        ) {

            ok
            errors {
                field
                messages
            }
            result {
                id
                user{
                    username
                }
                title
                matchPercentage
                dataset{
                    title
                    id
                    parameters{
                        values{
                            value
                        }
                        description
                    }
                    solutions{
                        title
                        values{
                            value
                        }
                        description
                    }
                }
                testParameters{
                    type
                    values{
                        value
                        id
                    }
                }
                trainParameters{
                    type
                    values{
                        value
                        id
                    }
                }
                solutionPredictValues{
                    id
                    value

                }
                algorithm{
                    title
                    id
                }
                info
            }
        }
    }
`
