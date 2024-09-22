import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Cart from "./cart.js";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p = path.join(__dirname, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

export default class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProudctIndex = products.findIndex(
          (prod) => prod.id == this.id
        );
        const updateProducts = [...products];
        updateProducts[existingProudctIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }
  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id == id);
      const updateProducts = products.filter((prod) => prod.id != id);
      fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      cb(products.find((product) => product.id == id));
    });
  }
}
