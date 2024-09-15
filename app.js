import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import errorController from "./controllers/error.js";
import adminRoutes from "./routes/admin.js"; // Add .js extension for ES module imports
import shopRoutes from "./routes/shop.js"; // Add .js extension for ES module imports

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
