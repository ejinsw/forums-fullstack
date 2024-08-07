"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const register = (req, res) => {
    // Registration logic
    res.send('User registered');
};
exports.register = register;
const login = (req, res) => {
    // Login logic
    res.send('User logged in');
};
exports.login = login;
