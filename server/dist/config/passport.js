"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const client_1 = __importDefault(require("./client"));
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "secret",
    algorithms: ['HS256'],
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, async function (jwt_payload, done) {
    try {
        // Find the user in the database
        const user = await client_1.default.user.findUnique({
            where: { id: jwt_payload.sub },
        });
        // If user is found, return the user object
        if (user) {
            return done(null, user);
        }
        else {
            // If no user is found, return false
            return done(null, false);
        }
    }
    catch (err) {
        // Handle any errors that occur during the database query
        return done(err, false);
    }
}));
exports.authenticate = passport_1.default.authenticate('jwt', { session: false });
exports.default = passport_1.default;
