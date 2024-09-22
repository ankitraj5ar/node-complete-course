import Product from "../models/product.js";

const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

const AddProduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product(null, title, imgUrl, price, description);
  product.save();
  res.redirect("/");
};

const editProduct = (req, res, next) => {
  const { productId, title, imgUrl, price, description } = req.body;
  const product = new Product(productId, title, imgUrl, price, description);
  product.save();
  res.redirect("/admin/products");
};

const deleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      product: product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
    });
  });
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "admin/products",
    });
  });
};

export default {
  getAddProduct,
  AddProduct,
  getEditProduct,
  editProduct,
  getProducts,
  deleteProduct,
};
