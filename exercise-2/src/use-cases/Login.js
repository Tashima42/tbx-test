module.exports = class LoginUser {
  userRepository
  passwordHelper
  constructor({ userRepository, passwordHelper }) {
    this.userRepository = userRepository
    this.passwordHelper = passwordHelper
  }

  async login({ username, password }) {
    try {
      const user = await this.userRepository.findByUsername(username) 
      if (!user) {
	throw { message: "User not found", status: 404 }
      }
      const passwordIsValid = await this.passwordHelper.verify(user.password, password)
      if (!passwordIsValid) {
	throw { message: "Invalid password", status: 401 }
      }
      return { status: 200, message: `Hello ${user.username}` }
    } catch (error) {
      console.error(error)
      if (error.message && error.status) {
	return { status: error.status, message: error.message }
      }
      return { status: 500, message: "Internal server error" }
    }
  }
}
