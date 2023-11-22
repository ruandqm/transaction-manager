import { sendErrorResponse } from "../controllers/error"

export default function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    sendErrorResponse(err, res);

};
