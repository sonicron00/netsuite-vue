/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

/**
 * Returns an error response
 * @function errorResponse
 * @param {String} error - The system or message error
 * @param {String} message - Message explaining the error
 * @returns {Object} - JSON.stringify Object
 * {success: (boolean), error, message}
 */
export const errorResponse = (error: string, message?: string) => {
  return JSON.stringify({
    success: false,
    error: error,
    message: message,
  });
};

/**
 * Returns an errorResponse stating a parameter is missing for a function that was called
 * @function errorResponse
 * @param {String} parameter - The param that is missing
 * @returns {Object} - errorResponse
 */
export const reqPar = (parameter: string) => {
  return errorResponse(
    "Missing req. param",
    "Missing required parameter: " + parameter
  );
};

/**
 * Returns an errorResponse with the msg stating multiple missing params
 * @function checkParams
 * @param {Array} required - The required parameters (strings)
 * @param {Object} params - The parameters passed in
 * @returns {String} - String of comma delimited missing params
 */
export const checkParams = (required: string[], params: object): string => {
  let missing = required.reduce(function (p, q) {
    if (params[q] == undefined) return p.concat([q]);
    else return p;
  }, []);
  if (missing.length > 0) return reqPar(missing.join(", "));
  else return "";
};

/**
 * Returns a successResponse with data
 * @function succResponse
 * @param {Object} response - The data you want to return
 * @returns {Object}
 * {success:(boolean), data:(response)}
 */
export const successfulResponse = (response: any) => {
  return JSON.stringify({
    success: true,
    data: response,
  });
};
