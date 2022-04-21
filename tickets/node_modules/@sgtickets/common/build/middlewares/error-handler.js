"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_1 = require("../errors/custom-error");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.error(err);
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
