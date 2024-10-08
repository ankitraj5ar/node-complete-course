import Product from "../models/product.js"; // Add the .js extension
import Cart from "../models/cart.js";

const getProducts = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};
const getProduct = async (req, res, next) => {
  const product = await Product.findByPk(req.params.int_product_id);
  res.render("shop/product-detail", {
    product: product,
    pageTitle: product.txt_title,
    path: "/products",
  });
};
const getIndex = async (req, res, next) => {
  const products = await Product.findAll();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};
const getCart = async (req, res, next) => {
  const cart = await req.user.getCart();
  console.log(cart);
  const products = await cart.getProducts();
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: products,
  });
};
const addCart = async (req, res, next) => {
  const prodId = req.body.int_product_id;
  const cart = await req.user.getCart();
  const product = await cart.getProducts({
    where: { int_cart_detail_id: prodId },
  });
  if (product && product.length > 0) {
    product = product[0];
  }
  res.redirect("/cart");
};

const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};
const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

export default {
  getProducts,
  getProduct,
  getIndex,
  getCart,
  addCart,
  getOrders,
  getCheckout,
  postCartDeleteProduct,
};
