const axios = require('axios')
const axiosRetry = require('axios-retry')
const { getEnvDefault } = require('./helper')
const graphqlUrl = 'https://api.github.com/graphql'
 
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

module.exports = (githubUser, accessToken = '') => {
    accessToken = getEnvDefault(accessToken, 'GITHUB_PERSONAL_ACCESS_TOKEN')

    return axios.post(graphqlUrl, {
        query: `query($githubUser:String!) {
            user(login: $githubUser) {
                id
                createdAt
                updatedAt
                login
                url
                name
                location
                avatarUrl
                websiteUrl
                twitterUsername
                email
                hasSponsorsListing
                isHireable
                isBountyHunter
                isCampusExpert
                isDeveloperProgramMember
                followers {
                    totalCount
                }
                organizations(first: 100) {
                    nodes {
                        id
                        createdAt
                        updatedAt
                        login
                        url
                        name
                        location
                        avatarUrl
                        websiteUrl
                        twitterUsername
                        email
                        hasSponsorsListing
                    }
                }
            }
        }`,
        variables: {
            githubUser
        }
    }, {
        headers: {
            Authorization: 'bearer ' + accessToken
        }
    }).then(res => {
        if (res.data.errors) {
            throw res.data.errors
        }
        return res.data.data.user
    }).catch(e => {
        throw e
    })
}