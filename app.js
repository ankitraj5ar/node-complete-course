import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./util/database.js";
import User from "./models/user.js";
import Session from "express-session";
import MongoStore from "connect-mongo";

import errorController from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(
  Session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/nodejscomplete",
    }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(async (req, res, next) => {
  const user = await User.findById("672ae557cbfb8abc4162e556");
  req.user = user;
  next();
});
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000, async () => {
  const userExists = await User.exists({});
  if (!userExists) {
    const user = new User({
      txt_name: "Ankit Raj",
      txt_email: "ankitraj5ar@gmail.com",
      cart: {
        items: [],
      },
    });
    await user.save();
  }

  console.log(`Server is running on http://localhost:3000`);
});
