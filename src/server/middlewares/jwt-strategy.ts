import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import type { IPayload } from '../utils/types';
import config from '../config';
import db from '../db/index';

passport.use(new passportJwt.Strategy({ 
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.secret
}, async (payload: IPayload, done) => {
    try {
        const [author] = await db.tokens.match(payload.id, payload.author_id, payload.uniq);
        // 0 = not banned, 1 = banned
        if (author && author.banned === 0) {
            delete author.password;
            done(null, author);
        } else {
           done(null, false); 
        }
    } catch (error) {
        done(error);
    }
}));
