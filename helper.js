module.exports = {
  getEnvDefault: (value, key) => {
    if (!value) {
      if (!process.env[key]) {
        throw Error(`OctoBay Adapters: Parameter not set! (${key})`)
      } else {
        return process.env[key]
      }
    }

    return value
  },
}