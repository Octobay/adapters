const axios = require('axios')
const axiosRetry = require('axios-retry')
const { getEnvDefault } = require('./helper')
const authUrl = 'https://github.com/login/oauth/access_token'
 
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
})

module.exports = (code, githubClientId = '', githubClientSecret = '') => {
  githubClientId = getEnvDefault(githubClientId, 'GITHUB_CLIENT_ID')
  githubClientSecret = getEnvDefault(githubClientSecret, 'GITHUB_CLIENT_SECRET')

  return axios.post(authUrl, {
    client_id: githubClientId,
    client_secret: githubClientSecret,
    code,
    accept: 'application/json'
  }).then(res => {
    const data = new URLSearchParams(res.data)
    if (data.get('error')) {
      throw new Error(`${data.get('error')}: ${data.get('error_description')}`)
    }
    return data.get('access_token')
  }).catch(e => {
    throw e
  })
}