class errorResponse extends Error {
    constructor(message, statusCode) {
        super(message);

        this.status = statusCode;
        this.isOperational = true;
    }
}

export default errorResponse;
