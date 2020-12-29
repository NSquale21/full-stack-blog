import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import {comparePasswords} from '../utils/passwords';
import db from '../db/index';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({usernameField: 'email'}, async (email, password, done) => {
    try {
        const [author] = await db.authors.find('email', email);
        if (author && comparePasswords(password, author.password) && author.banned === 0) {
            delete author.password;
            done(null, author);
        } else {
           done(null, false); 
        }
    } catch (error) {
        done(error);
    }
}));