const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        // res.status(400).json({ msg: message });

        const error = {
            status,
            message,
            extraDetails,
        }
        console.log(error);

        next(error);
    }
};

module.exports = validate;
