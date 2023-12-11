import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const googleStrategy = new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3030/api/authGoogle",
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user)
        })
    }
)

export default googleStrategy
