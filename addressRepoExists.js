const axios = require('axios')
const axiosRetry = require('axios-retry')
const graphqlUrl = 'https://api.github.com/graphql'
 
axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

module.exports = (githubUser, ethAddress, accessToken = '') => {
    if (!ethAddress.startsWith('0x') || !ethAddress.length === 42) {
        throw Error(`OctoBay Adapters: Invalid ETH address. (${ethAddress})`)
    }

    if (!accessToken) {
        if (!process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
            throw Error('OctoBay Adapters: No GitHub access token set. (GITHUB_PERSONAL_ACCESS_TOKEN)')
        } else {
            accessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
        }
    }

    return axios.post(graphqlUrl, {
        query: `query {
            repository(owner: "${githubUser}", name: "${ethAddress}") {
              name
            }
          }`
    }, {
        headers: {
            Authorization: 'bearer ' + accessToken
        }
    }).then(res => !!res.data.data.repository).catch(e => {
        throw e
    })
}