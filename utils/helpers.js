const helpers = {};

/**
 * Handle response and format it to single standard
 * @param {String} message custom message
 * @param {Object} payload additional info (error or payload)
 * @returns {Object} formatted error format
 */
helpers.format = (message, payload) => ({ message, payload });

/**
 * Check if all required keys are passed
 * @param {Array} keysList array of all required keys
 * @param {Object} req object
 * @param {Object} res object
 * @returns {void}
 */
helpers.checkAllRequiredKeysArePassed = (keysList, req, res) => {
  if (!keysList.every((key) => req.body.hasOwnProperty(key))) {
    res
      .status(400)
      .send(
        helpers.format(
          `Not all required fields are passed. Fields: ${keysList.join(', ')}`,
          null
        )
      );
  }
};

/**
 * Handle MongoDB projection
 * @param {Array} keys field names
 * @param {Boolean} includeId if need to include ObjectId
 * @returns {Object} formatted projection
 */
helpers.projection = (keys, includeId = true) => {
  const projectionObject = keys.reduce((obj, name) => {
    Object.assign(obj, { [name]: 1 });
    return obj;
  }, {});
  if (!includeId) Object.assign(projectionObject, { _id: 0 });
  return projectionObject;
};

module.exports = helpers;
