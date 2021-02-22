const {
    githubAccessToken,
    githubUser,
    bountyIsReleased,
    addressRepoExists
} = require('./../')

test('Checks invalid GitHub auth code throws error.', () => {
    githubAccessToken('invalidcode').catch(e => {
        expect(e.message).toBe('bad_verification_code: The code passed is incorrect or expired.')
    })
})

test('Fetches user.', () => {
    githubUser('mktcode').then(user => {
        expect(user.login).toBe('mktcode')
    })
})

test('Fail at fetching not existing user.', () => {
    githubUser('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').catch(e => {
        expect(e[0].type).toBe('NOT_FOUND')
    })
})

test('Checks if repo exists.', () => {
    addressRepoExists('mktcode', '0x0cE5CD28e4CD4b3a4def3c9eE461809b2c5ee9E6').then(exists => {
        expect(exists).toBe(true)
    })
})

test('Checks if repo does not exists.', () => {
    addressRepoExists('mktcode', '0x0000000000000000000000000000000000000000').then(exists => {
        expect(exists).toBe(false)
    })
})

test('Checks bounty is released to user.', () => {
    bountyIsReleased('mktcode', 'MDU6SXNzdWU3NjgzMTY5MTM=').then(released => {
        expect(released.releasedByCommand).toBe(true)
    })
})

test('Checks bounty is not released to other user.', () => {
    bountyIsReleased('otheruser', 'MDU6SXNzdWU3NjgzMTY5MTM=').then(released => {
        expect(!released.releasedByCommand && !released.releasedByPullRequest).toBe(true)
    })
})