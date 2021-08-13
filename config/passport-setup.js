// https://console.cloud.google.com/
// neues Projekt erstellen
// API & DIENSTE
// Bibliothek
// Google+ API aktivieren
// Anmeldedaten
// OAuth-Client-ID
// Um eine OAuth-Client-ID zu erstellen, geben Sie zuerst auf dem Zustimmungsbildschirm einen Produktnamen an.
// Zustimmungsbildschirm konfigurieren
// Extern
// Name, Email, Kontaktdaten des Entwicklers
// Anmeldedaten
// OAuth-Client-ID
// Webanwendung
// Autorisierte JavaScript-Quellen
// http://localhost:3000
// Autorisierte Weiterleitungs-URIs
// http://localhost:3000/auth/google/callback

// WICHTIG: später um die URL auf der wir veröffentlichen Nachtragen!

// Die Daten kopieren und in die .env eintragen

require('dotenv').config()
// console.log(process.env.GOOGLE_CLIENT_ID)

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        User.findOne({ google_id: profile.id })
            .then(user => {
                console.log(user)
                if (user == null) {
                    console.log("KEIN NUTZER")
                    const newUser = new User({
                        google_id: profile.id,
                        display_name: profile.displayName,
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        picture: profile.photos[0].value
                    })
                    newUser.save()
                        .then(user => {
                            console.log(user)
                            cb(null, user)
                        })
                } else {
                    console.log("NUTZER bekannt")
                    cb(null, user)
                }
            })
    }
));

// Müssen auch noch die Funktionen serialize und deserialize hinzufügen
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});