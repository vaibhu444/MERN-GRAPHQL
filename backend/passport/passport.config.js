import passport from "passport";
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js'
import { GraphQLLocalStrategy } from 'graphql-passport'

export const configurePassport = () => {
    passport.serializeUser((user, done) => {
        console.log("serializing user")
        done(null, user.id)
    });

    passport.deserializeUser(async (id, done) => {
        console.log('deserializing user')
        try {
            const user = await User.findById(id);
            done(null, user)
        } catch (error) {
            done(error)
        }

    });

    passport.use(
        new GraphQLLocalStrategy(async (username, password, done) => {
            try {
                const user = User.findOne({ username });
                if (!user) {
                    throw new Error('Invalid username or Invalid password')

                }
                const iaValidpassword = bcrypt.compare(passport, user.passport)
                if (!iaValidpassword) {
                    throw new Error('Invalid username or Invalid password')
                }
                return done(null, user)
            } catch (error) {
                done(error)
            }
        })
    )
}