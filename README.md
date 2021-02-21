# OctoBay Adapters

These adapters are used in our [Chainlink external adapters](https://github.com/octobay/chainlink-adapters) as well as in our [API](https://github.com/octobay/api).

`yarn add @octobay/adapters`

## Claim

```javascript
const { claimAdapter } = require('@octobay/adapters')

claimAdapter(githubUser, issueId).then(result => {
    // result: {
    //   releasedByCommand: bool
    //   releasedByPullRequest: bool
    // }
}).catch(error => {
    // console.log(error)
})
```