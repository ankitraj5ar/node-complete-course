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
  const product = new Product({ ...req.body, int_user_id: req.user });
  await product.save();
  res.redirect("/admin/products");
};

const editProduct = async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.body.int_product_id,
    req.body,
    { new: true, runValidators: true }
  );
  res.redirect("/admin/products");
};

const deleteProduct = async (req, res, next) => {
  const proudct = await Product.findByIdAndDelete(req.body.int_product_id);
  res.redirect("/admin/products");
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const product = await Product.findById(req.params.int_product_id);
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
  const products = await Product.find();
  // .populate("int_user_id");
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
