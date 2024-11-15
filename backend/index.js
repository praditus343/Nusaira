const express = require("express")
const helmet = require('helmet');
const app = express()

// Tambahkan CSP menggunakan helmet
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", "https://vercel.live"], // Izinkan script dari vercel.live
      },
    })
  );


require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


const postsRouter = require('./routes/posts.router')
const authRouter = require('./routes/auth.router')

app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})