import Product from "../models/product.js"; // Add the .js extension
import Order from "../models/order.js";

const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};
const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.int_product_id);
  res.render("shop/product-detail", {
    product: product,
    pageTitle: product.txt_title,
    path: "/products",
  });
};
const getIndex = async (req, res, next) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
};
const getCart = async (req, res, next) => {
  const userCart = await req.user.populate("cart.items.int_product_id");
  const products = userCart.cart.items;
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: products,
  });
};
const addCart = async (req, res, next) => {
  const prodId = req.body.int_product_id;
  const product = await Product.findById(prodId);
  req.user.addToCart(product);
  res.redirect("/cart");
};

const postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.int_product_id;
  await req.user.removeFromCart(prodId);
  res.redirect("/cart");
};

const getOrders = async (req, res, next) => {
  const orders = await Order.find({ "user.intUserId": req.user._id });
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders,
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

const createOrder = async (req, res, next) => {
  const userCart = await req.user.populate("cart.items.int_product_id");
  const products = userCart.cart.items.map((product) => {
    return {
      quantity: product.dbl_quantity,
      productData: { ...product.int_product_id._doc },
    };
  });
  const order = new Order({
    user: {
      name: req.user.txt_name,
      intUserId: req.user,
    },
    products: products,
  });
  await order.save();
  await req.user.clearCart();
  res.redirect("/orders");
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
  createOrder,
};
