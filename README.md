# OctoBay Adapters

These adapters are used in our [Chainlink external adapters](https://github.com/octobay/chainlink-adapters) as well as in our [API](https://github.com/octobay/api).

`yarn add @octobay/adapters`

The adapters expect some auth parameters to be set in `process.env`.

## GitHub Access Token

Exchange a GitHub auth code for an access token.

```javascript
// Requires:
// - process.env.GITHUB_CLIENT_ID
// - process.env.GITHUB_CLIENT_SECRET

const { githubAccessToken } = require('@octobay/adapters')

githubAccessToken(code).then(result => {
    // result: {
    //   error: null|string
    //   accessToken: null|string
    // }
}).catch(error => ...)
```

## GitHub User

Get a GitHub user's GraphQL node object.

```javascript
// Requires:
// - process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const { githubUser } = require('@octobay/adapters')

githubUser(username).then(user => {
    // user: {
    //   id: ...
    // }
}).catch(error => ...)
```

## Address Repository Exists

Check if a GitHub repository by a given user and with a given ETH address as its name, exists.

```javascript
// Requires:
// - process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const { addressRepoExists } = require('@octobay/adapters')

addressRepoExists(githubUser, ethAddress).then(result => {
    // result: bool
}).catch(error => ...)
```

## Bounty Is Released

Check if an issue is released to a user, either by a matching and merged pull request or by a comment from the maintainer.

```javascript
// Requires:
// - process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const { bountyIsReleased } = require('@octobay/adapters')

bountyIsReleased(githubUser, issueId).then(result => {
    // result: {
    //   releasedByCommand: bool
    //   releasedByPullRequest: bool
    // }
}).catch(error => ...)
```