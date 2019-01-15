const catchDuplicateEmail = (res, err, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        res.status(403).send({
            errors: ['email already registered'],
            errorMessage: 'Taki adres email już istnieje!'
        });
    } else {
        next(err)
    }
}

const customValidation = (res, err, next) => {
    if (err.name === 'ValidationError') {
        let errors = err.errors;
        let errorMessages = [];

        Object.keys(errors).forEach(function (key) {
            errorMessages.push(errors[key].message);
        })

        res.status(403).send({
            errorMessage: parseErrorMessages(errorMessages)
        });

    } else {
        next(err)
    }
}

const parseErrorMessages = (errorMessages) => {
    if (!errorMessages.length) {
        return;
    }

    let errorMessageString = '';
    for (let i = 0; i < errorMessages.length; i++) {
        let newline = '';
        if (errorMessages.length > 1 && i < errorMessages.length - 1) {
            newline = '<br>';
        }
        errorMessageString += errorMessages[i] + newline;
    }

    return errorMessageString;
}

module.exports = {
    catchDuplicateEmail, customValidation
}
