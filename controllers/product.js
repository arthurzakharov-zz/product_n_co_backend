const ProductModel = require('../models/Product.js');
const {
  format,
  projection,
  checkAllRequiredKeysArePassed,
} = require('../utils/helpers.js');

const ProductController = {};

ProductController.getAllProducts = (req, res) => {
  const responseProjection = projection([
    'name',
    'quantity',
    'price',
    'color',
    'image',
  ]);
  ProductModel.find({}, responseProjection)
    .then((products) => {
      if (products.length) {
        res.status(200).json(format('Products are fetched', products));
      } else {
        res.status(200).json(format('There no products at all', products));
      }
    })
    .catch((err) =>
      res.status(500).json(format('Can not find all products', err))
    );
};

ProductController.getProductById = (req, res) => {
  const { id } = req.params;
  const responseProjection = projection([
    'name',
    'quantity',
    'price',
    'color',
    'image',
    'description',
  ]);
  ProductModel.findById(id, responseProjection)
    .then((productFound) => {
      if (productFound) {
        res.status(200).json(format('Product is fetched', productFound));
      } else {
        res
          .status(404)
          .json(format(`Product ${id} does not exist`, productFound));
      }
    })
    .catch((err) =>
      res.status(500).json(format(`Can not find product: ${id}`, err))
    );
};

ProductController.createProduct = (req, res) => {
  const { name, quantity, price, color, image, description } = req.body;
  checkAllRequiredKeysArePassed(
    ['name', 'price', 'quantity', 'color', 'image', 'description'],
    req,
    res
  );
  const product = new ProductModel({
    name,
    quantity,
    price,
    color,
    image,
    description,
  });
  ProductModel.findOne({ name })
    .then((productFound) => {
      if (!productFound) {
        product
          .save()
          .then(() =>
            res
              .status(200)
              .json(format(`Product with name: ${name} is saved`, null))
          )
          .catch((err) =>
            res
              .status(500)
              .json(format(`Can not save product with name: ${name}`, err))
          );
      } else {
        res
          .status(400)
          .json(format(`Product with name ${name} already exists`, null));
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json(format(`Can not find product with name: ${name}`, err));
    });
};

ProductController.updateProduct = (req, res) => {
  const { id } = req.params;
  checkAllRequiredKeysArePassed(
    ['name', 'quantity', 'price', 'color', 'image', 'description'],
    req,
    res
  );
  const updatedProduct = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    color: req.body.color,
    image: req.body.image,
    description: req.body.description,
  };
  ProductModel.findByIdAndUpdate(id, updatedProduct)
    .then((productFound) => {
      if (productFound) {
        res
          .status(200)
          .json(format(`Product: ${id} has been updated`, productFound));
      } else {
        res.status(404).json(format(`There is no product ${id}`, productFound));
      }
    })
    .catch((err) =>
      res.status(500).json(format(`Can not update product: ${id}`, err))
    );
};

ProductController.deleteProduct = (req, res) => {
  const { id } = req.params;
  ProductModel.findByIdAndDelete(id)
    .then((productFound) => {
      if (productFound) {
        res
          .status(200)
          .json(format(`Product: ${id} has been deleted`, productFound));
      } else {
        res
          .status(404)
          .json(format(`There is no product: ${id}`, productFound));
      }
    })
    .catch((err) =>
      res.status(500).json(format(`Can not delete product: ${id}`, err))
    );
};

module.exports = ProductController;
