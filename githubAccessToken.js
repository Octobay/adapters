const axios = require('axios')
const axiosRetry = require('axios-retry')
const authUrl = 'https://github.com/login/oauth/access_token'
 
axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw Error('OctoBay Adapters: No GitHub client ID and/or secret. (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET) ')
}

module.exports = (code) => {
    return axios.post(authUrl, {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        accept: 'application/json'
    }).then(res => {
        const data = new URLSearchParams(res.data)
      if (data.get('error')) {
        return {
            error: `${data.get('error')}: ${data.get('error_description')}`,
            accessToken: null
        }
      } else {
        return {
            error: null,
            accessToken: data.get('access_token')
        }
      }
    }).catch(e => {
        throw e
    })
}