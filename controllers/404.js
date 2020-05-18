const { format } = require('../utils/helpers.js');

const NotFoundController = {};

NotFoundController.notFound = (req, res) => {
  res
    .status(404)
    .json(
      format('This route is not a part of API, please look documentation', null)
    );
};

module.exports = NotFoundController;
