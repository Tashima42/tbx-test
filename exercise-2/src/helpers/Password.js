const argon2 = require("argon2")

module.exports = class PasswordHelper {
  constructor() { } 

  async verify(hash, password) {
    return await argon2.verify(hash, password)
  }
}

