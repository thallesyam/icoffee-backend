import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"
import dotenv from "dotenv"

dotenv.config()

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
      callbackURL: process.env.GOOGLE_REDIRECT_URI as string,
    },
    (accessToken, refreshToken, profile, callback) => {
      return callback(null, profile._json)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user)
})
