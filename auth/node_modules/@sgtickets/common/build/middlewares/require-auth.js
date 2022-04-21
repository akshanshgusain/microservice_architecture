"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var not_authorized_error_1 = require("../errors/not-authorized-error");
exports.requireAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new not_authorized_error_1.NotAuthorizedError();
    }
    next();
};
