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

const AddProduct = async (req, res, next) => {
  await req.user.createProduct(req.body);
  // await Product.create({ ...req.body, UserIntUserId: req.user.int_user_id });
  res.redirect("/admin/products");
};

const editProduct = async (req, res, next) => {
  const product = await Product.findByPk(req.body.int_product_id);
  Object.assign(product, req.body);
  await product.save();
  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  const proudct = await Product.findByPk(req.body.int_product_id);
  await proudct.destroy();
  res.redirect("/admin/products");
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const product = await Product.findByPk(req.params.int_product_id);
  if (!product) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    product: product,
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
  });
};

const getProducts = async (req, res, next) => {
  const products = await req.user.getProducts();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "admin/products",
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
