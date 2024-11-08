import Product from "../models/product.js"; // Add the .js extension
// import Cart from "../models/cart.js";

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
  const cart = await req.user.getCart();
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
  const products = await cart.getProducts({
    where: { int_product_id: prodId },
  });
  let product;
  if (products && products.length > 0) {
    product = products[0];
  }
  let newQuantity = 1;
  if (product) {
    const oldQuantity = product.CartDetail.int_quantity;
    newQuantity = oldQuantity + 1;
    await cart.addProduct(product, { through: { int_quantity: newQuantity } });
  } else {
    const newProduct = await Product.findByPk(prodId);
    await cart.addProduct(newProduct, {
      through: { int_quantity: newQuantity },
    });
  }

  res.redirect("/cart");
};

const postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.int_product_id;
  const cart = await req.user.getCart();
  const products = await cart.getProducts({
    where: { int_product_id: prodId },
  });

  let product;
  if (products && products.length > 0) {
    product = products[0];
    await product.CartDetail.destroy();
  }

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
  const cart = await req.user.getCart();
  const products = await cart.getProducts();
  const order = await req.user.createOrder();
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
