const axios = require('axios')
const axiosRetry = require('axios-retry')
const { getEnvDefault } = require('./helper')
const graphqlUrl = 'https://api.github.com/graphql'
 
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

module.exports = (githubUser, ethAddress, accessToken = '') => {
    if (!ethAddress.startsWith('0x') || !ethAddress.length === 42) {
        throw Error(`OctoBay Adapters: Invalid ETH address. (${ethAddress})`)
    }

    accessToken = getEnvDefault(accessToken, 'GITHUB_PERSONAL_ACCESS_TOKEN')

    return axios.post(graphqlUrl, {
        query: `query($githubUser:String!, $ethAddress:String!) {
            repository(owner: $githubUser, name: $ethAddress) {
              name
            }
        }`,
        variables: {
            githubUser,
            ethAddress
        }
    }, {
        headers: {
            Authorization: 'bearer ' + accessToken
        }
    }).then(res => {
        if (res.data.errors) {
            throw res.data.errors
        }
        return true
    }).catch(e => {
        throw e
    })
}