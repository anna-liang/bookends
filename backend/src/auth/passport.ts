import passport from 'passport';
import type { Request } from 'express';
import GoogleOauth2 from 'passport-google-oauth2';
import { findOrCreateUser } from './services/auth.services.ts';
import type { GoogleUserProfile } from './models/auth.dto.ts';

const GoogleStrategy = GoogleOauth2.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URI || '',
      passReqToCallback: true,
    },
    async function (request: Request, accessToken: string, refreshToken: string, profile: GoogleUserProfile, done: (error: any, user?: any, info?: any) => void) {
      const user = await findOrCreateUser(profile)
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
