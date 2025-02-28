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
  console.log("products", products);
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
  const orders = await req.user.getOrders({ include: ["Products"] });
  console.log(orders[0].Products);
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
  const order = new Order({
    user: {
      name: req.user.name,
      intUserId: req.user,
    },
  });

  await order.addProduct(
    products.map((product) => {
      product.OrderDetail = { int_quantity: product.CartDetail.int_quantity };
      return product;
    })
  );
  await cart.setProducts(null);
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
