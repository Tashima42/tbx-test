module.exports = class UserRepository {
  users = [
    {
      id: 1,
      username: "jotaro",
      password: "$argon2i$v=19$m=4096,t=3,p=1$sgruJ66XeJ2Sr4ppNEAkjQ$EUcozuEP9xU/fxMKSWy3tMoAHthjFyGVSAKLeXTfGbc",
    },
    {
      id: 2,
      username: "jolyne",
      password: "$argon2i$v=19$m=4096,t=3,p=1$o0FnMjcxdu5hksfxFgsdBA$ZaCOwc+C4Ge2o3E/CIsqtIux1Qu0XmAlEEVnTzq5JZM",
    },
  ]
  constructor() {}

  async findByUsername(username) {
    return new Promise(resolve => resolve(this.users.find(user => user.username == username)))
  }
}

