export const sendErrorResponse = (error, res) => {
    return res.status(500).json({
        status: error.status,
        message: error.message,
    });
};
