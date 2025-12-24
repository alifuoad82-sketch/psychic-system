const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
  clientID: "300264441816",
  clientSecret: "PUT_YOUR_CLIENT_SECRET_HERE",
  callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

  // هنا:
  // - خزّن المستخدم في قاعدة البيانات
  // - أو أدخله إذا كان موجود
  return done(null, profile);

}));


const session = require("express-session");

app.use(session({
  secret: "lionex-secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));




const express = require("express");
const app = express();
const axios = require("axios");

const CLIENT_ID = "7813316086196439685";
const CLIENT_SECRET = "RBX-J_9HsaJe30msNxc9Ss-ftL4Ec6I9ZBMsHWcGy9Mo91pgnqjPMtLxWEo9P60oVroA";
const REDIRECT_URI = "http://localhost:3000/auth/roblox/callback";

// زر تسجيل الدخول
app.get("/auth/roblox", (req, res) => {
  const url =
    "https://apis.roblox.com/oauth/v1/authorize" +
    "?response_type=code" +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    "&scope=openid profile";

  res.redirect(url);
});

// الرجوع من Roblox
app.get("/auth/roblox/callback", async (req, res) => {
  const code = req.query.code;

  const token = await axios.post(
    "https://apis.roblox.com/oauth/v1/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    })
  );

  // هنا تقدر تجيب بيانات المستخدم لاحقًا
  res.send("Logged in with Roblox successfully ✅");
});

app.listen(3000);

app.use(express.static("public"));
