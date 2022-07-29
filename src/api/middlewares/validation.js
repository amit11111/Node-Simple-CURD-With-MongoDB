const APIError = require(`${global.appRoot}/src/api/errors/api-error`);

const errorTypes = ['body', 'params', 'query', 'headers'];

// Joi Vaidation Options
const joi_options = {
  abortEarly: false,
};

const validate = (schema) => async (req, res, next) => {
  const errorData = {
    isError: false,
  };

  try {
    if (schema) {
      // eslint-disable-next-line no-restricted-syntax
      for (const errorType of errorTypes) {
        if (schema[errorType]) {
          // eslint-disable-next-line no-await-in-loop
          errorData[errorType] = await schema[errorType].validate(
            req[errorType],
            joi_options,
          );
          const { error } = errorData[errorType];
          errorData.isError = errorData.isError
            ? errorData.isError
            : !(error == null);
        }
      }

      // eslint-disable-next-line max-len
      const valid = !errorData.isError;

      if (valid) {
        next();
      } else {
        const formattedError = await errorFormate(errorData, next);
        const err = {
          status: 422,
          isPublic: true,
          message: 'Input validation failed',
          errors: formattedError,
        };

        throw new APIError(err);
      }
    } else {
			const err = {
				status: 500,
				isPublic: true,
				message: 'Validation schema not set please check schema',
			};
			throw new APIError(err);
		}
  } catch (error) {
    next(error);
  }
};

const errorFormate = async (errorData, next) => {
  const errorStack = {};

  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const errorType of errorTypes) {
      if (errorData[errorType]) {
        if (errorData[errorType].error) {
          const details = errorData[errorType].error.details;
          errorStack[errorType] = formateErrorDetails(details, next);
        }
      }
    }
  } catch (error) {
    next(error);
  }

  return errorStack;
};

const formateErrorDetails = (details, next) => {
  const errorDetails = {};

  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const detail of details) {
      // eslint-disable-next-line no-prototype-builtins
      if (!errorDetails.hasOwnProperty(detail.context.key)) {
        errorDetails[detail.context.key] = [];
      }
      errorDetails[detail.context.key].push(
        detail.message.replaceAll('"', '').replaceAll('"', ''),
      );
    }
  } catch (error) {
    next(error);
  }

  return errorDetails;
};

module.exports = validate;
