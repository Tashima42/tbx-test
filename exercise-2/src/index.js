const express = require("express")
const cors = require("cors")
const DIRNAME = __dirname

const port = 3000

const UserRepository = require("./repositories/User")
const PasswordHelper = require("./helpers/Password")
const LoginUser = require("./use-cases/Login")

const app = express()

const userRepository = new UserRepository()
const passwordHelper = new PasswordHelper()
const loginUser = new LoginUser({ userRepository, passwordHelper })

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))

// RESTful API
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const { status, message } = await loginUser.login({ username, password })
    return res.status(status).send(message)
  } catch (error) {
    console.error(error)
    return res.status(500).send("Internal server error")
  }
})

app.get("/", (req, res) => {
  res.sendFile(`${DIRNAME}/views/login.html`)
})

app.listen(port, () => {
    console.info(`Listening on port ${port}`)
})
